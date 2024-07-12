from flask import Blueprint, render_template, Response
from app.extension import mongo
from app.main import main


@main.route("/favicon.ico", methods=['GET', 'POST'])
def fav():
    return ""


@main.route("/findIsletme", methods=['GET', 'POST'])
def getIsletme():
    user = mongo.cx['altan'].isletmeler.find_one_or_404(
        {"vergiNo": "0560031873"})
    print(user["projeler"])
    return "X"
