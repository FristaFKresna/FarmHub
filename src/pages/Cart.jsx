import React from 'react'
import {Table} from 'reactstrap'
import Loading from './../components/Loading'
import { urlApi } from '../supports/constants/urlApi'
import Axios from 'axios'

class Cart extends React.Component{
    state = {
        dataCart : null,
        dataProduct : null
    }

    componentDidMount=()=>{
        var id = window.location.pathname.split('/')[2]
        console.log(window.location)
        this.getDataCart(id)
        this.getDataProduct()
    }

   
    onBtnPlusClick = (param1) => {
        var product_filter = this.state.dataProduct.filter((el)=>{
            return el.id === param1.id_product
        })

        if(param1.qty < product_filter[0].stock){

            var plus = param1.qty + 1
            var data ={
                qty : plus
            }

            Axios.patch(urlApi+'carts/'+param1.id, data )
            .then((res)=>{
                console.log(res)
                this.getDataCart(param1.id_user)
                    // Axios.get(urlApi+'carts?id_user='+param1.id_user)
                    // .then((res)=>{
                    // this.setState({dataCart:res.data})
                    // })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
        // console.log(product_filter[0].stock)
        
    }

    onBtnMinClick = (param1) => {

        if(param1.qty !== 1){

            var min = param1.qty - 1
            var data ={
                qty : min
            }

            Axios.patch(urlApi+'carts/'+param1.id, data )
            .then((res)=>{
                console.log(res)
                this.getDataCart(param1.id_user)
                    // Axios.get(urlApi+'carts?id_user='+param1.id_user)
                    // .then((res)=>{
                    // this.setState({dataCart:res.data})
                    // })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        // console.log(product_filter[0].stock)
        // this.setState({num : this.state.num !== 1 ? this.state.num - 1 : 1})
    }

    getDataProduct = () => {
        Axios.get(urlApi+'products')
        .then((res)=>{
            console.log(res)
            this.setState({dataProduct:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getDataCart = (id) => {
        Axios.get(urlApi+'carts?id_user='+id)
        .then((res)=>{
            console.log(res)
            this.setState({dataCart:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    printDataCart=()=>{
       
        var output = this.state.dataCart.map((val,index)=>{
            return(
                <tr key={val.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{val.product_name}</td>
                    <td><img src={val.image} width='50px' alt=''/></td>
                    <td>{val.price}</td>
                    <td>
                        <button onClick={()=>{this.onBtnMinClick(val)}}>-</button>
                        <span className='mx-3'>{val.qty}</span>
                        <button onClick={()=>{this.onBtnPlusClick(val)}}>+</button>
                    </td>
                    <td>{val.qty*val.price}</td>
                    <td>
                        <input type='button' className='btn btn-outline-danger' value='delete' onClick={()=>{this.onDeleteBtnClick(val)}}/>
                    </td>
                </tr>

            )
        })
    
        return output
    }

    grandTotal=()=>{
        var output=0
        this.state.dataCart.map((val)=>{
            return(
                output+=(val.qty*val.price)
            )
        })
        return output
    }

    onDeleteBtnClick = (param) =>{
        Axios.delete(urlApi+'carts/'+ param.id)
        .then((res)=>{
            console.log(res)
            alert('delete berhasil')
            this.getDataCart(param.id_user)
            // Axios.get(urlApi+'carts?id_user='+param.id_user)
            // .then((res)=>{
            // this.setState({dataCart:res.data})
            // })
        
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    


    render(){

        if(this.state.dataCart === null || this.state.dataProduct === null){
            return<Loading/>
        }

        if(this.state.dataCart.length === 0){
            return(
            <div className="container text-center">
                <h1>Data Masih Kosong</h1>
            </div>
            )
        }

        return(
            <div className="container">
                <h4 className='mt-4 mb-3'>Your Cart</h4>

                <Table striped>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.printDataCart()}
                    </tbody>
                </Table>


                <div className="container-fluid keranjang shadow fixed-bottom p-3">
                    <div className="container">
                        <div className="row justify-content-end">
                            <div className="col-md-6 text right">
                                <div className="row justify-content-end">   
                                    <div className='col-md-4'>
                                    <div className='total text-muted'>Grand Total</div>
                                    <div className='harga'>Rp. {this.grandTotal()}   </div>
                                    </div>
                                    <div className='col-md-5 align-self-center'>
                                    <div className="btn btn-primary w-100">Buy</div>  
                                    </div>
                                </div>     
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        )
    }
}

export default Cart