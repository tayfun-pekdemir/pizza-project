import { Switch, Route } from 'react-router-dom';
import './App.css'
import MainPage from './pages/MainPage';
import OrderPage from './pages/OrderPage';
import SuccessPage from './pages/SuccessPage';
import { useState } from "react" ;

function App() {
  const [ order, setOrder ] = useState(null);

  return (
    
      <Switch>
        <Route path="/" exact>
          <MainPage/>
        </Route>
        <Route path="/order" exact>
          <OrderPage setOrder={setOrder}/>
        </Route>
        <Route path="/success" exact>
          <SuccessPage order={order}/>
        </Route>
      </Switch>
    
  );
}

export default App;
