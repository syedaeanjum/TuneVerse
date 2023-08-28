from flask import request, jsonify, make_response, session
from flask_restful import Resource
from models import Artist, Playlist, Song, User
from config import app, api, db

@app.route('/')
def index():
    return '<h1> Tuneverse </h1>'

class Login(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        password = data.get('password')
        
        user = User.query.filter_by(name=name).first()
        if user and user.authenticate(password): 
            session['user_id'] = user.id 
            return {'user_id': user.id}, 200
        else:
            return {'message': 'Invalid username or password'}, 401

class Signup (Resource):
    def post ( self ):
        data = request.json
        username = data['name']
        password = data['password']

        user = User.query.filter_by(name=username).first()
        if user: 
            return make_response({'error': 'username taken be original'}, 404)

        new_user = User(username=username,password_hash=password)
        db.session.add(new_user)
        db.session.commit()
        session ['user_id'] = new_user.id
        return make_response({'message': 'user created successfully'}, 200)

class Logout (Resource):
    def delete (self):
        session['user_id'] = None
        return make_response ({'message': 'User logged out'},204)

class Authenticate (Resource):
    def get (self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user: 
            return make_response(user.to_dict(),200)
        else:
            return make_response({'error': 'no active user found in database'},401)
        

    ############ writing fetchs##

class Songs(Resource):
    def get(self):
        songs = Song.query.all()
        song_names= [song.to_dict() for song in songs]
    
        return make_response (song_names, 200 )
    
    
class SongsByID (Resource):
    def get(self, id):
        song = Song.query.get(id)
        if not song:
            return make_response() ({'message': 'not found'}, 404 )
        return make_response (song.to_dict(), 200 )

class Artists(Resource):
    def get(self):
        artists = Artist.query.all()
        artist_names= [artist.to_dict(only = ("id","name", "image")) for artist in artists]        
        return make_response (artist_names, 200 )
    
class ArtistsByID (Resource):
    def get(self, id):
        artist = Artist.query.get(id)
        if not artist:
            return make_response() ({'message': 'not found'}, 404 )
        return make_response (artist.to_dict(), 200 )
    
class Playlists(Resource):
    def get(self):
        playlists = Playlist.query.all()
        playlist_names= [playlist.to_dict() for playlist in playlists]        
        return make_response (playlist_names, 200 )

class PlaylistByID (Resource):
    def get(self, id):
        playlist = Playlist.query.get(id)
        if not playlist:
            return make_response() ({'message': 'not found'}, 404 )
        return make_response (playlist.to_dict(), 200 )

class UpdatePlaylist(Resource):
    def post(self, playlist_name):
        playlist = Playlist.query.filter_by(name=playlist_name).all()

        if not playlist:
            return {'message': 'Playlist not found'}, 404

        data = request.get_json()

        if 'songs' in data:
            playlist.songs = data['songs']

        db.session.commit()
        return {'message': 'Playlist updated successfully'}, 200


api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
api.add_resource(Authenticate,'/authenticate')
api.add_resource(Logout, '/logout')
api.add_resource(Songs, '/songs')
api.add_resource(SongsByID, '/songs/<int:id>')
api.add_resource(Artists, '/artists')
api.add_resource(ArtistsByID, '/artists/<int:id>')
api.add_resource(Playlists, '/playlists')
api.add_resource(PlaylistByID, '/playlists/<int:id>')
api.add_resource(UpdatePlaylist, '/playlists/<playlist_name>/update')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

