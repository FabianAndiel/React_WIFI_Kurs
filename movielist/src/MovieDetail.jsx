import React, {useState, useEffect} from 'react';
import Movie from './Movie';
import {BACKDROP_PATH, THEMOVIEDB_API_URL} from  './constants';
import {fetchData} from './helpers';

const MovieDetail = (props) => {
  const [movie, setMovie] = useState({});

  const callBackMovie=(data)=> {
    setMovie(data);
  };

  useEffect(()=> {
    const id = props.match.params.id;
    const url = `${THEMOVIEDB_API_URL}movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=de-DE`;
    fetchData(url,callBackMovie);
  }, []);

  const  style = {
    background:`url(${BACKDROP_PATH}${movie.backdrop_path}) no-repeat`,
  }

  if(!movie) {
    return  <div></div>;
  }

    return (
      <div style={style} className="movieWrapper">
        <div className="movieInfo">
          <Movie movie={movie} />
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    );

  
}

export default MovieDetail;
