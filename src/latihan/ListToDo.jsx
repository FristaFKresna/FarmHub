import React from 'react'
import {connect} from 'react-redux'
import {actionWithPayload} from './../redux/actions/listToDo'


class ListToDo extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row text-center my-4 justify-content-center">
                    <h3>List To Do</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-5">
                        <input type='text' ref='newList' placeholder='List To Do' className='form-control'/>
                    </div>
                </div>

                <div className="row justify-content-center my-3">
                    <input onClick={this.props.actionWithPayload} type='button' value='Submit' className='btn btn-outline-primary'/>
                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-8">
                        <ul className="list-group my-3">
                            <li className="list-group-item">{this.props.list.list}</li>
                            <li className="list-group-item">{this.props.list.list2}</li>
                            <li className="list-group-item">{this.props.list.list3}</li>
                        </ul>
                    </div>
                </div>

            </div>
            
        )
    }
}

const mapStateToProps = (state) => {       
    return{
        list : state.list,
        list2 : state.list2,
        list3 : state.list3
    }
    
}

const mapDispatchToProps={
    actionWithPayload
}

export default connect(mapStateToProps,mapDispatchToProps)(ListToDo)