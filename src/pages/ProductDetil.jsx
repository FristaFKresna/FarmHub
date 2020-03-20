// pake produk detil punya komputer-shop

//dibawah harga 
//lokasi penjual
//nama penjual

import React from 'react'
import './../supports/css/ProductDetil.css'
import { urlApi } from '../supports/constants/urlApi'
import Axios from 'axios'
import Loading from './../components/Loading'
import {Link} from 'react-router-dom'

class ProductDetail extends React.Component {

    state = {
        num : 1,
        data : null,
        dataPenjual : null,
    }

    componentDidMount(){
        var id = window.location.pathname.split('/')[2]
        console.log(window.location)
        this.getDataProductDetail(id)

    }



    getDataProductDetail = (param) => {
        Axios.get(urlApi+'products/'+param)
        .then((res)=>{
            this.getDataPenjual(res.data.id_penjual)
            this.setState({data:res.data})
        })
    }

    getDataPenjual = (id_penjual) => {
        Axios.get(urlApi + 'users/' + id_penjual)
        .then((res) => {
            console.log(res)
            this.setState({dataPenjual : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnAddCartProduct = () => {
        var id = localStorage.getItem('id')
        
        var data = {
            id_user : id,
            id_seller : this.state.data.id_penjual,
            id_product : this.state.data.id,
            product_name : this.state.data.name,
            image : this.state.data.img_url,
            qty : this.state.num,
            price : this.state.data.price
        }

        Axios.post(urlApi+'carts', data)
        .then((res)=>{
            console.log(res)
            alert('berhasil')
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }


    fnRenderBtn = () => {
        if(this.props.dataUser !== null){
            if(this.props.dataUser.role === 'penjual'){
                return(
                    <div className="row justify-content-end">   
                        <div className='col-md-4'></div>
                        <div className="btn btn-warning">Tidak Bisa Beli</div>
                    </div>
                )
            }else{
                return(
                    
                    <div className="row justify-content-end">   
                            <div className='col-md-4'>
                            <div className='total text-muted'>Total</div>
                            <div className='harga'>Rp. {this.state.num*this.state.data.price} </div>
                            </div>
                            <div className='col-md-5'>
                            <div className="btn btn-warning" onClick={this.onBtnAddCartProduct}>Tambah ke Keranjang</div>
                            </div>
                    </div>
                    
                )
            }

        }else{
            return(
                <div className="row justify-content-end">   
                        <div className='col-md-4'></div>
                        <div className="btn btn-warning">Anda Harus Login</div>
                </div>
                
            )
        }
    }


    onBtnPlusClick = () => {
        this.setState({num : this.state.num < this.state.data.stock ? this.state.num + 1: this.state.data.stock})
    }

    onBtnMinClick = () => {
        this.setState({num : this.state.num !== 1 ? this.state.num - 1 : 1})
    }



    render(){
        if(this.state.data === null || this.state.dataPenjual === null || this.state.dataUser === null){
            return(
                <Loading/>
            )
        }

        if(this.state.data.length === 0){
            return(
                <h1>Data Masih Kosong</h1>
            )
        }

        return(
            <div className="container-fluid my-5">

                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-sm-4 my-5 my-card">
                        <img src={this.state.data.img_url} width='100%' alt=""/>                   
                        </div>
                        <div className="col-sm-7 my-5">
                                <div className='farmhub-product-detil-title'>{this.state.data.name}</div>
                                <div className='farmhub-product-detil-price'>Rp.  {this.state.data.price}</div>
                                <div className='farmhub-product-detil-location'>{this.state.dataPenjual.address}</div>
                                <div className='farmhub-product-detil-stok'>Stock : {this.state.data.stock}</div>

                                
                                

                                <div className='my-2'>
                                    <button onClick={this.onBtnMinClick}>-</button>
                                    <span className='mx-3'>{this.state.num}</span>
                                    <button onClick={this.onBtnPlusClick}>+</button>
                                </div>
                        </div>
                    </div>

                    <hr/>
                    <div className='farmhub-product-detil-info'>Informasi Produk</div>
                    <div className='farmhub-product-detil-location'>{this.state.data.deskripsi}</div>
                    {/* <div className='farmhub-product-detil-location'>2. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
                    <div className='farmhub-product-detil-location'>3. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div> */}

                </div>


                    
                    <div className="container-fluid keranjang shadow fixed-bottom p-3">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-md-6 align-self-center">
                                    <div style={{fontSize:'22px'}}>Penjual :</div> 
                                    <Link to={'/seller-detail/'+ this.state.data.id_penjual}>
                                        <span className='farmhub-product-detil-stok text-muted' style={{cursor:'pointer'}}>{this.state.dataPenjual.fullname} - {this.state.dataPenjual.address}</span>
                                    </Link>
                                </div>

                                <div className="col-md-6 text right">
                                    {/* <div className="row justify-content-end">   
                                        <div className='col-md-4'>
                                        <div className='total text-muted'>Total</div>
                                        <div className='harga'>Rp. {this.state.num*this.state.data.price} </div>
                                        </div>
                                        <div className='col-md-5'> */}
                                            {/* <div className="btn btn-warning">Tambah ke Keranjang</div> */}
                                            {this.fnRenderBtn()}
                                        {/* </div>
                                    </div>      */}
                                </div>
                            </div>
                        </div>
                    </div>


                {/* <div className="d-flex justify-content-end keranjang shadow fixed-bottom p-3">
                    <div className="justify-content-end align-items-center ">
                        <div className='total text-muted'>Total</div>
                        <div className='harga'>Rp.1.234.567</div>
                    </div>
                    <div className="col-sm-3">
                        <div className="btn btn-warning">Tambah ke Keranjang</div>
                    </div>
                </div> */}





            </div>

               
                




                
            
        )
    }
}

export default ProductDetail