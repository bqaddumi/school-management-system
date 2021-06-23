import { Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/navbar';
import HomePageForm from './components/pages/home/homePageForm';
import './App.css';

function App() {
  return (
    <Navbar>
      <Switch>
        <Route path='/home' exact>
          <HomePageForm />
        </Route>
      </Switch>
    </Navbar>
  );
}

export default App;