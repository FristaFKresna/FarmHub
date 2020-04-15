import React, {Component} from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import Swal from 'sweetalert2'

class CompleteYourProfile extends Component{


    onUpdateBtnClick = () => {
        let name = this.refs.name.value
        let phoneNumber = this.refs.phoneNumber.value
        let address = this.refs.address.value

        if(name && phoneNumber && address){
            let id = localStorage.getItem('id')

            var data = {
                fullname : name,
                phone_number : phoneNumber,
                address : address
            }

            Axios.patch(urlApi + 'users/' + id, data)
            .then((res)=>{
                Swal.fire({
                    icon:'success',
                    title:'Update Profile Success',
                    showConfirmButton: false,
                    timer:2000,
                })
                .then((res)=>{
                    window.location='./'
                })
                console.log(res)
                
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            Swal.fire({
                icon:'info',
                title: 'Data Harus Diisi Semua'
            })

        }

//=======================================================CARA KE DUA PAKE LOOPING================================================================
        // var refs = ['fullname','phone_number','address']
        // var data ={}
        // // var lanjut = true
        // for(var i= 0 ; i<refs.length ; i++){
        //     if(this.refs[refs[i]].value){
        //         data[refs[i]] = this.refs[refs[i]].value
        //     }else{
        //         return Swal.fire('Error')
        //     }
        // }
        // var id = this.props.dataUser.id
        // Axios.patch(urlApi + 'users/' + id, data)
        // .then((res) => {
        //     window.location = '/'
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }

    
        

    

    render(){
        return(
            <div className="row justify-content-center">
                <div className="col-md-4 my-card p-5 mt-5">
                    <h5>Complete Your Profile</h5>
                    <input ref='name' className='form-control mt-3' placeholder='your Full Name' type='text'/>
                    <input maxLength={13} ref='phoneNumber' className='form-control mt-3' placeholder='your Phone Number' type='text'/>
                    <input ref='address' className='form-control mt-3' placeholder='your Address' type='text'/>
                    <button onClick={this.onUpdateBtnClick} className='btn btn-outline-primary mt-3'>Save</button>
                </div>
            </div>
        )
    }
}

export default CompleteYourProfile