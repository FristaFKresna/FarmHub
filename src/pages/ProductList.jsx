import React from 'react'
import './../supports/css/ProductList.css'
import { FormGroup, Label, Input } from 'reactstrap'
import { urlApi } from '../supports/constants/urlApi'
import Axios from 'axios'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'

class ProductList extends React.Component{
    state = {
        data : null,
        dataPenjual : null,
        search : ''
    }

    
    componentDidMount(){
        // setTimeout(this.getDataProducts,3000)
        this.getDataProducts()
        this.getDataPenjual()
    }
    
    getDataPenjual = () => {
        Axios.get(urlApi + 'users?role=penjual')
        .then((res)=>{
            console.log(res)
            this.setState({dataPenjual:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    getDataProducts = () => {
        Axios.get(urlApi+'products')
        .then((res)=>{
            console.log(res)
            this.setState({data:res.data})
        })
        .catch((err)=>{

            console.log(err)
        })
    }

    getDataAddress = (product) => {
        var penjual = this.state.dataPenjual.filter((user)=>{
            return user.id === product.id_penjual
        })
        return penjual[0].address
    }

    printDataProducts = () => {
        var dataFiltered = this.state.data.filter((prod)=>{
            return prod.name.toLowerCase().startsWith(this.state.search)
        })

        if(dataFiltered.length === 0){
            return <h1>Data Not Found</h1>
        }


        var output = dataFiltered.map((val)=>{
            return(
                <div key={val.id} className="my-card col-sm-2 mr-3 mt-3">
                    <Link to={'./product-detail/'+ val.id}>
                        <img style={{height:'70%',objectFit:'cover', objectPosition:'top'}} src={val.img_url} width='100%' alt=""/>
                    </Link>
                        <div className='farmhub-product-title'>{val.name}</div>
                        <div className='farmhub-product-price'>Rp. {val.price}</div>
                        <div className='farmhub-product-location'>{this.getDataAddress(val)}</div>
                </div>
            )
        })

        return output
    }
    
    fnRenderAlert=()=>{

        if(this.props.dataUser !== null){

            if(this.props.dataUser.role === ''){
                return(
                    <div className="container-fluid">
                        <div class="alert alert-danger mt-3 text-center" role="alert">
                            Complete your profile <Link to='/select-role'>here</Link> 
                        </div>
                    </div>
                )
            }
    
            if(this.props.dataUser.fullname === '' || this.props.dataUser.address === '' || this.props.dataUser.phone_number === ''){
                return(
                    <div className="container-fluid">
                        <div class="alert alert-danger mt-3 text-center" role="alert">
                            Complete your profile <Link to='/complete-your-profile'>here</Link> 
                        </div>
                    </div>
                )
            }

        }

    }

    onSearchChange=()=>{
        this.setState({search:this.refs.search.value})
    }




    render(){
        if(this.state.data === null || this.state.dataPenjual === null){
            return(
                <Loading/>
            )
        }

        if(this.state.data.length === 0){
            return(
                <h1>Data Masih Kosong/Bikin Page Sendiri</h1>
            )
        }

        return(
            //Muncul alert Complete your profile here
            <div className="container-fluid">

                {this.fnRenderAlert()}

                <div className="row">

                    <div className="col-sm-2 mt-3">
                        
                        <div className="my-card p-3 mb-3">
                            <input type='text' className="form-control" placeholder='search' ref='search' onChange={this.onSearchChange}/>
                        </div>

                        <div className="my-card p-3">
                            <div className="farmhub-product-title">
                                Filter By Category {this.props.dariRegister}
                            </div>
                            <div className="farmhub-product-location">
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                        Buah-Buahan
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                        Sayuran
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                        Rempah-Rempah
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                        Produk Ternak
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>

                        <div className='my-card p-3 mt-3'>
                            <div className="farmhub-product-title">
                                Filter By Location
                            </div>
                            <div className='farmhub-product-location'>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Jabodetabek
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Kota Bandung
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Jawa Barat
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Surabaya
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Jawa Timur
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Semarang
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>

                    </div>

                    <div className="col-sm-10">
                        <div className="row">
                            {this.printDataProducts()} 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductList