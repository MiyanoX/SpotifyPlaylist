import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

const track1 = {name: 'new_track1', artist: 'new_friend', album: 'new_album', id: 1, uri: ''};
const track2 = {name: 'new_track2', artist: 'new_friend', album: 'new_album', id: 2, uri: ''}
const track3 = {name: 'new_track3', artist: 'new_friend', album: 'new_album', id: 3, uri: ''};
const track4 = {name: 'new_track4', artist: 'new_friend', album: 'new_album', id: 4, uri: ''};
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [track1, track2, track3, track4],
      playlistName: 'My Playlist',
      playlistTracks: [track4]
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

  savePlaylist() {
    const trackURIs = this.state.map((track) => (track.uri));
    return trackURIs
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
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
