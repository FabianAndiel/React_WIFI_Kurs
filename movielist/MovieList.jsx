import React from 'react';
import Movie from './Movie';

class MovieList extends React.Component {

  constructor(props) {
    super(props);
  this.state = {
    movies:[]
    } 
  }



  async componentDidMount(){
    const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=301086ba3081806823ba23291d3f8e18&language=de-DE&sort_by=popularity.desc&include_adult=false`
        );

        const movies = await res.json();
        // console.log(movies);
        this.setState({
          movies:movies.results
        })
  }
   
  handleDeleteMovieById  (id) {
    const newMovies = this.state.movies.filter((movie)=> movie.id != id);
    this.setState({
      movies:newMovies
    });
  }
  
  handleDeleteMovieByEvent (event) {
    this.doDeleteMovie(event.target.id);
  }

 

  render(){
    console.log(this.state);
    return (
    <div className="movieGrid">
      {
        this.state.movies.map((movie)=>(
          <Movie key={movie.id} movie={movie} deleteMovieById= {this.handleDeleteMovieByEvent}/>

        ))
      }
    </div>
    )
  }
}

export default MovieList;
