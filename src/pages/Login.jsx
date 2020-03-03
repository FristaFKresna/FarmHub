//form login email pass button sign in || bawahnya ad button log in with gmail
import React from 'react'
import './../supports/css/Login.css'


class Login extends React.Component{
    render(){
        return(
            
                <div className="container-fluid my-5">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex flex-column text-center p-5 form-login">
                            
                            <div className='login-farmhub'>FARMHUB</div>
                            <div className='sign-in-login'>Sign In</div>

                            <div className='email-username-password'>Email / Username :</div>
                            <input type='text' placeholder='Input Email / Username' className='input-login' ></input>

                            <div className='email-username-password'>Password :</div>
                            <input type='text' placeholder='Password' className='input-login' ></input>
                            <br/>
                            <div className="btn btn-primary">Login</div>
                            <div className="btn-login"></div>
                            <div className="btn btn-danger new-account-google">Login With Google</div>
                            <div className="btn btn-primary new-account-google">Create New Account</div>
                            <div><a href='./'>Forget Password?</a></div>
                            


                        </div>
                    </div>
                </div>



            
        )
    }
}

export default Login