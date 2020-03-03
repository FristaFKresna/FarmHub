//Register email password confirm password
import React from 'react'
import './../supports/css/Register.css'

class Register extends React.Component{
    render(){
        return(
            <div className="container-fluid my-5">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column a1 text-center p-5 register-form">
                        <div className='register-farmhub'>REGISTER</div>
                        <div className='sign-in-register'>Please fill in this form to create an account.</div>

                        <div className='email-username-password'>Email :</div>
                        <input type='text' placeholder='Enter Email' className='input-register' ></input>

                        <div className='email-username-password'>Password :</div>
                        <input type='text' placeholder='Enter Password' className='input-register' ></input>

                        <div className='email-username-password'>Repeat Password :</div>
                        <input type='text' placeholder='Repeat Password' className='input-register' ></input>

                        <hr/>

                        <div className='terms-privacy'>By creating an account you agree to our <a href="./">Terms & Privacy</a>.</div>

                        <div className="btn btn-primary btn-register">Register</div>
                        <div className="btn-login"></div>
                        <div className="btn btn-danger google-register">Register With Google Mail</div>
                        
                        <div>Already have an account? <a href='./'>Sign in</a></div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register