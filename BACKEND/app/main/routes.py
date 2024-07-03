from flask import Blueprint, render_template, Response
from app.extension import mongo
from app.main import main


@main.route("/data", methods=['GET', 'POST'])
def get_todo():
    user = mongo.cx['altan'].isletmeler.find_one_or_404({"vergi": "0560031873"})
    print(user)
    return "X"
