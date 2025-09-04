import { Switch, Route } from 'react-router-dom';
import './App.css'
import MainPage from './pages/MainPage';
import OrderPage from './pages/OrderPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    
      <Switch>
        <Route path="/" exact>
          <MainPage/>
        </Route>
        <Route path="/order" exact>
          <OrderPage/>
        </Route>
        <Route path="/success" exact>
          <SuccessPage />
        </Route>
      </Switch>
    
  );
}

export default App;
