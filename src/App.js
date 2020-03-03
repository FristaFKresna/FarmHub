import React from 'react';
import FarmHubNavbar from './components/Navbar';
import FooterFarmHub from './components/Footer';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetil';
import { Route } from 'react-router-dom';



function App() {
  return (
    <div>
      <FarmHubNavbar/>

      <Route exact path='/'>
      <div className='container-fluid' style={{minHeight:'80vh'}}>
        <ProductList/>
      </div>
      <FooterFarmHub/>
      </Route>

      <Route exact path='/product'>
      <ProductDetail/>
      </Route>

      <Route exact path='/login'>
      <Login/>
      <FooterFarmHub/>
      </Route>
      
      <Route exact path='/register'>
      <Register/>
      <FooterFarmHub/>
      </Route>

      
    </div>
  );
}

export default App;
