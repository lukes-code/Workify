import React, { useState, useEffect } from 'react';
import Artist from './components/Artist';
import './App.css';
import Searchbar from './components/Searchbar';
import SafeTracks from './components/SafeTracks';
import UnsafeTracks from './components/UnsafeTracks';
import Sidebar from './components/Sidebar';
import Landing from './components/Landing';
import Welcome from './components/Welcome';
import UserTopTracks from './components/UserTopTracks';
import UserLogo from './user.png';

const App = () => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState('');
    const [product, setProduct] = useState('');
    const [followers, setFollowers] = useState();
    const [query, setQuery] = useState();
    const [hasSafe, setHasSafe] = useState('no');
    let [safeNo, setSafeNo] = useState(0);
    const [image, setImage] = useState();
    const [safeTracks, setSafeTracks] = useState([]);
    const [unsafeTracks, setUnsafeTracks] = useState([]);
    const [topArtist, setTopArtist] = useState([]);
    const [topTrack, setTopTrack] = useState([]);
    const [topImage, setTopImage] = useState([]);
    const [topExplicit, setTopExplicit] = useState([]);
    const [topPopularity, setTopPopularity] = useState([]);
    const [topDuration, setTopDuration] = useState([]);
    const [artistImages, setArtistImages] = useState();
    const [artistName, setArtistName] = useState();
    const [artistFollowers, setArtistFollowers] = useState();
    const [artistPopularity, setArtistPopularity] = useState();
    const [topTracks, setTopTracks] = useState();

    useEffect(() => {
      const queryUri = window.location.hash.substr(1);
      if(queryUri && !token){
        var newToken = queryUri.match(/=(.*)&token_type/).pop();
        setToken(newToken);
      }
    }, [token]);

    const UserLogin = (async) => {
      const BASE_URL = 'https://api.spotify.com/v1/me';
      var myOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        mode: 'cors',
        cache: 'default'
      };

      // Get current user details
      fetch(BASE_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          if(!username){
            setUsername(json.display_name);
            setProduct(json.product);
            setFollowers(json.followers.total);
            if (json.images.length > 1) { 
              setImage(json.images[0].url);
            } else {
              setImage(UserLogo);
            }
          }
        });

        // Get current user details
      fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=25&offset=5', myOptions)
      .then(response => response.json())
      .then(json => {
        let i = 0;
        let artists = [];
        let tracks = [];
        let images = [];
        let explicit = [];
        let popularity = [];
        let duration = [];
        for (i = 0; i < json.items.length; i++) {
          artists.push(json.items[i].album.artists[0].name);
          tracks.push(json.items[i].name);
          images.push(json.items[i].album.images[0].url);
          explicit.push(json.items[i].explicit);
          popularity.push(json.items[i].popularity);
          duration.push(json.items[i].duration_ms);
          if(!json.items[i].explicit){
            setSafeNo(safeNo++);
          }
        }
        setTopArtist(topArtist => topArtist.concat(artists));
        setTopTrack(topTrack => topTrack.concat(tracks));
        setTopImage(topImage => topImage.concat(images));
        setTopExplicit(topExplicit => topExplicit.concat(explicit));
        setTopPopularity(topPopularity => topPopularity.concat(popularity));
        setTopDuration(topDuration => topDuration.concat(duration));
      });
    }

  const Search = (asycnc) => {
    const BASE_URL = 'https://api.spotify.com/v1/';
    const FETCHSEARCH = 'search?';
    const FETCHARTISTS = 'artists';
    const FETCHARTIST_URL = BASE_URL + FETCHSEARCH + 'q=' + query + '&type=artist&limit=1';
    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      mode: 'cors',
      cache: 'default'
    };

    //Fetch artist details and then search for top tracks
    if(!query){
      return;
    }
    fetch(FETCHARTIST_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        if(json.artists.items.length < 1){
          return;
        }
        setArtistImages(json.artists.items[0].images[0].url);
        setArtistName(json.artists.items[0].name);
        setArtistFollowers(json.artists.items[0].followers.total);
        setArtistPopularity(json.artists.items[0].popularity);
        let FETCHTOPTRACKS_URL = BASE_URL + FETCHARTISTS + '/' + json.artists.items[0].id + '/top-tracks?country=GB';
        console.log(FETCHTOPTRACKS_URL);
        fetch(FETCHTOPTRACKS_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            setTopTracks(json.tracks);
            isTrackExplicit(json.tracks);
          });
      });
  }

  const Signout = () => {
    setToken(null);
  }

  const UpdateQuery = (event) => {
    setQuery(event.target.value);
  }

  const isTrackExplicit = (trackList) => {
    console.log(trackList);
    var result = '';
    if(trackList.filter(x => x.explicit === false)){
      setHasSafe('yes');
      result = trackList.filter(x => x.explicit === false);
      setSafeTracks(result);
    } else{
      setHasSafe('no');
    }
    if(trackList.filter(x => x.explicit === true)){
      result = trackList.filter(x => x.explicit === true);
      setUnsafeTracks(result);
    }
  }

    //Set keys for multiple safe tracks
    let safeTrack = safeTracks.map((safeTrack, i) => (
      <SafeTracks
        key={i}
        index={i}
        image={safeTracks[i].album.images[2].url}
        albumName={safeTracks[i].album.name}
        trackName={safeTracks[i].name}
        duration={safeTracks[i].duration_ms}
        popularity={safeTracks[i].popularity}
      />
    ));

    //Set keys for multiple unsafe tracks
    let unsafeTrack = unsafeTracks.map((unsafeTrack, i) => (
      <UnsafeTracks
        key={i}
        index={i}
        image={unsafeTracks[i].album.images[2].url}
        albumName={unsafeTracks[i].album.name}
        trackName={unsafeTracks[i].name}
        duration={unsafeTracks[i].duration_ms}
        popularity={unsafeTracks[i].popularity}
      />
    ));

    //Set keys for multiple unsafe tracks
    let userTopTracks = topArtist.map((userTopTrack, i) => (
      <UserTopTracks
        key={i}
        index={i}
        artist={topArtist[i]}
        tracks={topTrack[i]}
        image={topImage[i]}
        explicit={topExplicit[i]}
        popularity={topPopularity[i]}
        duration={topDuration[i]}
      />
    ));
 
    if(!token){
      return (
        <Landing 
          login={useEffect}
        />
      );
    }
    
    if (!username) {
      return (
        <Welcome
            enter={UserLogin}
        />
      );
    }
    
    if (!artistName) {
      return (
        <React.Fragment>
          <Sidebar
            username={username}
            product={product}
            image={image}
            followers={followers}
            signout={Signout}
          />
          <div className="landing-page">
            <div className="main-bg">
              <div className="searched">
                <Searchbar
                    updateQuery={UpdateQuery}
                    search={Search}
                />
                <h2 className="track-label personal">YOUR TOP 25 SONGS</h2>
                <h3 className="lowkey-track-label">{safeNo} OF THESE ARE WORK SAFE</h3>
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
            username={username}
            product={product}
            image={image}
            followers={followers}
            signout={Signout}
          />
          <div className="landing-page">
            <div className="main-bg">
              <img className="bg-image" id="bg-image" src={artistImages} alt="concertimage"/>
              <div className="searched">
                <Searchbar
                    updateQuery={UpdateQuery}
                    search={Search}
                />
              </div>
              <Artist   
                image={artistImages}
                name={artistName}
                popularity={artistPopularity}
                followers={artistFollowers}
                hasSafeTracks={hasSafe}
              />
              <h2 className="track-label">TOP 10 SONGS</h2>
              <h3 className="lowkey-track-label">{safeTracks.length} SAFE FOR WORK</h3>
              <div className="safe-tracks">
                {safeTrack}
              </div>
              <h3 className="lowkey-track-label">{unsafeTracks.length} NOT SAFE FOR WORK</h3>
              <div className="unsafe-tracks">
                {unsafeTrack}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
}
export default App;
