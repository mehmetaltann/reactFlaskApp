from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
import re

myClient = pymongo.MongoClient(
    "mongodb+srv://mehmetaltann:BfAyFdceTZIKOvPJ@training.xsqqies.mongodb.net/?retryWrites=true&w=majority&appName=TRAINING")
maindb = myClient["altan"]
db = maindb["isletmeler"]

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config["CORS_HEADERS"] = "Content-Type"

# İşletme Arama
###################################


@app.route("/isletmeara/<aramatype>/<aramatext>", methods=["GET"])
def findIsletme(aramatype, aramatext):

    if aramatype == "byunvan":
        pattern = re.compile(f"^{aramatext}", re.IGNORECASE)
        isletmeler = db.find({"unvan": pattern})
        isletme = isletmeler[0]
    elif aramatype == "byvergino":
        isletme = db.find_one({"vergiNo": aramatext})
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


# İşletme Ekle
###################################
@app.route("/isletmeekle", methods=["POST"])
def addIsletme():
    postDataDict = request.get_json()
    newIsletme = postDataDict["data"]
    db.insert_one(newIsletme)
    return "x"

# Proje Ekle
###################################


@app.route("/projeekle", methods=["POST"])
def addProje():
    postDataDict = request.get_json()
    newProje = postDataDict["data"]
    db.update_one({'id': newProje["isletmeId"]}, {
                  '$push': {'projeler': newProje}})
    return "x"


# Ödeme Ekle
###################################
@app.route("/odemeekle", methods=["POST"])
def addOdeme():
    postDataDict = request.get_json()
    newOdeme = postDataDict["data"]
    db.update_one({'id': newOdeme["isletmeId"], "projeler.id": newOdeme["projeId"]}, {
                  '$push': {'projeler.$.odemeler': newOdeme}})
    print(newOdeme)
    return "x"


# İşletme Güncelleme
###################################


# İşletme Silme
###################################

###################################
if __name__ == "__main__":
    app.run(port=5000, debug=True)
