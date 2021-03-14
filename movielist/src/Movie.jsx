import React from 'react';
import {Link} from 'react-router-dom';
import {POSTER_PATH} from './constants'




const Movie = (props) => {
  const {id,title,poster_path} = props.movie;
  const src = `${POSTER_PATH}${poster_path}`;
  console.log(src);
  return (
    <>
      <Link to = {`/${id}`}>    
        <img className="moviePoster" src={src} alt={title}/>
      </Link>
      <button id={id} onClick={props.deleteMovieById}>Löschen</button>
    </>
  );
}



export default Movie;
