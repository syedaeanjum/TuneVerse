from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

class Artist(db.Model, SerializerMixin):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)

    # Intermediate table for many-to-many relationship
    playlists = db.relationship('Playlist', secondary='playlist_artist', back_populates='artists')
    

class Song(db.Model, SerializerMixin):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)

    # Intermediate table for many-to-many relationship
    playlistsongs = db.relationship('PlaylistSong', back_populates= 'song', cascade = 'all,delete-orphan')
    playlists = association_proxy('playlistsongs', 'playlist')


    serialize_rules = ('-playlistssongs',)

class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    # Intermediate table for many-to-many relationship with Artist
    artists = db.relationship('Artist', secondary='playlist_artist', back_populates='playlists')
    
    # Intermediate table for many-to-many relationship with Song
    # songs = db.relationship('Song', secondary='playlist_song', back_populates='playlists')
    
    playlistsongs = db.relationship('PlaylistSong', back_populates= 'playlist', cascade = 'all,delete-orphan')
    songs = association_proxy('playlistsongs', 'song')
    serialize_rules = ('-playlistsongs', )


    playlist_artist = db.Table(
    'playlist_artist',
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'), primary_key=True),
    db.Column('artist_id', db.Integer, db.ForeignKey('artists.id'), primary_key=True)
    )

    # playlist_song = db.Table(
    # 'playlist_song',
    # db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'), primary_key=True),
    # db.Column('song_id', db.Integer, db.ForeignKey('songs.id'), primary_key=True)
    # )
    
    
    @validates('playlist.name')
    def validate_name(self, key, name):
        if len(name) < 5:
            raise ValueError("Playlist name must be at least 5 characters.")
        return name

class PlaylistSong (db.Model, SerializerMixin):
    __tablename__ = 'playlistsong'
    playlist_id = db.Column( db.Integer, db.ForeignKey('playlists.id') )
    song_id = db.Column( db.Integer, db.ForeignKey('songs.id') )


    id = db.Column(db.Integer, primary_key=True)
    playlist = db.relationship ('Playlist', back_populates = 'playlistsongs')
    song = db.relationship ('Song', back_populates = 'playlistsongs' )
    
    serialize_rules = ('-playlist.playlistsong', '-song.playlistsong')



class User( db.Model, SerializerMixin ):
    __tablename__ = 'users'
    id = db.Column( db.Integer, primary_key = True )
    name = db.Column( db.String )

    _password_hash = db.Column( db.String )
    
    @property 
    def password_hash (self):
        return self._password_hash
    @password_hash.setter
    def password_hash (self, value):
        plain_byte_obj=value.encode('utf-8')
        encrypted_hash_obj= bcrypt.generate_password_hash(plain_byte_obj)
        hash_obj_as_string = encrypted_hash_obj.decode('utf-8')
        self._password_hash = hash_obj_as_string
    
    def authenticate (self, password_string):
        return bcrypt.check_password_hash(self.password_hash, password_string.encode('utf-8'))
    
    