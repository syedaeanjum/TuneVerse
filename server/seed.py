from app import app
from models import Artist, Song, Playlist, User, PlaylistSong
from config import db



def seed_data():
    # Create test artists
    with app.app_context():
        
        
        Artist.query.delete()
        Song.query.delete()
        Playlist.query.delete()
        User.query.delete()
        
        artist1 = Artist(name="Artist 1", image = 'https://media.pitchfork.com/photos/642f39d907a8267dac4c2fd0/1:1/w_1400,h_1400,c_limit/Drake.jpg' )
        artist2 = Artist(name="Artist 2")
        artist3 = Artist(name="Artist 3")
    
        # Create test songs
        song1 = Song(title="Song 1")
        song2 = Song(title="Song 2")
        song3 = Song(title="Song 3")
        

        # Create test playlists
        playlist1 = Playlist(name="Playlist 1")
        playlist2 = Playlist(name="Playlist 2")
        playlist3 = Playlist(name="Playlist 3")

        # playlist1.artists.extend([artist1, artist2])
        # playlist1.songs.extend([song1, song2])

        # playlist2.artists.extend([artist2, artist3])
        # playlist2.songs.extend([song2, song3])

        # playlist3.artists.extend([artist1, artist3])
        # playlist3.songs.extend([song1, song3])

    
   

        # Create test users
        user1 = User(name="User 1", password_hash="password1")
        user2 = User(name="User 2", password_hash="password2")
        user3 = User(name="User 3", password_hash="password3")
        user4 = User(name ="4444", password_hash="4444")
        
        
        

        

        db.session.add_all([artist1, artist2, artist3])
        db.session.commit()

        db.session.add_all([song1, song2, song3])
        db.session.commit()

        db.session.add_all([playlist1, playlist2, playlist3])
        db.session.commit()

        db.session.add_all([user1, user2, user3, user4])
        db.session.commit()

        ps1 = PlaylistSong(playlist_id = playlist1.id, song_id = song1.id)
        db.session.add (ps1)
        db.session.commit()

if __name__ == "__main__":
    seed_data()