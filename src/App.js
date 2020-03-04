import React from 'react';
import FarmHubNavbar from './components/Navbar';
import FooterFarmHub from './components/Footer';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetil';
import { Route } from 'react-router-dom';
import LatihanFakeApi from './pages/LatihanFakeApi';
import LatihanFakeApi2 from './pages/latihan-fake-api-2';



function App() {
  return (
    <div>
      <FarmHubNavbar/>

      <div className='container-fluid' style={{minHeight:'80vh'}}>

        <Route exact path='/'>
        <ProductList/>
        </Route>

        <Route exact path='/product'>
        <ProductDetail/>
        </Route>

        <Route exact path='/login'>
        <Login/>
        </Route>
        
        <Route exact path='/register'>
        <Register/>
        </Route>

        <Route exact path='/latihan-fake-api'>
        <LatihanFakeApi/>
        </Route>

        <Route exact path='/latihan-fake-api-2'>
        <LatihanFakeApi2/>
        </Route>

      </div>

      <FooterFarmHub/>

      
    </div>
  );
}

export default App;
