import React, { Component } from 'react'
import { urlApi } from '../supports/constants/urlApi'
import Axios from 'axios'
import Loading from './../components/Loading'
import Swal from 'sweetalert2'


class EditData extends Component{

    state = {
        dataProduct : null
    }

    componentDidMount=()=>{
        var id = window.location.pathname.split('/')[2]
        this.getDataProduk(id)
        
    }

    getDataProduk = (param) => {
        Axios.get(urlApi+'products/'+param)
        .then((res)=>{
            console.log(res)
            this.setState({dataProduct:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    onSaveBtnClick = () => {
        var refs = ['name', 'price', 'stock', 'deskripsi', 'img_url']
        var data = {}

        for(var i = 0; i < refs.length; i++){
            if(this.refs[refs[i]].value){
                data[refs[i]]=this.refs[refs[i]].type === 'number' ? Number(this.refs[refs[i]].value) : this.refs[refs[i]].value
            
            }else{
                return(
                    alert('tidak boleh ada yang kosong')
                )
            }
    
        }

        // let name = this.refs.name.value
        // let price = this.refs.price.value
        // let stock = this.refs.stock.value
        // let deskripsi = this.refs.deskripsi.value
        // let img_url = this.refs.img_url.value

        // if(name && price && stock && deskripsi && img_url){

            // var data = {
            //     name : name,
            //     price  : price,
            //     stock : stock,
            //     deskripsi : deskripsi,
            //     img_url : img_url
            // }

            var id = window.location.pathname.split('/')[2]
            Axios.patch(urlApi+'products/'+id, data)
            .then((res)=>{
                console.log(res)    
                Swal.fire('Edit Berhasil')
                window.location = '/manage-product'   

            })
            
            .catch((err)=>{
                console.log(err)
            })
            
        // }else{
        //     alert('tidak boleh ada yang kosong')
        // }
        
        
    }

    

    render(){
        if(this.state.dataProduct === null){
            return <Loading/>
        }

        return(

            <div className="container-fluid my-5">
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column a1 text-center p-5 register-form">
                    <div className='register-farmhub'>EDIT DATA</div>
                    <input ref='name' type='text' defaultValue={this.state.dataProduct.name} className='input-register mt-5' ></input>
                    <input ref='price' type='number' defaultValue={this.state.dataProduct.price} className='input-register mt-3' ></input>
                    <input ref='stock' type='number' defaultValue={this.state.dataProduct.stock} className='input-register mt-3' ></input>
                    <input ref='deskripsi' type='text' defaultValue={this.state.dataProduct.deskripsi} className='input-register mt-3' ></input>
                    <input ref='img_url'type='text' defaultValue={this.state.dataProduct.img_url} className='input-register mt-3' ></input>
                    <div className="btn btn-primary mt-4" onClick={this.onSaveBtnClick}>Save</div>
                </div>
            </div>
        </div>



        )
    }
}

export default EditData