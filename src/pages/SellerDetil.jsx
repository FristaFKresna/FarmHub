import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import Loading from './../components/Loading'
import {urlApi} from './../supports/constants/urlApi'
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap'


class SellerDetil extends Component{
    state = {
        dataPenjual: null,
        data: null
    }

    componentDidMount(){
        var id = window.location.pathname.split('/')[2]
        // console.log(window.location)
        this.getDataPenjual(id)
        this.getData(id)
    }

    getDataPenjual = (param) => {
        Axios.get(urlApi+'users/'+ param)
        .then((res)=>{
            console.log(res)
            this.setState({dataPenjual:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getData = (param) => {
        Axios.get(urlApi+'products?id_penjual='+param)
        .then((res)=>{
            console.log(res)
            this.setState({data:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    printDataProducts = () => {
        var output = this.state.data.map((val) =>{
            return(
                <div key={val.id} className="my-card col-sm-2 mr-3 mt-3">
                    <Link to={'/product-detail/'+ val.id}>
                    <img style={{height:'70%',objectFit:'cover', objectPosition:'top'}} src={val.img_url} width='100%' alt=""/>
                    </Link>
                    <div className='farmhub-product-title'>{val.name}</div>
                    <div className='farmhub-product-price'>Rp. {val.price}</div>
                    <div className='farmhub-product-location'>{this.state.dataPenjual.address}</div>
                </div>
            )
        })
        return output
    }


    render(){
        if(this.state.dataPenjual === null || this.state.data === null){
            return(
                <Loading/>
            )
        }

        if(this.state.data.length === 0){
            return(
                <h1>Data Masih Kosong</h1>
            )
        }

        var{fullname, address, phone_number, email} = this.state.dataPenjual

        return(
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-sm-3 mt-3">
                        <div className="my-card mt-3 p-3">
                            <img src='https://i.ya-webdesign.com/images/avatar-png-1.png' width='100%' alt=""/>
                            <div className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <h4 className='text-center'>
                                            SELLER INFO {this.props.dariLogin}
                                        </h4>
                                    </CardHeader>
                                    <CardBody>
                                        <div>Nama : {fullname}</div>
                                        <div>Alamat: {address}</div>
                                        <div>Contact : {phone_number}</div>
                                        <div>Email : {email}</div>   
                                    </CardBody>
                                    <CardFooter>
                                        <div>Total Barang : {this.state.data.length} produk</div>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9 mt-3">
                        <div className="row">
                            {this.printDataProducts()}
                        </div>
                    </div>
                </div>
            </div>
        

        )
    }
}

export default SellerDetil