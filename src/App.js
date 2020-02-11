import React, { Component } from 'react';
import Artist from './components/Artist';
import './App.css';
import Search from './components/Search';
import SafeTracks from './components/SafeTracks';
import UnsafeTracks from './components/UnsafeTracks';
import Sidebar from './components/Sidebar';
import Landing from './components/Landing';
import Welcome from './components/Welcome';
import UserTopTracks from './components/UserTopTracks';
import UserLogo from './user.png';

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
      }),
      userTop: ({
        tracks: ({
          artist: [],
          track: [],
          image: [],
          explicit: [],
          popularity: [],
          duration: [],
          safe: 0,
        }),
      }),
      token: ''
    }
  }
    componentDidMount() {
      var vars = {}
      const queryUri = window.location.hash.substr(1);
      if(queryUri !== ''){
          var token = queryUri.match(/=(.*)&token_type/).pop();
      }
      const { userToken } = this.state.token;
      if(userToken !== '') {
          this.setState({  token: token  });
          // this.userLogin();
      }
    }

    login = (async) => {
      var vars = {}
      const queryUri = window.location.hash.substr(1);
      if(queryUri !== ''){
          var token = queryUri.match(/=(.*)&token_type/).pop();
      }
      this.setState({ token: token });
    }

    userLogin = (async) => {
      const BASE_URL = 'https://api.spotify.com/v1/';
      const FETCHUSERDETAILS = 'me';
      const userTop = 'me/top/';
      const userTracks = 'tracks?time_range=medium_term&limit=25&offset=5';
      var accessToken = this.state.token;
      const FETCHUSERDETAILS_URL = BASE_URL + FETCHUSERDETAILS;
      const fetchUserTracks = BASE_URL + userTop + userTracks;
      var myOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        mode: 'cors',
        cache: 'default'
      };

      // Get current user details
      fetch(FETCHUSERDETAILS_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          // console.log(json);
          const username = json.display_name;
          const product = json.product;
          const followers = json.followers.total;
          const image = `${UserLogo}`;
          if(json.images.length > 1){
            const image = json.images[0].url;
          } 
          if(this.state.userDetails.username === ''){
            this.setState({ userDetails: ({ username: username, product: product, followers: followers, image: image, })});
          }
        });

        // Get current user details
      fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=25&offset=5', myOptions)
      .then(response => response.json())
      .then(json => {
        var i = 0;
        let safe = 0;
        // console.log(`user top tracks are - ${JSON.stringify(json.items[i].album)}`);
        for (i = 0; i < json.items.length; i++) {
          const jsonArtist = this.state.userTop.tracks.artist.concat(json.items[i].album.artists[0].name);
          const jsonTracks = this.state.userTop.tracks.track.concat(json.items[i].name);
          const jsonImage = this.state.userTop.tracks.image.concat(json.items[i].album.images[0].url);
          const explicit = this.state.userTop.tracks.explicit.concat(json.items[i].explicit);
          const popularity = this.state.userTop.tracks.popularity.concat(json.items[i].popularity);
          const duration = this.state.userTop.tracks.duration.concat(json.items[i].duration_ms);
          if(json.items[i].explicit === true){
            safe++;
          }
          this.setState({ 
            userTop: 
            ({ tracks: 
              ({ artist: jsonArtist, 
                 track: jsonTracks,  
                 image: jsonImage, 
                 explicit: explicit, 
                 popularity: popularity, 
                 safe: safe,
                 duration: duration,
              }) 
            }) 
          });
        }
      });
    }

  search = (asycnc) => {
    const BASE_URL = 'https://api.spotify.com/v1/';
    const FETCHUSERDETAILS = 'me';
    const FETCHSEARCH = 'search?';
    const FETCHARTISTS = 'artists';
    var accessToken = this.state.token;
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

    // Get current user details
    fetch('https://api.spotify.com/v1/me', myOptions)
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        const username = json.display_name;
        const product = json.product;
        const followers = json.followers.total;
        const image = `${UserLogo}`;
          if(json.images.length > 1){
            const image = json.images[0].url;
          } 
        this.setState({ userDetails: ({ username: username, product: product, followers: followers, image: image, token: 'hi' })});
      });

    //Fetch artist details and then search for top tracks
    if(this.state.query === ''){
      return;
    }
    fetch(FETCHARTIST_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        if(json.artists.items.length < 1){
          return;
        }
        const artist = json.artists.items[0];   
        this.setState({ artist });
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

  componentDidUpdate() {
    if(this.state.token !== ''){
      // console.log('token not = to ""');
    }
  }

  signout = () => {
    this.setState({ token: '' });
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

    //Set keys for multiple unsafe tracks
    let userTopTracks = this.state.userTop.tracks.artist.map((userTopTrack, i) => (
      <UserTopTracks
        key={i}
        index={i}
        artist={this.state.userTop.tracks.artist[i]}
        tracks={this.state.userTop.tracks.track[i]}
        image={this.state.userTop.tracks.image[i]}
        explicit={this.state.userTop.tracks.explicit[i]}
        popularity={this.state.userTop.tracks.popularity[i]}
        duration={this.state.userTop.tracks.duration[i]}
      />
    ));

    // console.log('this.state', this.state);
 
    if(this.state.token === '' || this.state.token === undefined){
      return (
        <Landing 
          login={this.login}
        />
      );
    }

    if(this.state.userDetails.username == ''){
      return (
        <React.Fragment>
          <Welcome
              enter={this.userLogin}
          />
        </React.Fragment>
      );
    }
    
    if(this.state.artist == null){
      return (
        <React.Fragment>
          <Sidebar
              username={this.state.userDetails.username}
              product={this.state.userDetails.product}
              image={this.state.userDetails.image}
              followers={this.state.userDetails.followers}
              signout={this.signout}
          />
          <div className="landing-page">
        <div className="main-bg">
        <div className="searched">
          <Search
              updateQuery={this.updateQuery}
              search={this.search}
          />
          <h2 className="track-label personal">YOUR TOP 25 SONGS</h2>
          {/* {/* <h3 className="lowkey-track-label">SAFE FOR WORK</h3> */}
          <h3 className="lowkey-track-label">{this.state.userTop.tracks.safe} OF THESE ARE WORK SAFE</h3>
          {userTopTracks}
        </div>
        </div>
      </div>
        </React.Fragment>
      );
    }
    

    return (
      <React.Fragment>
      <Sidebar
        username={this.state.userDetails.username}
        product={this.state.userDetails.product}
        image={this.state.userDetails.image}
        followers={this.state.userDetails.followers}
        signout={this.signout}
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
        <h3 className="lowkey-track-label">{this.state.safeTracks.length} SAFE FOR WORK</h3>
        <div className="safe-tracks">
          {safeTrack}
        </div>
        <h3 className="lowkey-track-label">{this.state.unsafeTracks.length} NOT SAFE FOR WORK</h3>
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