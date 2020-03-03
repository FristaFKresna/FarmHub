// pake produk detil punya komputer-shop

//dibawah harga 
//lokasi penjual
//nama penjual

import React from 'react'
import './../supports/css/ProductDetil.css'

class ProductDetail extends React.Component {

    state = {
        num : 0,
    }

    onBtnPlusClick = () => {
        this.setState({num : this.state.num + 1})
    }

    onBtnMinClick = () => {
        this.setState({num : this.state.num !== 0 ? this.state.num - 1 : 0})
    }

    render(){
        return(
            <div className="container-fluid my-5">

                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-sm-4 my-5 my-card">
                        <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/7/4503850/4503850_cce2c93e-03a7-41c1-a3ed-75a02be6431f_480_480.jpg" width='100%' alt=""/>                   
                        </div>
                        <div className="col-sm-7 my-5">
                                <div className='farmhub-product-detil-title'>Apel Fuji</div>
                                <div className='farmhub-product-detil-price'>Rp. 30.000</div>
                                <div className='farmhub-product-detil-location'>Jakarta Selatan</div>
                                <div className='farmhub-product-detil-stok'>Stock : 16</div>
                                <div className='my-2'>
                                    <button onClick={this.onBtnMinClick}>-</button>
                                    <span className='mx-3'>{this.state.num}</span>
                                    <button onClick={this.onBtnPlusClick}>+</button>
                                </div>
                        </div>
                    </div>

                    <hr/>
                    <div className='farmhub-product-detil-info'>Informasi Produk</div>
                    <div className='farmhub-product-detil-location'>1. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
                    <div className='farmhub-product-detil-location'>2. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
                    <div className='farmhub-product-detil-location'>3. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>

                </div>


                <div className="d-flex justify-content-end keranjang shadow fixed-bottom p-3">
                    <div className="justify-content-end align-items-center ">
                        <div className='total text-muted'>Total</div>
                        <div className='harga'>Rp.1.234.567</div>
                    </div>
                    <div className="col-sm-3">
                        <div className="btn btn-warning">Tambah ke Keranjang</div>
                    </div>
                </div>


            </div>

               
                




                
            
        )
    }
}

export default ProductDetail