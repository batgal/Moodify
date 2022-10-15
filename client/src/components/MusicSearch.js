import React, { useState, useEffect } from 'react'
import Dropdown from './MusicSelector/Dropdown';
import Listbox from './MusicSelector/Listbox';
import Detail from './MusicSelector/Detail';
import { Credentials } from '../Credentials';
import axios from 'axios';

const MusicSearch = () => {
    const spotify = Credentials();  
    //hard code here
    // moods = [
    //   {
    //   name: "Happy",
    //   genre: "",
    //   },
    //   {
    //   name: "Angry",
    //   genre: "",
    //   },
    //   {
    //   name: "Chill",
    //   genre: "",
    //   }]
      
      
    //   [pop, metal, rock]
    console.log('RENDERING APP.JS');
  
    const data = [
      {value: 1, name: 'A'},
      {value: 2, name: 'B'},
      {value: 3, name: 'C'},
    ]; 
  
    const [token, setToken] = useState('');  
    const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
    // Villette's additional logic, replaces above setGenres
    // const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: [], correspondingWords: []});
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
          // Villette's logic requires removal of this setGenres code:
          setGenres({
            selectedGenre: genres.selectedGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items
          })
          //Michael's logic here:
          // moods.forEach((mood, index) => mood.genre = listOfGenresFromAPI[index]);
          // moods.map((mood) => <option value={mood.genre}>{mood.name}</option>)

          // Villette's logic here:
          // for (var i = 0; i<genreResponse.data.categories.items.length; i++) {
          //   // console.log(genreResponse.data.categories.items[i])
          //   if (genreResponse.data.categories.items[i].name === "Pop") {
          //     setGenres({
          //       selectedGenre: genres.selectedGenre,
          //       listOfGenresFromAPI: genreResponse.data.categories.items,
          //       correspondingWords: "Happy"
          //     })
          //     console.log(genres)
          //   }
          // }
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
      <div className="container">
        <form onSubmit={buttonClicked}>   
        {/* change genres to moods      */}
            <Dropdown label="Mood" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
            <Dropdown label="Playlist" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
            <div className="col-sm-6 row form-group px-0">
              <button type='submit' className="btn btn-success col-sm-12">
                Search
              </button>
            </div>
            <div className="row">
              <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
              {trackDetail && <Detail {...trackDetail} /> }
            </div>        
        </form>
      </div>
    );
  }
  

export default MusicSearch;