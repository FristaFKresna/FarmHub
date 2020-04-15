import React from 'react'
import {connect} from 'react-redux'
import {increment, decrement, actionWithPayload} from './../redux/actions/counter'

class CounterWithRedux extends React.Component{
    render(){
        console.log(this.props.bebas)
        console.log(this.props.user)
        return(
            <div>
                <h2>Counter</h2>
                    <input onClick={this.props.actionWithPayload} type='button' value='click me'/>
                    <span>{this.props.bebas.name}</span>
                <center>
                    <input onClick={this.props.onClickMin} type='button' value='-'/>
                    <span>{this.props.bebas.angka}</span>
                    <input onClick={this.props.onClickPlus} type='button' value='+'/>
                </center>
            </div>


        )
    }
}

const mapStateToProps = (state) => {       //masukin data dari global state
    return{
        bebas: state.counter,
        user: state.name
    }
    
}

const mapDispatchToProps={                  //untuk update data di global state
    onClickPlus : increment,
    onClickMin : decrement,
    actionWithPayload
}

export default connect(mapStateToProps,mapDispatchToProps)(CounterWithRedux);   //connect untuk menyambungkan global state