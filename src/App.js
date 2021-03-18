
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Header/Shop/Shop';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Header/Review/Review';
import Description from './Components/Description/Description';
import Notfound from './Components/Notfound/Notfound';
import Productdetail from './Components/ProductDetail/Productdetail';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import Privateroute from './Components/Privateroute/Privateroute';

export const usercontext=createContext();

function App() {
  const [loggeduser,setloggeduser]=useState({});
  return (
    <usercontext.Provider value={[loggeduser,setloggeduser]}>
 
     <Router>
     <Header></Header>
       <Switch>
         <Route path='/shop'>
             <Shop></Shop>
         </Route>
         <Route path="/review">
          <Review></Review>
         </Route>
         <Privateroute path="/manage">
              <Description></Description>
         </Privateroute>
         <Route exact path="/">
           <Shop></Shop>
         </Route>
         <Route path="/product/:productkey">
         <Productdetail></Productdetail>
         </Route>
         <Route path="/login">
                 <Login></Login>
         </Route>
         <Privateroute path="/shipment">
             <Shipment></Shipment>
         </Privateroute>
         <Route path="*">
            <Notfound></Notfound>
         </Route>
       </Switch>
     </Router>
      
    </usercontext.Provider>
  );
}

export default App;
