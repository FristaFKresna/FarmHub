import React, { Component } from 'react';
import FarmHubNavbar from './components/Navbar';
import FooterFarmHub from './components/Footer';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetil';
import { Route,Switch } from 'react-router-dom';
import LatihanFakeApi from './pages/LatihanFakeApi';
import LatihanFakeApi2 from './pages/latihan-fake-api-2';
import SelectRole from './pages/selectRole';
import CompleteYourProfile from './pages/completeYourProfile';
import Axios from 'axios';
import { urlApi } from './supports/constants/urlApi';
import PageNotFound from './pages/pageNotFound';
import PostYourProduct from './pages/PostYourProduct';
import SellerDetil from './pages/SellerDetil';
import ManageProduct from './pages/ManageProduct';
import EditData from './pages/EditData'
import Cart from './pages/Cart'



class App extends Component {

  state={
    dataUser : null,
    tampung : null,
    
  }

  
  //latihan props antar child dari register ke product detil
  onTampungData = (param) => {
    this.setState({tampung:param})
  }

  //setelah render pertama
  componentDidMount (){
    // setiap kali refresh, bakalan ke trigger

    //mengambil id di local storage
    var id = localStorage.getItem('id')

    if(id!==null){
      //ambil data kembali
      Axios (urlApi + 'users/'+ id)
      .then((res)=>{
        this.setState({dataUser:res.data})
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  onDeleteDataUser = () => {
    this.setState({dataUser : null})
  }
  
  onChangeDataUser = (data) => {
    this.setState({dataUser:data})
  }

  render(){
    return (
      <div>
        <FarmHubNavbar fnDeleteDataUser={this.onDeleteDataUser} user={this.state.dataUser}/>
  
        <div className='container-fluid' style={{minHeight:'80vh'}}>

          <Switch>

              <Route exact path='/'>
              <ProductList dariRegister={this.state.tampung} dataUser={this.state.dataUser}/>
              </Route>
      
              <Route path='/product-detail'>
              <ProductDetail dataUser={this.state.dataUser}/>
              </Route>

              <Route path='/seller-detail'>
              <SellerDetil/>
              </Route>
      
              <Route exact path='/login'>
              <Login bebas={this.onChangeDataUser}/>
              </Route>
              
              <Route exact path='/register'>
              <Register fnKirimData={this.onTampungData}/>
              </Route>
              
              <Route exact path='/select-role'>
              <SelectRole/>
              </Route>
      
              <Route exact path='/complete-your-profile'>
              <CompleteYourProfile/>
              </Route>

              <Route exact path='/post-your-product'>
              <PostYourProduct/>
              </Route>

              <Route exact path='/manage-product'>
              <ManageProduct/>
              </Route>

              <Route path='/edit-data'>
              <EditData/>
              </Route>

              <Route path='/cart'>
              <Cart/>
              </Route>

              <Route exact path='/latihan-fake-api'>
              <LatihanFakeApi/>
              </Route>
      
              <Route exact path='/latihan-fake-api-2'>
              <LatihanFakeApi2/>
              </Route>

              <Route exact path='/*'>
              <PageNotFound/>
              </Route>

          </Switch>
      
  
        </div>
  
        <FooterFarmHub/>
      </div>

    );
  }
}

export default App;
