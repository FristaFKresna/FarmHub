import React from 'react'
import Loading from './../components/Loading'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import Swal from 'sweetalert2'

class ChangeProfile extends React.Component {
    state={
        data: null
    }

    componentDidMount=()=>{
        var id = localStorage.getItem('id')
        this.getDataUser(id)
    }

    getDataUser = (id) => {
        Axios.get(urlApi+'users/'+id)
        .then((res)=>{
            console.log(res)
            this.setState({data:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onUpdateBtnClick=()=>{
        var refs = ['fullname', 'phone_number', 'address']
        var updateData = {}
        for(var i = 0; i<refs.length; i++){
            if(this.refs[refs[i]].value){
                updateData[refs[i]] = this.refs[refs[i]].value
            }else{
               return Swal.fire('Tidak Boleh Ada Yang Kosong')
            }
        }
        var id=localStorage.getItem('id')

        Axios.patch(urlApi+'users/'+ id, updateData)
        .then((res)=>{
            console.log(res)
            return Swal.fire({
                icon:'success',
                title:'Update Profile Success',
                showConfirmButton:false,
                timer:'2000'
            })
            .then((res)=>{
                window.location='/'
            })

        })
        .catch((err)=>{
            console.log(err)
        })

       
    }

    render(){
        if(this.state.data === null){
            return <Loading/>
        }
        return(
            <div className="row justify-content-center">
                <div className="col-md-4 my-card p-5 mt-5">
                    <h5>Change Your Profile</h5>
                    <input ref='fullname' className='form-control mt-3' defaultValue={this.state.data.fullname} type='text'/>
                    <input maxLength={13} ref='phone_number' className='form-control mt-3' defaultValue={this.state.data.phone_number} type='text'/>
                    <input ref='address' className='form-control mt-3' defaultValue={this.state.data.address} type='text'/>
                    <button onClick={this.onUpdateBtnClick} className='btn btn-outline-primary mt-3'>Save</button>
                </div>
            </div>
        )
    } 
}

export default ChangeProfile