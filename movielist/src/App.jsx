import React from 'react';
import { BrowserRouter as Router, Route,Switch,Link, useRouteMatch} from 'react-router-dom';
import './App.css';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import LoginForm from './LoginForm';


const App = (props) => {
  const {title} = props;
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/" className="logoMovieList">
          <p className="logoMovieList"> {title} </p>
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={MovieList}></Route>
        <Route exact path="/login" component={LoginForm}></Route>
        <Route exact path="/:id" component={MovieDetail}></Route>
      </Switch>
          </div>
    </Router>
  );
}

export default App;
