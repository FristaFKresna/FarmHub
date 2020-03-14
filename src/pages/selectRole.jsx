import React, {Component} from 'react';
import { urlApi } from '../supports/constants/urlApi';
import Axios from 'axios'



class SelectRole extends Component {

    onBtnClick = (role) => {
        let id = localStorage.getItem('id')
        Axios.patch(urlApi + 'users/' + id, {role:role})
        .then((res)=>{
            alert('Anda sekarang menjadi ' + role)
            window.location = './complete-your-profile'

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div className="row justify-content-center">
                <div className="col-md-3 card p-5 text-center mt-5">
                    <h5>Choose Your Role</h5>
                    <button onClick={()=>this.onBtnClick('penjual')} className='btn btn-outline-primary w-100 mt-2'>I'm a Seller</button>
                    <button onClick={()=>this.onBtnClick('pembeli')} className='btn btn-outline-success w-100 mt-4'>I'm a Buyer</button>
                </div>
            </div>

        )
    }
}

export default SelectRole