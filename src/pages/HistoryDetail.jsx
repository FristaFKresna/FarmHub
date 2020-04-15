import React from 'react'
import {Table} from 'reactstrap'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import Loading from './../components/Loading'

class HistoryDetail extends React.Component{
    state={
        items : null
    }

    componentDidMount=()=>{
        this.getDataHistoryDetail()
    }

    getDataHistoryDetail = () =>{
        var id = window.location.pathname.split('/')[2]
        Axios.get(urlApi + 'transaction/' + id)
        .then((res)=>{
            console.log(res)
            this.setState({items : res.data.items})
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    render(){
        if(this.state.items === null){
            return <Loading/>
        }

        return(
            <div className="container">
                <h4 className='mt-4 mb-3'>Your History</h4>

                <Table striped>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Sub Total</th>
                    </tr>
                    </thead>
                    <tbody>

                        {
                           this.state.items.map((val,index)=>{
                            return(
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{val.name}</td>
                                    <td>{val.price}</td>
                                    <td>{val.qty}</td>
                                    <td>{val.price * val.qty}</td>
                                </tr>

                            )

                           })
                        
                        }
                       
                    </tbody>
                </Table>

            </div>



        )
    }
}
export default HistoryDetail