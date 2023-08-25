from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt


convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}


metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)



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
    playlists = db.relationship('Playlist', secondary='playlist_song', back_populates='songs')

    serialize_rules = ('-playlists.artists', '-playlists.songs')

class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
     # Intermediate table for many-to-many relationship with Artist
    artists = db.relationship('Artist', secondary='playlist_artist', back_populates='playlists')
    
    # Intermediate table for many-to-many relationship with Song
    songs = db.relationship('Song', secondary='playlist_song', back_populates='playlists')


    playlist_artist = db.Table(
    'playlist_artist',
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'), primary_key=True),
    db.Column('artist_id', db.Integer, db.ForeignKey('artists.id'), primary_key=True)
    )

    playlist_song = db.Table(
    'playlist_song',
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey('songs.id'), primary_key=True)
    )


class User( db.Model, SerializerMixin ):
    __tablename__ = 'users'
    id = db.Column( db.Integer, primary_key = True )
    name = db.Column( db.String )

    password = db.Column( db.String )