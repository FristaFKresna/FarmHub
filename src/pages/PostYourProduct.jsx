import React from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import Swal from 'sweetalert2'

export default class PostYourProduct extends React.Component{

    onAddProductBtnClick = () =>{
        var name = this.refs.namaProduk.value
        var price = this.refs.harga.value
        var stock = this.refs.stok.value
        var image = this.refs.img.value
        var descrip = this.refs.deskripsi.value

        var data = {
            name : name,
            price : price,
            stock : stock,
            img_url : image,
            deskripsi : descrip,
            id_penjual : Number(localStorage.getItem('id'))
        }

        if(name&&price&&stock&&image&&descrip){
            Axios.post(urlApi+'products', data)
            .then((res)=>{
                console.log(res)
                Swal.fire('Update Berhasil')
                window.location = './'
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            alert('Data Harus Diisi Semua')
        }

//==============================================================COBA CARA LOOPING===================================================================
        // var refs = ['name','price','stock','img_url','deskripsi']
        // var data = {id_penjual : localStorage.getItem('id')}

        // for(var i =0 ; i< refs.length ; i++){
        //     if(this.refs[refs[i]].value){
        //         data[refs[i]] = this.refs[refs[i]].type ==='number' ? Number(this.refs[refs[i]].value) : this.refs[refs[i]].value
        //     }else{
        //         return Swal.fire('Error')
        //     }
        
        // }
        // Axios.post( urlApi +'products', data)
        // .then((res) => {
        // console.log(res)
        // Swal.fire('Post','Post Succes','success')
        // window.location = '/'

        // })

        // .catch((err) => {
        // console.log(err)
        
        // })

    }

    render(){
        return(
            <div className = 'row justify-content-center align-item-center'>
                <div className="col-md-5 card p-5 mt-5 form-group">
                    <h2>Post Your Product</h2>
                    <div className='mt-3'>Nama Produk :</div>
                    <input ref='namaProduk' type='text' placeholder='name your product' />
                    <div className='mt-3'>Harga : </div>
                    <input ref='harga' type='number' placeholder='price' />
                    <div className='mt-3'>Stock :</div>
                    <input ref='stok' type='number' placeholder='stock' />
                    <div className='mt-3'>Image : </div>
                    <input ref='img' type='text' placeholder='input image_url' />
                    <div className='mt-3'>Deskripsi : </div>
                    <input ref='deskripsi' style={{height:'50px'}} type='text' placeholder='description' />
                    
                    <span className='mt-5'>
                        <button onClick={this.onAddProductBtnClick} className="btn btn-outline-primary">Submit</button>
                    </span>
                </div>
            </div>
        )
    }
}