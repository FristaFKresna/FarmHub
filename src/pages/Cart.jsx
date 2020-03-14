import React from 'react'
import {Table} from 'reactstrap'
import Loading from './../components/Loading'

class Cart extends React.Component{
    state = {
        num: 1,
        dataCart : null

    }

    onBtnPlusClick = () => {
        this.setState({num : this.state.num+1})
    }

    onBtnMinClick = () => {
        this.setState({num : this.state.num !== 1 ? this.state.num - 1 : 1})
    }

    render(){

        if(this.dataCart === null){
            return<Loading/>
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
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Apel Fuji</td>
                        <td><img src='https://ecs7.tokopedia.net/img/cache/700/product-1/2019/4/13/745401/745401_9b860dfc-21db-488b-9780-916054aa700e_1512_1512.jpg' width='50px' alt=''/></td>
                        <td>30000</td>
                        <td>
                            <button onClick={this.onBtnMinClick}>-</button>
                            <span className='mx-3'>{this.state.num}</span>
                            <button onClick={this.onBtnPlusClick}>+</button>
                        </td>
                        <td>
                            <input type='button' className='btn btn-outline-danger' value='delete'/>
                        </td>
                    </tr>
                    </tbody>
                </Table>


                <div className="container-fluid keranjang shadow fixed-bottom p-3">
                    <div className="container">
                        <div className="row justify-content-end">
                            <div className="col-md-6 text right">
                                <div className="row justify-content-end">   
                                    <div className='col-md-4'>
                                    <div className='total text-muted'>Total</div>
                                    <div className='harga'>Rp. 1000000 </div>
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