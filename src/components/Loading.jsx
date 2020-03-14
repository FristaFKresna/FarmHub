import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class Loading extends React.Component{
    state = {
        tooLong : false
    }

    componentDidMount(){
        this.handleTooLongLoading()
    }

    handleTooLongLoading = () => {
        this.timer = setTimeout(
            () => this.setState({tooLong:true}), 10000
        )
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    

    render(){
        return(
            <div className="row justify-content-center align-items-center" style={{height:'80vh'}}>
                {
                    this.state.tooLong ?
                    <h1>Network Error, try again</h1>
                    :

                    <Loader
                        type='MutatingDots'
                        color='#3085d6'
                        heigth={100}
                        width={100}
                    />
                    // <div>
                    // <h4>
                    //     loading...
                    // </h4>
                    // </div>

                }
                
            </div>
        )
    }
}

export default Loading;