import React, { Component } from 'react';
import Artist from './components/Artist';
import './App.css';
import Search from './components/Search';
import defaultImage from './default.jpg';
import SafeTracks from './components/SafeTracks';
import UnsafeTracks from './components/UnsafeTracks';
import Sidebar from './components/Sidebar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "", // my query
      artist: null,  // my response.
      topTracks: null,
      hasSafeTracks: 'yes',
      unsafeTracks: [],
      safeTracks: [],
      userDetails: ({
        username: '',
        product: '',
        image: '',
        followers: 0,
      })
    }
  }

  search = asycnc => {
    const BASE_URL = 'https://api.spotify.com/v1/';
    const FETCHUSERDETAILS = 'me';
    const FETCHSEARCH = 'search?';
    const FETCHARTISTS = 'artists';
    var accessToken = 'BQAJYpCnYiCgygAh5mrYDq1blbWUmp9hgYUpHL87deJEhtnIdZZorrNw-MoABBtNlD6qej07gvG41AdXUEQhLJBO64H9C0fGAWPStvReRSmzDI1fgYbgTFb_D9RNT07WZX5riFEk4213wldeS00ZK9MAUxHNR8CoLQY'
    const FETCHUSERDETAILS_URL = BASE_URL + FETCHUSERDETAILS;
    const FETCHARTIST_URL = BASE_URL + FETCHSEARCH + 'q=' + this.state.query + '&type=artist&limit=1';
    let FETCHTOPTRACKS_URL = '';

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    //Get current user details
    fetch('https://api.spotify.com/v1/me', myOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const username = json.display_name;
        const product = json.product;
        const followers = json.followers.total;
        const image = json.images[0].url;
        this.setState({ userDetails: ({ username: username, product: product, followers: followers, image: image })});
      });

    //Fetch artist details and then search for top tracks
    fetch(FETCHARTIST_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];   
        this.setState({ artist });
        // console.log(artist.images[0].url);

        let FETCHTOPTRACKS_URL = BASE_URL + FETCHARTISTS + '/' + artist.id + '/top-tracks?country=GB';
        fetch(FETCHTOPTRACKS_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            const topTracks = json.tracks;
            this.setState({ topTracks });
            this.isTrackExplicit();
          });
      });
  }

  updateQuery = (event) => {
    this.setState({ query: event.target.value })
  }

  isTrackExplicit = (async) => {
    if(this.state.topTracks.filter(x => x.explicit === false)){
      this.setState({ hasSafeTracks: 'yes' });
      const safeTracks = {...this.state.safeTracks};
      var result = this.state.topTracks.filter(x => x.explicit === false);
      this.setState({ safeTracks: result });
    } else{
      this.setState({ hasSafeTracks: 'no' });
    }
    if(this.state.topTracks.filter(x => x.explicit === true)){
      const unsafeTracks = {...this.state.unsafeTracks};
      var result = this.state.topTracks.filter(x => x.explicit === true);
      this.setState({ unsafeTracks: result });
    }
    // console.log(result);
  }

  render() {

    let artist = {
      name: '',
      followers: {
        total: ''
      },
      images: {
        url: ''
      }
    };
    if (this.state.artist !== null) {
      artist = this.state.artist;
    }
    // let userImage = this.state.userDetails.images;
    // if(this.state.userDetails.image !== undefined){
    //   const userImage = this.state.userDetails.images[0].url;
    // }

    //Set keys for multiple safe tracks
    let safeTrack = this.state.safeTracks.map((safeTrack, i) => (
      <SafeTracks
        key={i}
        index={i}
        safeTrack={this.state.safeTracks[i]}
      />
    ));

    //Set keys for multiple unsafe tracks
    let unsafeTrack = this.state.unsafeTracks.map((unsafeTrack, i) => (
      <UnsafeTracks
        key={i}
        index={i}
        unsafeTrack={this.state.unsafeTracks[i]}
      />
    ));

    console.log('this.state', this.state);

    if(this.state.artist == null){
      return (
        <div className="home-page">
          <img className="bg-image" src={defaultImage} alt="concertimage"/>
          <div>
            <h1 className="label">Search for something</h1>
            <Search
              updateQuery={this.updateQuery}
              search={this.search}
            />
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
      <Sidebar
        username={this.state.userDetails.username}
        product={this.state.userDetails.product}
        image={this.state.userDetails.image}
        followers={this.state.userDetails.followers}
      />
      <div className="landing-page">
        <div className="main-bg">
        <img className="bg-image" id="bg-image" src={artist.images[0].url} alt="concertimage"/>
        <div className="searched">
          <Search
              updateQuery={this.updateQuery}
              search={this.search}
          />
        </div>
        <Artist   
          image={artist.images[0].url}
          name={artist.name}
          popularity={artist.popularity}
          followers={artist.followers.total}
          hasSafeTracks={this.state.hasSafeTracks}
        />
        <h2 className="track-label">TOP 10 SONGS</h2>
        <h3 className="lowkey-track-label">SAFE FOR WORK</h3>
        <div className="safe-tracks">
          {safeTrack}
        </div>
        <h3 className="lowkey-track-label">NOT SAFE FOR WORK</h3>
        <div className="unsafe-tracks">
          {unsafeTrack}
        </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
export default App;