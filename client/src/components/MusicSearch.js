import React, { useState, useEffect } from 'react'
import Dropdown from './MusicSelector/Dropdown';
import Listbox from './MusicSelector/Listbox';
import Detail from './MusicSelector/Detail';
import { Credentials } from '../Credentials';
import axios from 'axios';

const MusicSearch = () => {
    const spotify = Credentials();  
    console.log('RENDERING APP.JS');

  
    const [token, setToken] = useState('');  
    const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
    const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
    const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
    const [trackDetail, setTrackDetail] = useState(null);

    useEffect(() => {
  
      axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + window.btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
      .then(tokenResponse => {      
        setToken(tokenResponse.data.access_token);
  
        axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        })
        .then (genreResponse => {       
          setGenres({
            selectedGenre: genres.selectedGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items
          })
        });
        
      });
  
    }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 
  
    const genreChanged = val => {
      setGenres({
        selectedGenre: val, 
        listOfGenresFromAPI: genres.listOfGenresFromAPI
      });
  
      axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      })
      .then(playlistResponse => {
        setPlaylist({
          selectedPlaylist: playlist.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items
        })
      });
      console.log(val);
      // console.log(genres.listOfGenresFromAPI);
      // console.log(genres.listOfGenresFromAPI[0].name);
    }
  
    const playlistChanged = val => {
      console.log(val);
      setPlaylist({
        selectedPlaylist: val,
        listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
      });
    }
  
    const buttonClicked = e => {
      e.preventDefault();
  
      axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(tracksResponse => {
        setTracks({
          selectedTrack: tracks.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items
        })
      });
    }
  
    const listboxClicked = val => {
      const currentTracks = [...tracks.listOfTracksFromAPI];
      const trackInfo = currentTracks.filter(t => t.track.id === val);
  
      setTrackDetail(trackInfo[0].track);
  
    }
    
  
    return (
      <main>
      
      <div className="row gx-5 columns-holder">

      <div className="col-lg-5 col-md-12">
      <div className="card">
      <h4 className="card-header bg-dark text-light p-2">Generate Playlist</h4>
      <div className="card-body">
        <form onSubmit={buttonClicked}>   
            <Dropdown label="Mood" className="add-gap" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
            <Dropdown label="Playlist"  options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
            <div>
              <button type='submit' className="btn btn-success col-sm-12">
                Search
              </button>
            </div>     
        </form>
      </div>
      </div>
      </div>

      <div className="col-lg-5 col-md-12">
      <div className="card">
      <h4 className="card-header bg-dark text-light p-2">Results</h4>
      <div className="card-body">
              <div className="row">
              <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
              {trackDetail && <Detail {...trackDetail} /> }
              </div>
      </div>  
      </div> 
      </div>  

        </div>

      </main>
    );
  }
  

export default MusicSearch;