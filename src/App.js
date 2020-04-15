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
import ChangeProfile from './pages/ChangeProfile';
import History from './pages/History'
import HistoryDetail from './pages/HistoryDetail'
import SearchImdb from './latihan/FiturSearhimdb'
import FiturWilayah from './latihan/FiturWilayah';
import CounterWithRedux from './pages/CounterWithRedux';
import ListToDo from './latihan/ListToDo';
import CartRevisi from './pages/Cart_01';
import WishList from './pages/WishList';




class App extends Component {

  state={
    dataUser : null,
    tampung : null,
    tesProps : null
      
  }
  onTesProps = (param)=>{
    this.setState({tesProps:param})
  }
  
  //latihan props antar child dari register ke product detil
  onTampungData = (param) => {
    this.setState({tampung:param})
  }

  //setelah render pertama
  componentDidMount (){
    document.title = 'Farmhub - Pasar Hasil Tani Indonesia'
    // setiap kali refresh, bakalan ke trigger
    
    //mengambil id di local storage
    var id = localStorage.getItem('id')
    if(id!==null){
      //ambil data kembali
      Axios (urlApi + 'users/'+ id)
      .then((res)=>{
        this.setState({dataUser:res.data})
        console.log(res)
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
              <SellerDetil dariLogin={this.state.tesProps}/>
              </Route>
      
              <Route exact path='/login'>
              <Login bebas={this.onChangeDataUser} fnOnTesProps={this.onTesProps}/>
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

              <Route path='/cart-revisi'>
              <CartRevisi/>
              </Route>

              <Route path='/history'>
              <History/>
              </Route>

              <Route path='/history-detail'>
              <HistoryDetail/>
              </Route>

              <Route path='/wishlist'>
              <WishList/>
              </Route>

              <Route path='/change-profile'>
              <ChangeProfile/>
              </Route>

              <Route exact path='/latihan-fake-api'>
              <LatihanFakeApi/>
              </Route>
      
              <Route exact path='/latihan-fake-api-2'>
              <LatihanFakeApi2/>
              </Route>

              <Route path='/fitur-search'>
              <SearchImdb/>
              </Route>

              <Route path='/fitur-wilayah'>
              <FiturWilayah/>
              </Route>

              <Route path='/counter-redux'>
              <CounterWithRedux/>
              </Route>

              <Route path='/list'>
              <ListToDo/>
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
