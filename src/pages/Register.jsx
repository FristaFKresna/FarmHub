//Register email password confirm password
import React from 'react'
import Validator from 'validator'
import Axios from 'axios'
import Swal from 'sweetalert2'
import './../supports/css/Register.css'
import { urlApi } from '../supports/constants/urlApi.js'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Register extends React.Component{

    state = {
        error : ''
    }

    registerClick = () => {
        var inputEmail = this.refs.email.value
        var inputPassword = this.refs.password.value
        var inputConfirm = this.refs.confirm.value

        if(inputEmail && inputPassword && inputConfirm){
            if(!Validator.isEmail(inputEmail)){
                return this.setState({error : "Email Format incorrect"})
            }

            if(inputPassword !== inputConfirm){
                return this.setState({error:"Password didn't match"})
            }
            // check email terdaftar atau belum
            Axios.get(urlApi+'users?email='+inputEmail)
            .then((res)=>{
                if(res.data.length > 0){
                    return this.setState({error:'Email Sudah Terdaftar'})
                }
                var data = {
                    email : inputEmail,
                    password : inputPassword,
                    role : '',
                    fullname : '',
                    address : '',
                    phone_number : ''
                }

                Axios.post(urlApi+'users', data)
                .then((res) => {
                    console.log(res)
                    Swal.fire('Register', 'Register Success, Please Login !!', 'success')
                        this.refs.email.value = ""
                        this.refs.password.value = ""
                        this.refs.confirm.value = ""
                        window.location='./login'
                })
                .catch((err) => {
                    console.log(err)
                })
            
            })
            .catch((err) => {
                console.log(err)
            })


        }else{
            this.setState({error:'Form Must be filled'})
            // setTimeout(
            //     () => this.setState({error : ''}),
            //     2000
            // )
        }

        

    }

    closeBtnError = () => {
        this.setState({error:""})
    }

    
    
    renderError = () => {
        if(this.state.error){
            return(
                <div className='alert alert-danger mt-3 row justify-content-between'>
                    <span>
                        {this.state.error}
                    </span>
                    <span onClick={this.closeBtnError} style={{cursor:'pointer'}}>X</span>
                </div>
            )
        }
    }



    render(){
        console.log(this.props.bebas)
        return(
            <div className="container-fluid my-5">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column a1 text-center p-5 register-form">
                        <div className='register-farmhub'>REGISTER</div>
                        <div className='sign-in-register'>Please fill in this form to create an account.</div>

                        <div className='email-username-password'>Email :</div>
                        <input type='text' placeholder='Enter Email' ref='email' className='input-register' ></input>

                        <div className='email-username-password'>Password :</div>
                        <input type='password' placeholder='Enter Password' ref='password' className='input-register' ></input>

                        <div className='email-username-password'>Confirm Password :</div>
                        <input type='password' placeholder='Confirm Password' ref='confirm' className='input-register' ></input>
                        
                        {this.renderError()}
                        <hr/>

                        <div className='terms-privacy'>By creating an account you agree to our <Link to="*">Terms & Privacy.</Link></div>

                        <div className="btn btn-primary btn-register" onClick={this.registerClick}>Register</div>
                        <div className="btn-login"></div>
                        <Link to = '*'><div className="btn btn-danger google-register" onClick={ () => this.props.fnKirimData('bebas')}>Register With Google Mail</div></Link>
                        
                        <div>Already have an account?<Link to ='/login'>Sign in</Link></div>

                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        bebas: state.counter,
        user: state.name
    }
    
}

export default connect(mapStateToProps)(Register)