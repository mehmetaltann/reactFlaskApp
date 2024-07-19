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
        isletmeler = db.find({"unvan": pattern})
        if not isletmeler:
            return jsonify(message="Böyle bir işletme bulunmuyor"), 401
        isletme = isletmeler[0]
    elif aramatype == "byvergino":
        isletme = db.find_one({"vergiNo": aramatext})
        if not isletme:
            return jsonify(message="Böyle bir işletme bulunmuyor"), 401
    elif aramatype == "byid":
        isletme = db.find_one({"id": int(aramatext)})
        if not isletme:
            return jsonify(message="Böyle bir işletme bulunmuyor"), 401

    isletme['_id'] = str(isletme['_id'])
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


@ app.route("/isletmesil/<isletmeId>", methods=["GET", "DELETE"])
def deleteIsletme(isletmeId):
    print(isletmeId)
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
    print(isletmeId)
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
    allSektorData = dbSektor.find({})
    emptyList = []
    for sektorData in allSektorData:
        sektorData['_id'] = str(sektorData['_id'])
        emptyList.append(sektorData)
    return jsonify(emptyList)

@app.route("/programdata", methods=["GET"])
def getPrograms():
    allSektorData = dbProgram.find({})
    emptyList = []
    for sektorData in allSektorData:
        sektorData['_id'] = str(sektorData['_id'])
        emptyList.append(sektorData)
    return jsonify(emptyList)

@app.route("/destekdata", methods=["GET"])
def getdestekss():
    allSektorData = dbDestek.find({})
    emptyList = []
    for sektorData in allSektorData:
        sektorData['_id'] = str(sektorData['_id'])
        emptyList.append(sektorData)
    return jsonify(emptyList)

###################################
if __name__ == "__main__":
    app.run(port=5000, debug=True)
