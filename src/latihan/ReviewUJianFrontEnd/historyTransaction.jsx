import React, { Component } from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import Loading from '../components/Loading'
import moment from 'moment'
import { Link } from 'react-router-dom'


export default class HistoryTransaction extends Component {
    state ={
        data : null
    }
    componentDidMount() {
        this.getDataTransaction()
        // fetching data
    }

    getDataTransaction = () => {
        Axios.get(urlApi + 'transaction?id_pembeli=' + localStorage.getItem('id'))
        .then((res) => {
            this.setState({data : res.data})
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        if(this.state.data === null){
            return <Loading/>
        }
        
        return (
            <div className='container'>
                <h1>Transaction History </h1>
                <div className="table-responsive">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Count Items</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map((val,index) => {
                                    return(
                                        <tr key={val.id}> 
                                            <td>{index +1}</td>
                                            <td>{moment(val.date).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                            <td>{val.total}</td>
                                            <td>{val.items.length}</td>
                                            <td>
                                                <Link>
                                                    <span style={{fontStyle:'italic',cursor:'pointer',fontWeight:'bold',textDecoration:'underline',color:'grey'}}>See Detail</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}