import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './components/HomePage/Home';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';


function App() {
  return (
    <>
        <Router>

          <Switch>
          
            <Route exact path ="/" component = {Home}>
              <Home />
            </Route>
            <Route exact path ="/LoginPage" component = {LoginPage}/>
            <Route exact path ="/RegisterPage" component = {RegisterPage} />
          </Switch>


        </Router>
    </>
  );
}

export default App;
