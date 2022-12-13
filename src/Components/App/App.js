import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

const track1 = {name: 'new_track1', artist: 'new_friend', album: 'new_album', id: "1", uri: 'sd'};
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  addTrack(track) {
    const currentTracks = this.state.playlistTracks;
    if (currentTracks.find((currentTrack) => track.id === currentTrack.id)) {
      return
    }
    currentTracks.push(track);
    this.setState({playlistTracks: currentTracks});
  };

  removeTrack(track) {
    const currentTracks = this.state.playlistTracks.filter(currentTrack => track.id !== currentTrack.id);
    this.setState({playlistTracks: currentTracks});
  }

  async savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => (track.uri));
    await Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
  });
    window.location.reload();
  }

  search(searchTerm) {
    let resultPromise = Spotify.search(searchTerm);
    resultPromise.then((resolvedValue) => {
      this.setState({searchResults: resolvedValue})
    });
  }

  render() {
    console.log(this.state.searchResults);
    return (
      <div>
        <h1>Mi<span className="highlight">ya</span>no</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} 
            />
            <Playlist 
              name={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} 
            />
          </div>
        </div>
      </div>
    );
  } 
}
