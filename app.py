from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")
@app.route("/main")
def main():
    return render_template("main.html")

@app.route("/text")
def text():
    return render_template("text.html")


if __name__ == "__main__":
    app.run(debug=True)