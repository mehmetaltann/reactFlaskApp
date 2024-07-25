from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
import re

myClient = pymongo.MongoClient(
    "mongodb+srv://mehmetaltann:***********@training.xsqqies.mongodb.net/?retryWrites=true&w=majority&appName=TRAINING")
maindb = myClient["altan"]
db = maindb["isletmeler"]
dbSektor = maindb["sektorler"]
dbDestek = maindb["destekler"]
dbProgram = maindb["programlar"]
dbUser = maindb["users"]

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config["CORS_HEADERS"] = "Content-Type"

# Queries
###################################


@app.route("/isletmeara/<aramatype>/<aramatext>", methods=["GET", "POST"])
def findIsletme(aramatype, aramatext):

    if aramatype == "unvan":
        pattern = re.compile(f"^{aramatext}", re.IGNORECASE)
        isletmeler = db.find({"unvan": pattern}, {"_id": 0})
        emptyList = []
        for i in isletmeler:
            emptyList.append(i)
        if not emptyList:
            return jsonify(message="Böyle bir işletme bulunmuyor"), 201
        else:
            isletme = emptyList[0]
    elif aramatype == "vergino":
        isletme = db.find_one({"vergiNo": aramatext}, {"_id": 0})
        if not isletme:
            return jsonify(message="Böyle bir işletme bulunmuyor"), 201
    elif aramatype == "id":
        isletme = db.find_one({"id": int(aramatext)}, {"_id": 0})
        if not isletme:
            return jsonify(message="Böyle bir işletme bulunmuyor"), 201
    if isletme["projeler"]:
        for proje in isletme["projeler"]:
            if proje['_id']:
                proje['_id'] = str(proje['_id'])
            if proje["odemeler"]:
                for odeme in proje["odemeler"]:
                    if odeme['_id']:
                        odeme['_id'] = str(odeme['_id'])
    return jsonify(isletme)


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
                    "numberOfProje": {"$cond": {"if": {"$isArray": "$projeler"}, "then": {"$size": "$projeler"}, "else": "NA"}},
                }
            }
        ]
    )
    emptyList = []
    for isletme in isletmeler:
        emptyList.append(isletme)
    return jsonify(emptyList), 200


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
                        "baslamaTarihi": {"$dateFromString": {"dateString": "$projeler.baslamaTarihi"}},
                        "sure": "$projeler.sure",
                        "tamamlanmaTarihi": {"$dateFromString": {"dateString": "$projeler.tamamlanmaTarihi"}},
                        "takipTarihi": {"$dateFromString": {"dateString": "$projeler.takipTarihi"}},
                        "numberOfOdeme": {"$cond": {"if": {"$isArray": "$projeler.odemeler"}, "then": {"$size": "$projeler.odemeler"}, "else": "NA"}},
                        "gecenGunsayisi": {
                            "$dateDiff": {
                                "startDate": "$$NOW",
                                "endDate": {"$dateFromString": {"dateString": "$projeler.takipTarihi"}},
                                "unit": "day",
                            },
                        },
                        "durum": "$projeler.durum"
                    }
                }, {"$sort": {"gecenGunsayisi": 1}}
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
                        "baslamaTarihi": {"$dateFromString": {"dateString": "$projeler.baslamaTarihi"}},
                        "sure": "$projeler.sure",
                        "tamamlanmaTarihi": {"$dateFromString": {"dateString": "$projeler.tamamlanmaTarihi"}},
                        "takipTarihi": {"$dateFromString": {"dateString": "$projeler.takipTarihi"}},
                        "numberOfOdeme": {"$cond": {"if": {"$isArray": "$projeler.odemeler"}, "then": {"$size": "$projeler.odemeler"}, "else": "NA"}},
                        "gecenGunsayisi": {
                            "$dateDiff": {
                                "startDate": "$$NOW",
                                "endDate": {"$dateFromString": {"dateString": "$projeler.takipTarihi"}},
                                "unit": "day",
                            },
                        },
                        "durum": "$projeler.durum"
                    }
                }, {"$sort": {"gecenGunsayisi": 1}}
            ]
        )
        for proje in projeler:
            emptyList.append(proje)
    return jsonify(emptyList), 200


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
                    "durum": "$odeme.durum",
                    "gecenGunsayisi": {
                        "$dateDiff": {
                            "startDate": {"$dateFromString": {"dateString": "$odeme.tarih"}},
                            "endDate": "$$NOW",
                            "unit": "day",
                        },
                    },
                }
            },
            {"$sort": {"gecenGunsayisi": -1}}
        ]
    )
    for odeme in odemeler:
        emptyList.append(odeme)
    return jsonify(emptyList), 200


@app.route("/sektordata", methods=["GET"])
def getSektors():
    allSektorData = dbSektor.find({}, {"_id": 0})
    emptyList = []
    for sektorData in allSektorData:
        emptyList.append(sektorData)
    return jsonify(emptyList), 200


@app.route("/programdata", methods=["GET"])
def getPrograms():
    allSektorData = dbProgram.find({}, {"_id": 0})
    emptyList = []
    for sektorData in allSektorData:
        emptyList.append(sektorData)
    return jsonify(emptyList), 200


@app.route("/destekdata", methods=["GET"])
def getDesteks():
    allSektorData = dbDestek.find({}, {"_id": 0})
    emptyList = []
    for sektorData in allSektorData:
        emptyList.append(sektorData)
    return jsonify(emptyList),200


@app.route("/login", methods=["GET", "POST"])
def findUser():
    postDataDict = request.get_json()
    userData = postDataDict["data"]
    user = dbUser.find_one(userData, {"_id": 0})
    if user:
        return jsonify("var")
    else:
        return jsonify("yok")


# insert transections
###################################
@app.route("/isletmeekle", methods=["GET", "POST"])
def addIsletme():
    postDataDict = request.get_json()
    newIsletme = postDataDict["data"]
    isletme = db.find_one({
        "$or": [{
            "unvan": newIsletme["unvan"]
        }, {
            "vergiNo": newIsletme["vergiNo"]
        }, {
            "sistemId": newIsletme["sistemId"]
        }]
    }, {"_id": 0})
    if isletme:
        return jsonify(message="Bu İşletme Zaten Kayıtlıdır"), 201
    else:
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


@app.route("/programdataekle", methods=["POST"])
def addProgram():
    postDataDict = request.get_json()
    newProgram = postDataDict["data"]
    dbProgram.insert_one(newProgram)
    return jsonify(message="Program Eklendi"), 200


@app.route("/destekdataekle", methods=["POST"])
def addDestek():
    postDataDict = request.get_json()
    newDestek = postDataDict["data"]
    dbDestek.insert_one(newDestek)
    return jsonify(message="Destek Eklendi"), 200


@app.route("/kullanıcıekle", methods=["POST"])
def addUser():
    postDataDict = request.get_json()
    newUser = postDataDict["data"]
    dbUser.insert_one(newUser)
    return jsonify(message="Kullanıcı Eklendi"), 200

# delete transections
###################################


@ app.route("/isletmesil/<isletmeId>", methods=["GET", "POST"])
def deleteIsletme(isletmeId):
    res = db.find_one({'id': isletmeId}, {"_id": 0})
    if res["projeler"]:
        return jsonify(message="Bu İşletme Silinemez"), 201
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


@app.route("/programdatasil/<programId>", methods=["DELETE"])
def deleteProgram(programId):
    dbProgram.delete_one({'id': programId})
    return jsonify(message="Program Silindi"), 200


@app.route("/destekdatasil/<destekId>", methods=["DELETE"])
def deleteDestek(destekId):
    dbDestek.delete_one({'id': destekId})
    return jsonify(message="Destek Silindi"), 200


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


###################################
if __name__ == "__main__":
    app.run(port=5000, debug=True)
