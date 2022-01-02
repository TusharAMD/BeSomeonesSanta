from flask import Flask,jsonify,request
from flask_cors import CORS
import hashlib
import pymongo
import shortuuid
from datetime import datetime
from twilio.rest import Client

app = Flask(__name__)
CORS(app)


@app.route("/createblock", methods=["GET","POST"])
def createblock():
    myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0.wonbr.mongodb.net/Anongift?retryWrites=true&w=majority")
    mydb = myclient["Anongift"]
    mycol = mydb["Block"]


    if request.method=="POST":
        meta = str(request.json)
        tvaBlock={}
        tvaBlock["previous_block_hash"]="0"
        tvaBlock["metadata"] = request.json
        tvaBlock["thisHash"] = hashlib.sha256(meta.encode()).hexdigest()
        tvaBlock["publicKey"] = shortuuid.ShortUUID().random(length=22)
        tosend = tvaBlock.copy()
        mycol.insert_one(tosend)
        return jsonify(tvaBlock)

@app.route("/receiverblock", methods=["GET","POST"])
def receiverblock():
    myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0.wonbr.mongodb.net/Anongift?retryWrites=true&w=majority")
    mydb = myclient["Anongift"]
    mycol = mydb["Block"]


    if request.method=="POST":
        x=mycol.find_one({"publicKey":request.json["publickey"]})
        print(request.json["publickey"])
        if x:
            print(x)
            print(x["metadata"]["email"],request.json["email"])
            if x["metadata"]["email"]==request.json["email"]:
                now = datetime.now()
                meta = now.strftime("%m/%d/%Y, %H:%M:%S")
                tvaBlock={}
                tvaBlock["previous_block_hash"]=x["thisHash"]
                tvaBlock["metadata"] = {"time":meta}
                tvaBlock["thisHash"] = hashlib.sha256(meta.encode()).hexdigest()
                tvaBlock["publicKey"] = shortuuid.ShortUUID().random(length=22)
                print(tvaBlock)
                tosend = tvaBlock.copy()
                mycol.insert_one(tosend)
                account_sid = "AC9807e8964cc05794c3de4f37c190247b"
                auth_token = "90a99e5ea23240e8fa231e95c853cad8"
                client = Client(account_sid, auth_token)

                message = client.messages \
                .create(
                     from_=f'whatsapp:+14155238886',
                     body=f'Your Package was received, Public Key: {tvaBlock["publicKey"]}',
                     to=f'whatsapp:+91{x["metadata"]["smobile"]}'
                 )

                print(message.sid)
                


                return jsonify({"status":"Successful"})
            else:
                return jsonify({"status":"invalid email"})

        else:
            return jsonify({"status":"invalid public key"})


if __name__=="__main__":
    print("Running...")
    app.run()