from bson import json_util
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
import re

myClient = pymongo.MongoClient(
    "mongodb+srv://mehmetaltann:BfAyFdceTZIKOvPJ@training.xsqqies.mongodb.net/?retryWrites=true&w=majority&appName=TRAINING")
maindb = myClient["altan"]
db = maindb["isletmeler"]
dbSektor = maindb["sektorler"]
dbDestek = maindb["destekler"]
dbProgram = maindb["programlar"]

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config["CORS_HEADERS"] = "Content-Type"

# İşletme Arama
###################################


@app.route("/isletmeara/<aramatype>/<aramatext>", methods=["GET", "POST"])
def findIsletme(aramatype, aramatext):

    if aramatype == "byunvan":
        pattern = re.compile(f"^{aramatext}", re.IGNORECASE)
        isletmeler = db.find({"unvan": pattern}, {"_id": 0})
        if not isletmeler:
            return jsonify(message="Böyle bir işletme bulunmuyor"), 401
        isletme = isletmeler[0]
    elif aramatype == "byvergino":
        isletme = db.find_one({"vergiNo": aramatext}, {"_id": 0})
        if not isletme:
            return jsonify(message="Böyle bir işletme bulunmuyor"), 401
    elif aramatype == "byid":
        isletme = db.find_one({"id": int(aramatext)}, {"_id": 0})
        if not isletme:
            return jsonify(message="Böyle bir işletme bulunmuyor"), 401

    if isletme["projeler"]:
        for proje in isletme["projeler"]:
            if proje['_id']:
                proje['_id'] = str(proje['_id'])
            if proje["odemeler"]:
                for odeme in proje["odemeler"]:
                    if odeme['_id']:
                        odeme['_id'] = str(odeme['_id'])

    return jsonify(isletme)


# adding transections
###################################
@app.route("/isletmeekle", methods=["GET", "POST"])
def addIsletme():
    postDataDict = request.get_json()
    newIsletme = postDataDict["data"]
    db.insert_one(newIsletme)
    return jsonify(message="İşletme Eklendi"), 200


@app.route("/projeekle", methods=["GET", "POST"])
def addProje():
    postDataDict = request.get_json()
    newProje = postDataDict["data"]
    db.update_one({'id': newProje["isletmeId"]}, {
                  '$push': {'projeler': newProje}})
    return jsonify(message="Proje Eklendi"), 200


@app.route("/odemeekle", methods=["GET", "POST"])
def addOdeme():
    postDataDict = request.get_json()
    newOdeme = postDataDict["data"]
    db.update_one({'id': newOdeme["isletmeId"], "projeler.id": newOdeme["projeId"]}, {
                  '$push': {'projeler.$.odemeler': newOdeme}})
    print(newOdeme)
    return jsonify(message="Ödeme Eklendi"), 200

# delete transections
###################################


@ app.route("/isletmesil/<isletmeId>", methods=["GET", "POST"])
def deleteIsletme(isletmeId):
    res = db.find_one({'id': isletmeId}, {"_id": 0})
    if res["projeler"]:
        return jsonify(message="Bu İşletme Silinemez"), 200
    else:
        db.delete_one({'id': isletmeId})
    return jsonify(message="İşletme Silindi"), 200


@ app.route("/projesil/<isletmeId>/<projeId>", methods=["GET", "POST"])
def deleteProje(isletmeId, projeId):
    db.update_one(
        {'id': isletmeId},
        {"$pull": {"projeler": {"id": projeId}}}
    )
    return jsonify(message="Proje Silindi"), 200


@app.route("/odemesil/<isletmeId>/<projeId>/<odemeId>", methods=["GET", "POST"])
def deleteOdeme(isletmeId, projeId, odemeId):
    db.update_one({"id": isletmeId, "projeler.id": projeId}, {
                  "$pull": {"projeler.$.odemeler": {"id": odemeId}}})

    return jsonify(message="Ödeme Silindi"), 200


# update transections
###################################
@ app.route("/isletmeguncelle/<isletmeId>", methods=["GET", "POST"])
def updateIsletme(isletmeId):
    postDataDict = request.get_json()
    db.update_one({'id': isletmeId}, {
                  '$set': postDataDict["data"]})
    return jsonify(message="İşletme Güncellendi"), 200


@ app.route("/projeguncelle/<isletmeId>/<projeId>", methods=["GET", "POST"])
def updateProje(isletmeId, projeId):
    postDataDict = request.get_json()
    newData = {f'projeler.$.{k}': v for k, v in postDataDict["data"].items()}
    db.update_one(
        {'id': isletmeId, "projeler.id": projeId},
        {"$set": newData}
    )
    return jsonify(message="Proje Güncellendi"), 200


@ app.route("/odemeguncelle/<isletmeId>/<projeId>/<odemeId>", methods=["GET", "POST"])
def updateOdeme(isletmeId, projeId, odemeId):
    postDataDict = request.get_json()
    newData = {f'projeler.$[].odemeler.$[p].{k}': v for k,
               v in postDataDict["data"].items()}
    print(newData)
    db.update_one(
        {
            "id": isletmeId
        },
        {
            "$set": newData
        },
        upsert=True,
        array_filters=[{
            "p.id": odemeId
        }]

    )
    return jsonify(message="Ödeme Güncellendi"), 200


# helper queries
###################################
@app.route("/sektordata", methods=["GET"])
def getSektors():
    allSektorData = dbSektor.find({}, {"_id": 0})
    emptyList = []
    for sektorData in allSektorData:
        emptyList.append(sektorData)
    return jsonify(emptyList)


@app.route("/programdata", methods=["GET"])
def getPrograms():
    allSektorData = dbProgram.find({}, {"_id": 0})
    emptyList = []
    for sektorData in allSektorData:
        emptyList.append(sektorData)
    return jsonify(emptyList)


@app.route("/destekdata", methods=["GET"])
def getdestekss():
    allSektorData = dbDestek.find({}, {"_id": 0})
    emptyList = []
    for sektorData in allSektorData:
        emptyList.append(sektorData)
    return jsonify(emptyList)

# Queries
###################################


@app.route("/isletmeler", methods=["GET"])
def getIsletmeler():
    isletmeler = db.aggregate(
        [
            {
                "$project": {
                    "_id": 0,
                    "id": "$id",
                    "unvan": "$unvan",
                    "vergiNo": "$vergiNo",
                    "naceKodu": "$naceKodu",
                    "mail": "$mail",
                    "notlar": "$notlar",
                }
            }
        ]
    )
    emptyList = []
    for isletme in isletmeler:
        emptyList.append(isletme)
    return jsonify(emptyList)


@app.route("/projeler/<durum>/", methods=["GET"])
def getProjeler(durum):
    emptyList = []
    if durum == "Tümü":
        projeler = db.aggregate(
            [
                {
                    "$unwind": "$projeler"
                },
                {
                    "$project": {
                        "_id": 0,
                        "unvan": "$unvan",
                        "isletmeId": "$id",
                        "vergiNo": "$vergiNo",
                        "program": "$projeler.program",
                        "id": "$projeler.id",
                        "baslamaTarihi": "$projeler.baslamaTarihi",
                        "sure": "$projeler.sure",
                        "tamamlanmaTarihi": "$projeler.tamamlanmaTarihi",
                        "takipTarihi": "$projeler.takipTarihi",
                        "durum": "$projeler.durum"
                    }
                }
            ]
        )
        for proje in projeler:
            emptyList.append(proje)
    else:
        projeler = db.aggregate(
            [
                {
                    "$unwind": "$projeler"
                },
                {
                    "$match": {
                        "projeler.durum": durum
                    }
                },
                {
                    "$project": {
                        "_id": 0,
                        "unvan": "$unvan",
                        "vergiNo": "$vergiNo",
                        "id": "$projeler.id",
                        "isletmeId": "$id",
                        "program": "$projeler.program",
                        "baslamaTarihi": "$projeler.baslamaTarihi",
                        "sure": "$projeler.sure",
                        "tamamlanmaTarihi": "$projeler.tamamlanmaTarihi",
                        "takipTarihi": "$projeler.takipTarihi",
                        "durum": "$projeler.durum"
                    }
                }
            ]
        )
        for proje in projeler:
            emptyList.append(proje)
    return jsonify(emptyList)


@app.route("/odemeler/<durum>/", methods=["GET"])
def getOdemeler(durum):
    emptyList = []
    odemeler = db.aggregate(
        [
            {
                "$unwind": "$projeler"
            },
            {
                "$addFields": {
                    "odeme": {
                        "$filter": {
                            "input": "$projeler.odemeler",
                            "as": "odemeler",
                            "cond": {"$eq": ["$$odemeler.durum", durum]},
                        },
                    },
                },
            }, {"$unwind": "$odeme"},
            {
                "$match": {
                    "odeme.durum": durum
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "unvan": "$unvan",
                    "vergiNo": "$vergiNo",
                    "projeId": "$projeler.id",
                    "isletmeId": "$id",
                    "id": "$odeme.id",
                    "program": "$projeler.program",
                    "baslamaTarihi": {"$dateFromString": {"dateString": "$projeler.baslamaTarihi"}},
                    "karekod": "$odeme.karekod",
                    "tarih": {"$dateFromString": {"dateString": "$odeme.tarih"}},
                    "tutar": "$odeme.tutar",
                    "durum": "$odeme.durum"
                }
            }
        ]
    )
    for odeme in odemeler:
        emptyList.append(odeme)
    return jsonify(emptyList)


###################################
if __name__ == "__main__":
    app.run(port=5000, debug=True)
