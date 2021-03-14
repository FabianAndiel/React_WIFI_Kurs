import React,{useState,useEffect} from 'react';
import Movie from './Movie';
import {fetchData} from './helpers';
import {BACKDROP_PATH, THEMOVIEDB_API_URL} from  './constants';


const MovieList = (props) =>  {

 
  const[movies,setMovies] = useState([]);

  const callBackMovie=(data)=> {
    setMovies(data.results);
  };

  useEffect(()=> {
  
    const url = `${THEMOVIEDB_API_URL}discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=de-DE&sort_by=popularity.desc&include_adult=false`;
    fetchData(url,callBackMovie);
  }, []);


  
   
  const handleDeleteMovieById =   (event) => {
    const newMovies = movies.filter((movie)=> movie.id != event.target.id);
    setMovies(newMovies);
  }
  
  // handleDeleteMovieByEvent (event) {
  //   this.doDeleteMovie(event.target.id);
  // }

 

    return (
    <div className="movieGrid">
      {
        movies.map((movie)=>(
          <Movie key={movie.id} movie={movie} deleteMovieById={handleDeleteMovieById}/>

        ))
      }
    </div>
    )
  }


export default MovieList;
