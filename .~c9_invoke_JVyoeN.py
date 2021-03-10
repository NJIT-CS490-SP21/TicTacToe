import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db = SQLAlchemy(app)

import models

db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)
    


# When a client connects from this Socket connection, this function is run

def convertToArr(query):
    return [item.toFormat for item in query]
    
def makeTableFormat(query):
    arrayOfPlayer = []
    for newPerson in query:
        name = newPerson["username"]
        score = newPerson["score"]
        newArr = [name,score]
        arrayOfPlayer.append(newArr)
    return arrayOfPlayer;

#TODO - fix
@socketio.on('game_over')
def on_game_over(data):
    '''
    function to tell server how to handle game ending
    '''
    if data['winner'] != "":
        winner = models.Person.query.filter_by(username=data['winner']).first()
        winner.score = winner.score + 1
        db.session.commit()
        loser = models.Person.query.filter_by(username=data['loser']).first()
        loser.score = loser.score - 1
        db.session.commit()
        newleaderBoard = models.Person.query.order_by(models.Person.score.desc())
        converToArrayList = convertToArr(newleaderBoard)
        formattedData = makeTableFormat(converToArrayList)
        print(formattedData)
        socketio.emit("leaderBoard", {"players": formattedData})
    # leaderboard_result = models.Person.query.order_by(
    #     models.Person.score.desc()).limit(10)
    # print(leaderboard_result)
    # leaderboard_json = makeTableFormat(leaderboard_result)
    # socketio.emit('leaderboard_info_update',
    #               leaderboard_json,
    #               broadcast=True,
    #               include_self=True)
    # socketio.emit('game_results', data, broadcast=True, include_self=True)

@socketio.on('connect')
def on_connected():
    print('User connected!')
    all_players = models.Person.query.all()
    convertToArrayList = convertToArr(all_players)
    formattedData = makeTableFormat(convertToArrayList)
    socketio.emit("leaderBoard", {"players": formattedData})
    # print(convertToArr(all_players))
    
@socketio.on('userSignedIn')
def on_userSignedIn(userName):
    newUser = models.Person(username=userName['userJoined'], score=100)
    print(newUser)
    db.session.add(newUser)
    db.session.commit()
    
    

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('board')
def on_chat(data): 
    socketio.emit('board',  data, broadcast=True, include_self=True)
        
@socketio.on('user')
def on_user(data):
    socketio.emit('user', data, broadcast=True,include_self=True)

# Note that we don't call app.run anymore. We call socketio.run with app arg
# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
    db.create_all() 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )