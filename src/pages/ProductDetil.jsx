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
import Swal from 'sweetalert2'
import {NavLink} from 'reactstrap'


class ProductDetail extends React.Component {

    state = {
        num : 1,
        data : null,
        dataPenjual : null,
        dataCart : null,
        productLain : null,
    }

    componentDidMount(){
        var id = window.location.pathname.split('/')[2]
        console.log(window.location)
        this.getDataProductDetail(id)
        this.getDataCart()
                        
    }

   

    getDataCart = () => {
        var id_user = localStorage.getItem('id')

        Axios.get(urlApi+'carts?id_user='+id_user)
        .then((res)=>{
            console.log(res)
            this.setState({dataCart:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    
    getDataProductDetail = (param) => {
        Axios.get(urlApi+'products/'+param)
        .then((res)=>{
            this.getDataPenjual(res.data.id_penjual)
            this.getProductLain(res.data.id_penjual)
            this.setState({data:res.data})
            document.title=res.data.name
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

    getProductLain = (id_penjual) => {
        Axios.get(urlApi+'products?id_penjual='+id_penjual)
        .then((res)=>{
            console.log(res)
            this.setState({productLain:res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }


    onBtnAddCartProduct = () => {
        // "id": 1,
        // "id_pembeli": 4,
        // "id_product": 24,
        // "qty": 4
        //CARA BARU KITA BUTUH DATA CART SEPERTI DIATAS===========================================================================================================

        var dataCart = {
            id_pembeli : Number(localStorage.getItem('id')),
            id_product : Number(window.location.pathname.split('/')[2]),
            qty : this.state.num
        }
                                                                    //TAMBAH ID PEMBELI  HARUS TAU DATA CART INI PUNYA SIAPA
        Axios.get(urlApi+'carts?id_product=' + dataCart.id_product + '&id_pembeli=' + dataCart.id_pembeli)          //HANDLE DUPLIKAT KALO SUDAH ADA DI CART JADI NAMBAHIN STOK QTY NYA
        .then((res) =>{
            if(res.data.length > 0){
                //BERARTI UDA ADA DI CART ===> LALU UPDATE QTY
                console.log(res.data)
                let qty_lama = res.data[0].qty
                let qty_baru = qty_lama + dataCart.qty
                console.log(qty_baru)

                let stock = this.state.data.stock                //CARA DAPET STOK
                if(qty_baru > stock){                           // HANDLE SUPAYA QTY TIDAK BISA MELEBIHI STOK
                    return Swal.fire('Stock Tidak Cukup')
                }

                Axios.patch(urlApi + 'carts/' + res.data[0].id, {qty : qty_baru})   //UPDATE QTY BARU ====================================
                .then((res)=>{
                    Swal.fire('Update Cart Qty Success')
                })
                .catch((err)=>{
                    console.log(err)
                })

            }else{
                //KALO BELUM ADA POST DATA BARU DI CART
                Axios.post(urlApi + 'carts', dataCart)
                .then((res)=>{
                    console.log(res)
                    Swal.fire('Add To Cart Success')
        
                })
                .catch((err)=>{
                    console.log(err)
                })

            }
        })
        .catch((err)=>{
            console.log(err)
        })





        // CARA LAMA================================================================================================================================
        // var id = localStorage.getItem('id')
        
        // var data = {
        //     id_user : id,
        //     id_seller : this.state.data.id_penjual,
        //     id_product : this.state.data.id,
        //     product_name : this.state.data.name,
        //     image : this.state.data.img_url,
        //     qty : this.state.num,
        //     price : this.state.data.price
        // }

        
        // var filteredData = this.state.dataCart.filter((el)=>{
        //     return el.id_product === this.state.data.id
        // })
        
        // if(filteredData.length === 0){
        //     return(
        //         Axios.post(urlApi+'carts', data)
        //         .then((res)=>{
        //             console.log(res)
        //             Swal.fire({
        //                 icon:'success',
        //                 title:'Tambah Keranjang Berhasil',
        //             })
        //         })
        //         .catch((err)=>{
        //             console.log(err)
        //         })
        //     )
        // }else{
        //     Swal.fire({
        //         icon:'info',
        //         title:'Produk Sudah Ditambahkan Dalam Keranjang'
        //     })
        // }
        // CARA LAMA================================================================================================================================


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
                            <div className='col-md-4'>
                            <div className="btn btn-info" onClick={this.onBtnAddWishListProduct}>Add to Wishlist</div>
                            </div>
                            <div className='col-md-4'>
                            <div className="btn btn-warning" onClick={this.onBtnAddCartProduct}>Add to Cart</div>
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


    onBtnAddWishListProduct=()=>{
        var dataWishList = {
            id_pembeli : Number(localStorage.getItem('id')),
            id_product : Number(window.location.pathname.split('/')[2])
        }

        Axios.get(urlApi + 'wishlist?id_product='+ dataWishList.id_product + '&id_pembeli=' + dataWishList.id_pembeli)
        .then((res)=>{
            if(res.data.length > 0){
                return Swal.fire('Data Sudah Ada di Wishlist!')

            }else{
                Axios.post(urlApi + 'wishlist',dataWishList)
                .then((res)=>{
                    console.log(res)
                    Swal.fire('Add To Wishlist Success')
                })
                .catch((err)=>{
                    console.log(err)
                })
            }

        })
        .catch((err)=>{
            console.log(err)
        })

    }


    onBtnPlusClick = () => {
        this.setState({num : this.state.num < this.state.data.stock ? this.state.num + 1: this.state.data.stock})
    }

    onBtnMinClick = () => {
        this.setState({num : this.state.num !== 1 ? this.state.num - 1 : 1})
    }

    fnRenderAnotherProducts = () => {
        var dataFiltered = this.state.productLain.filter((val)=>{      //BISA DI FILTER PAS AXIOS GET DATA NYA
            return val.id !== this.state.data.id
        })

        var output = dataFiltered.slice(0,5).map((val)=>{
            return(
                <div key={val.id} className="my-card col-sm-2 mr-3 mt-3">
                    <NavLink href={'/product-detail/'+ val.id}>
                        <img style={{height:'70%',objectFit:'cover', objectPosition:'top'}} src={val.img_url} width='100%' alt=""/>
                    </NavLink>
                        <div className='farmhub-product-title'>{val.name}</div>
                        <div className='farmhub-product-price'>Rp. {val.price}</div>
                </div>
            )
        })
        return output
    }


    render(){
        if(this.state.data === null || this.state.dataPenjual === null || this.state.dataCart === null || this.state.productLain === null){
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


                <div className="container my-5">
                    <div className="my-card p-4">
                        <h4>Produk Lainnya Dari Penjual</h4>
                        <div className="row">
                            {this.fnRenderAnotherProducts()}
                        </div>
                    </div>
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