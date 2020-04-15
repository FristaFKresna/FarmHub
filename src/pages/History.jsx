import React from 'react'
import {Table} from 'reactstrap'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import Loading from './../components/Loading'
import {Link} from 'react-router-dom'

class History extends React.Component{
    state = {
        dataTransaction : null,

    }

    componentDidMount=()=>{
        this.getDataTransaction()
    }

    getDataTransaction=()=>{
        Axios.get(urlApi+'transaction?id_pembeli='+ localStorage.getItem('id'))
        .then((res)=>{
            console.log(res)
            this.setState({dataTransaction:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    fnPrintHistoryTransaction =()=>{
        var output = this.state.dataTransaction.map((val, index)=>{
            return(
                <tr key={val.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{val.date}</td>
                    <td>{val.items.length}</td>
                    <td>{val.total}</td>
                    <td>
                        <Link to={'/history-detail/'+ val.id}><input type='button' className='btn btn-outline-info' value='Lihat Detail' /></Link>
                    </td>
                </tr>
            )
        })

        return output

    }

    render(){
        if(this.state.dataTransaction === null){
            return <Loading/>
        }

        return(
            <div className="container">
                <h4 className='mt-4 mb-3'>Your History</h4>

                <Table striped>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Jumlah Item</th>
                        <th>Total</th>
                        <th>Lihat Detail</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.fnPrintHistoryTransaction()}
                    </tbody>
                </Table>

            </div>
        )
    }  
}

export default History