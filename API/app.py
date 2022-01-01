from flask import Flask,jsonify,request
from flask_cors import CORS
import hashlib

app = Flask(__name__)
CORS(app)


@app.route("/createblock")
def createblock():

    tvaBlock={}
    tvaBlock["previous_block_hash"]=request.json["previous_block_hash"]
    print(tvaBlock)
    return jsonify({"status":200})


if __name__=="__main__":
    print("Running...")
    app.run()