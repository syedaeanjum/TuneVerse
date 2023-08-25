from models import db, Artist, Playlist, User, Song
from flask import Flask, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Resource
from config import app, api, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

def create_app():
    return app


# Views go here!





@app.route('/')
def index():
    return '<h1> Tuneverse </h1>'


class Users(Resource):
    def post(self):
        data = request.json
        the_username = data['name']
        text_password = data['password']

        new_user = User(name=the_username, password_hash=text_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except:
            db.session.rollback()
            return make_response({'error': 'Could not create user'}, 500)

api.add_resource(Users, '/users')



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['name']
    password = data['password']

    user = User.query.filter_by(name=username).first()
    if not user:
        return make_response({'error': 'user not found'}, 404)

    if not user.authenticate(password):
        return make_response({'error': 'wrong password'}, 401)

    # You can use sessions, tokens, or cookies here for user authentication
    # For now, let's just return a success message
    return make_response({'message': 'Login successful'}, 200)


    ############ writing fetchs##

class FetchSongDataResource(Resource):
    def get(self):
        songs = Song.query.all()
        song_names= [song.to_dict() for song in songs]
    
        return make_response (song_names, 200 )

api.add_resource(FetchSongDataResource, '/songs')


class FetchArtistDataResource(Resource):
    def get(self):
        artists = Artist.query.all()
        artist_names= [artist.to_dict(only = ("id","name", "image")) for artist in artists]        
        return make_response (artist_names, 200 )

api.add_resource(FetchArtistDataResource, '/artists')



class UpdatePlaylistResource(Resource):
    def post(self, playlist_name):
        playlist = Playlist.query.filter_by(name=playlist_name).first()

        if not playlist:
            return {'message': 'Playlist not found'}, 404

        data = request.get_json()

        if 'songs' in data:
            playlist.songs = data['songs']

        db.session.commit()
        return {'message': 'Playlist updated successfully'}, 200

api.add_resource(UpdatePlaylistResource, '/api/playlists/<playlist_name>/update')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

