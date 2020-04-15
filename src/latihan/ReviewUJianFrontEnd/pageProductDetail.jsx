import React from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import Loading from '../components/Loading'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
class ProductDetail extends React.Component{
    state={
        data : null,
        dataPenjual : null,
        dataUser : null,
        qty : 1,
        totalHarga : 0,
        dataAnotherProduct : null
    }
    componentDidMount(){
        var id =  window.location.pathname.split('/')[2]
        this.getDataProductDetail(id)
    }


    // var a = [2,3,4,54,3]

    // a.filter((val) => {
    //     return a > 3
    // })


    getDataProductBySeller = (id_penjual,id_selected) => {
        Axios.get( urlApi +'products?id_penjual=' + id_penjual)
        .then((res) => {
            console.log(res.data)
            let dataFiltered = res.data.filter((data) => {
                // return data.id !== Number(window.location.pathname.split('/')[2])
                return data.id !== id_selected
            })
            console.log(dataFiltered)
            this.setState({dataAnotherProduct :dataFiltered})
            
        })
        .catch((err) => {
            console.log(err)
        })

    }


    onBtnAddToCart = () => {

       


        var dataCart = {
            id_pembeli : Number(localStorage.getItem('id')),
            id_product : Number(window.location.pathname.split('/')[2]),
            qty : this.state.qty
        }

        Axios.get(urlApi+'cart?id_product=' + dataCart.id_product + '&id_pembeli=' + dataCart.id_pembeli)
        .then((res) => {


            // JSON SERVER ==> UPDATE DAN DELETE ITU BUTUH ID
            // 
            if(res.data.length >0){
                console.log(res.data)
                let qty_lama = res.data[0].qty
                let qty_baru = qty_lama + dataCart.qty

                let stock = this.state.data.stock
                if(qty_baru > stock){
                    return Swal.fire('Stock Tidak Cukup')
                }



                Axios.patch(urlApi + 'cart/' + res.data[0].id,{qty : qty_baru})
                .then((res) => {
                    Swal.fire('Update Cart Qty Success')
                })
                .catch((err) => {
                    console.log(err)
                })
                // update qty
                // udah ada
            }else{
                Axios.post(urlApi + 'cart',dataCart)
                .then((res) => {
                    Swal.fire('Add To Cart Success')
                })
                .catch((err) => {
                    console.log(err)
                })
                // belum ada
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // Harus Ambil Data Product, based penjualnya siapa?
    

    getDataProductDetail = (param) => {
    Axios.get(urlApi+'products/' + param)
        .then((res) => {
            console.log(res.data)
            this.getDataProductBySeller(res.data.id_penjual,res.data.id)
            document.title = res.data.name
            this.getDataPenjual(res.data.id_penjual)
            this.setState({data :res.data,totalHarga : res.data.price})
        })
    }

    getDataPenjual = (id_penjual) => {
        Axios.get(urlApi +'users/' + id_penjual)
        .then((res) => {
            console.log(res)
            this.setState({dataPenjual : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }   

    fnRenderBtn = () => {
        if(this.props.user !== null){
            if(this.props.user.role === 'penjual'){
                return(
                    <button className='btn btn-success'>Gak Bisa Beli</button>
                )
            }else{
                return(
                    <button className='btn btn-success' onClick={this.onBtnAddToCart}>Add To Cart</button>
                )
            }
        }else{
            return(
                <button className='btn btn-success'>Anda Harus Login Untuk Beli</button>
            )
        }
    }

    onMinHandler = () => {
        if(this.state.qty >= 2){
            this.setState({qty : this.state.qty- 1,totalHarga : (this.state.qty-1) * this.state.data.price})
        }
    }

    onPlusHandler = () => {
        if(this.state.qty < this.state.data.stock){
            this.setState({qty : this.state.qty+1,totalHarga : (this.state.qty+1) * this.state.data.price})
        }
    }

    renderDataAnotherProduct = () => {
        return this.state.dataAnotherProduct.slice(0,6).map((val) => {
            return(
                <div key={val.id} className='col-md-2'>
                    <img width='100%' src={val.img_url} alt="broken"/>
                    <p>{val.name}</p>
                    <p>Rp. {val.price}</p>
                </div>
            )
        })
    }

    render(){
        console.log('ini render')
        if(this.state.data === null || this.state.dataPenjual === null || this.state.dataAnotherProduct === null){
            return(
                <Loading />
            )
        }
        return(
            <div className='container'>
                <div className='row my-card p-3'>
                    <div className="col-sm-4">
                        <div className='p-2'>
                            <img src={this.state.data.img_url} width='100%' alt="broken"/>
                        </div>
                    </div>
                    <div className="col-sm-8 p-3">
                        <h2 style={{color:'#0f752e'}}>
                            {this.state.data.name}
                        </h2> 
                        <h4 style={{color:'#52575c'}}>
                         Rp. {this.state.data.price} / kg
                        </h4>
                        <p style={{color:'#25282b'}}>
                            Stock : {this.state.data.stock}
                        </p>

                        <Link to={'/seller-detail/' + this.state.data.id_penjual}>
                            <span style={{color:'#25282b',cursor:'pointer',textDecoration:'underline'}}>
                                {this.state.dataPenjual.fullname} ~ {this.state.dataPenjual.address}
                            </span>
                        </Link>


                        <p>{this.state.data.deskripsi}</p>
                        <div className='my-2' >
                            <span onClick={this.onMinHandler} className='btn btn-outline-danger mr-2'>
                                -
                            </span>
                            <span>
                            {this.state.qty}
                            </span>
                            <span onClick={this.onPlusHandler} className='btn btn-outline-primary ml-2'>
                                +
                            </span>
                        </div>
                        <div className='my-2' >
                            <span>Total Harga = {this.state.totalHarga}</span>
                        </div>
                        <div >{
                            this.fnRenderBtn()
                            
                        }
                            
                        </div>
                    </div>
                </div>

                
                <div className='mt-3 my-card p-3'>
                    <h4>Another Product From Seller</h4>
                    <div className='row'>
                        {this.renderDataAnotherProduct()}
                    </div>
                </div>
                {/* <h3>Product Detail</h3> */}
            </div>
        )
    }
}

export default ProductDetail;