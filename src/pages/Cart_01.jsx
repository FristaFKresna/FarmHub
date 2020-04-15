import React from 'react'
import {Table} from 'reactstrap'
import Loading from '../components/Loading'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import Swal from 'sweetalert2'

class CartRevisi extends React.Component{
    state = {
        dataCart : null,
        dataProduct : null,
        loading : false
    
    }

    componentDidMount=()=>{
        this.getDataCart()
    }

    getDataCart=()=>{
        Axios.get(urlApi+'carts?id_pembeli=' + localStorage.getItem('id'))      // UNTUK MENDAPATKAN DATA CART
        .then((res)=>{
            console.log(res.data)
            this.setState({dataCart:res.data})
            var url = 'http://localhost:3001/products?'                         // UNTUK MENDAPATKAN DATA PRODUCT

            res.data.forEach((val)=>{
                url += 'id=' + val.id_product + '&'
            })

            url = url.slice(0,url.length - 1)                                   // HAPUS '&' DI AKHIR KALIMAT

            Axios.get(url)                                      // GET PRODUCT PAKE AXIOS
            .then((res)=>{
                console.log(res.data)
                this.setState({dataProduct : res.data})
            })
            .catch((err)=>{
                console.log(err)
            })

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    printTotalBelanja=()=>{
        let data_gabungan = []
        this.state.dataProduct.forEach((val)=>{
            var new_obj = val
            new_obj.qty = this.state.dataCart.filter((cart)=> cart.id_product === val.id)[0].qty            
            new_obj.id_cart = this.state.dataCart.filter((cart)=> cart.id_product === val.id)[0].id         

            data_gabungan.push(new_obj)
        })

        let total = 0
        data_gabungan.forEach((data)=>{
            total += (data.price * data.qty)
        })

        return total
    }


    renderDataCart=()=>{

        ///GABUNGIN DATA_CART DAN DATA_PRODUCT
        let data_gabungan = []
        this.state.dataProduct.forEach((val)=>{
            var new_obj = val
            new_obj.qty = this.state.dataCart.filter((cart)=> cart.id_product === val.id)[0].qty            //GABUNGIN DATA QTY DI CART KE PRODUCT
            new_obj.id_cart = this.state.dataCart.filter((cart)=> cart.id_product === val.id)[0].id         //GABUNGIN DATA ID DI CART KE PRODUCT JADI ID_CART

            data_gabungan.push(new_obj)
        })

     
        console.log(data_gabungan)
        //CARA YANG LEBIH MUDAH DIPAHAMI DENGAN MEMBUAT VARIABEL DATA GABUNGAN======================================================
            return data_gabungan.map((val,index)=>{
                return(
                <tr key={val.id}>
                    <th scope="row">{index+1}</th>
                    <td>{val.name}</td>            
                    <td><img src={val.img_url} width='50px' alt=''/></td>
                    <td>Rp {val.price}</td>
                    <td>
                        <button onClick={()=>this.onMinusBtn(val.qty,val.id_cart)}>-</button>
                        <span className='mx-3'>{val.qty}</span>
                        <button onClick={()=>this.onPlusBtn(val.qty, val.id_cart, val.stock)}>+</button>
                    </td>
                    <td>Rp {val.price * val.qty}</td>
                    <td>
                        <input type='button' className='btn btn-outline-danger' value='delete' onClick={()=>this.onDeleteBtnClick(val.id_cart)}/>
                    </td>
                </tr>   
                )
            })
        //CARA YANG LEBIH MUDAH DIPAHAMI DENGAN MEMBUAT VARIABEL DATA GABUNGAN======================================================




        // CARA SIMPEL GA USAH PAKE LET DATA GABUNGAN, LANGSUNG DI TULIS FIND DI LINE NYA======================================================
                // return this.state.dataCart.map((val,index)=>{
                //     return(
                // <tr key={val.id}>
                //     <th scope="row">{index+1}</th>
                //     <td>{this.state.dataProduct.find((product)=>product.id === val.id_product).name}</td>            
                //     <td><img src={this.state.dataProduct.find((product)=>product.id === val.id_product).img_url} width='50px' alt=''/></td>
                //     <td>Rp {this.state.dataProduct.find((product)=>product.id === val.id_product).price}</td>
                //     <td>
                //         <button>-</button>
                //         <span className='mx-3'>{val.qty}</span>
                //         <button>+</button>
                //     </td>
                //     <td>Rp 50000</td>
                //     <td>
                //         <input type='button' className='btn btn-outline-danger' value='delete'/>
                //     </td>
                // </tr>   
                
                //     )
                // })
        // CARA SIMPEL GA USAH PAKE LET DATA GABUNGAN, LANGSUNG DI TULIS FIND DI LINE NYA======================================================
    }

    onMinusBtn = (qty_old, id_cart) =>{
        let new_qty = qty_old - 1
        if(new_qty > 0){
            Axios.patch(urlApi + 'carts/' + id_cart,{qty : new_qty})
            .then((res)=>{
                this.getDataCart()
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    onPlusBtn = (qty_old, id_cart, stock) => {
        let new_qty = qty_old + 1
        if(new_qty <= stock){
            Axios.patch(urlApi + 'carts/' + id_cart,{qty : new_qty})
            .then((res)=>{
                this.getDataCart()
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }


    checkout=()=>{
        if(window.confirm('Are You Sure Want to Checkout?')){
            this.setState({loading : true})
            //POST DATA KE TRANSACTION ================================================================================================
            let data_to_post = []
            let data_all = []
                this.state.dataProduct.forEach((val)=>{
                
                var obj_all = val
                obj_all.qty = Number(this.state.dataCart.filter((cart)=> cart.id_product === val.id)[0].qty) 

                var obj_to_post = {}
                obj_to_post.name = val.name
                obj_to_post.price = Number(val.price)
                obj_to_post.qty = Number(this.state.dataCart.filter((cart)=> cart.id_product === val.id)[0].qty)          
               
                data_to_post.push(obj_to_post)
                data_all.push(obj_all)
            })

            console.log(data_all)

            let items = data_to_post

            var data = {
                date : new Date(),
                total : Number(this.printTotalBelanja()),
                id_pembeli : Number(localStorage.getItem('id')),
                items : items
            }

            Axios.post(urlApi + 'transaction', data)
            .then((res)=>{
                //butuh new_stock, old_stock dan id product
                //UPDATE STOCK ==================================================================================
                var error = false
                data_all.forEach((val)=>{
                    let new_stock = val.stock - val.qty
                    Axios.patch(urlApi + 'products/'+ val.id, ({stock : new_stock}))
                    .then((res)=>{
                        console.log(res)
                    })
                    .catch((err)=>{
                        error = true
                        console.log(err)
                    })
                })

                if(error === false){
                    //DELETE DATA DI CART================================================================================
                    
                    this.state.dataCart.forEach((val) => {
                        Axios.delete(urlApi + 'carts/' +val.id)
                        .then((res)=>{
                            console.log(res)
                        })
                        .catch((err)=>{
                            
                            console.log(err)
                        })
                    })
                    
                    setTimeout(
                        ()=>{
                            Swal.fire('Checkout Berhasil')
                            this.getDataCart()
                        },
                        1000
                    )  
                }

            })
            .catch((err)=>{
                console.log(err)
            })           

        }
    }


    onDeleteBtnClick = (id) =>{
        if(window.confirm('Are You Sure Want To Delete?')){
            Axios.delete(urlApi + 'carts/' + id)
            .then((res)=>{
                console.log(res)
                Swal.fire('Delete Success')
                this.getDataCart()
            })
            .catch((err)=>{
                console.log(err)
            })
        }

    }



    render(){
        if(this.state.dataCart === null || this.state.dataProduct === null || this.state.dataGabungan === null) return <Loading/>
        if(this.state.dataCart.length === 0) return <h1> Cart Masih Kosong</h1>
        if(this.state.loading) return <Loading/>
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
                        {this.renderDataCart()}
                    </tbody>
                </Table>


                <div className="container-fluid keranjang shadow fixed-bottom p-3">
                    <div className="container">
                        <div className="row justify-content-end">
                            <div className="col-md-6 text right">
                                <div className="row justify-content-end">   
                                    <div className='col-md-4'>
                                    <div className='total text-muted'>Grand Total</div>
                                    <div className='harga'>Rp. {this.printTotalBelanja()}   </div>
                                    </div>
                                    <div className='col-md-5 align-self-center'>
                                    <div className="btn btn-primary w-100" onClick={this.checkout}>checkout</div>  
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

export default CartRevisi