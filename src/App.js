
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


function App() {
  return (
    <div>
      <Header></Header>
     <Router>
       <Switch>
         <Route path='/shop'>
             <Shop></Shop>
         </Route>
         <Route path="/review">
          <Review></Review>
         </Route>
         <Route path="/manage">
              <Description></Description>
         </Route>
         <Route exact path="/">
           <Shop></Shop>
         </Route>
         <Route path="/product/:productkey">
         <Productdetail></Productdetail>
         </Route>
         <Route path="*">
            <Notfound></Notfound>
         </Route>
       </Switch>
     </Router>
      
    </div>
  );
}

export default App;
