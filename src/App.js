import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import HomePageForm from './pages/home/homePageForm';
import SignupPageForm from './pages/signUp/signupPageForm';
import './App.css';

function App() {
  return (
    <Navbar>
      <Switch>
        <Route path='/home' exact>
          <HomePageForm />
        </Route>
        <Route path='/login' exact>
          {/* <HomePageForm /> */}
        </Route>
        <Route path='/signup' exact>
          <SignupPageForm />
        </Route>
        <Route path='*' exact>
          <Redirect to='/home' />
        </Route>
      </Switch>
    </Navbar>
  );
}

export default App;