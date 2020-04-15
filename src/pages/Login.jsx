//form login email pass button sign in || bawahnya ad button log in with gmail
import React from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import './../supports/css/Login.css'
import { urlApi } from '../supports/constants/urlApi.js'
import {Link} from 'react-router-dom'


class Login extends React.Component{
    state={
        isComplete : null
    }

    onLoginBtnClick = () =>{
        let inputEmail = this.refs.email.value
        let inputPassword = this.refs.password.value

        if(inputEmail && inputPassword){
            Axios.get(`${urlApi}users?email=${inputEmail}&password=${inputPassword}`)
            .then((res)=>{
                if(res.data.length > 0){
                    //login success
                    var dataUser = res.data[0]
                    this.props.bebas(dataUser)
                    localStorage.setItem('id', res.data[0].id)
                    console.log(res.data)
                    if(res.data[0].role){
                        this.setState({isComplete : true})
                    }else{
                        this.setState({isComplete : false})
                    }
                }else{
                    Swal.fire('Error', 'Password or Email Invalid', 'error')
                }
            })
            .catch((err)=>{
                console.log(err)
            })

        }else{
            return Swal.fire('Error','All Form Must be Filled', 'error')
        }

    }




    render(){
        if(this.state.isComplete
             === false){
            return(
                <Redirect to ='/select-role'/>
            )
        }

        if(this.state.isComplete === true){
            return(
                <Redirect to ='/'/>
            )
        }


        return(
                <div className="container-fluid my-5">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex flex-column text-center p-5 form-login">
                            
                            <div className='login-farmhub'>FARMHUB</div>
                            <div className='sign-in-login'>Sign In</div>

                            <div className='email-username-password'>Email :</div>
                            <input ref='email' type='text' placeholder='Input Email' className='input-login' ></input>

                            <div className='email-username-password'>Password :</div>
                            <input ref='password' type='password' placeholder='Password' className='input-login' ></input>
                            <br/>
                            <div className="btn btn-primary" onClick={this.onLoginBtnClick}>Login</div>
                            <div className="btn-login"></div>
                            <Link to='*'><div className="btn btn-danger new-account-google" onClick={()=>{this.props.fnOnTesProps('hola')}}>Login With Google</div></Link>
                            <a href='/register'><div className="btn btn-primary new-account-google">Create New Account</div></a>
                            <div><a href='*'>Forget Password?</a></div>
                            


                        </div>
                    </div>
                </div>



            
        )
    }
}

export default Login