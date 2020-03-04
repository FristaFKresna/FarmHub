import React from 'react'
import Axios from 'axios'

class LatihanFakeApi extends React.Component{

    state = {
        data : []
    }

    componentDidMount(){
        this.getDataFromApi()
    }

    getDataFromApi = () => {
        Axios.get('http://localhost:3001/todos')
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onAddBtnClick = () => {
        var inputTodo = this.refs.todo.value 
        var inputUser = this.refs.user.value

        if(inputTodo && inputUser){
            var data = {
                user : inputUser,
                todo : inputTodo
            }
    
            Axios.post('http://localhost:3001/todos', data)
            .then((res) => {
                this.getDataFromApi()
                this.refs.user.value=''
                this.refs.todo.value=''
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

        }else{
            alert('data harus isi semua')
        }

    }
    
    onDeleteBtnClick = (id) =>{
        Axios.delete('http://localhost:3001/todos/' + id)
        .then((res) => {
            this.getDataFromApi()
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    printData = () => {
        // var output = []
        // for(var i = 0; i < this.state.data.length; i++){
        //     output.push(
        //         <li className="list-group-item">
        //             {this.state.data[i].todo + " " + '(' + this.state.data[i].user + ')'}
        //             <span className='btn btn-outline-danger ml-3'>Delete</span>
        //             <span className='btn btn-outline-info ml-3'>Edit</span>
        //         </li>
        //     )
        // }
         
        var output = this.state.data.map((val) => {
            return(
                <li className="list-group-item">
                    {val.todo + " " + '(' + val.user + ')'}
                    <span onClick={() => this.onDeleteBtnClick(val.id)} className='btn btn-outline-danger ml-3'>Delete</span>
                    <span className='btn btn-outline-info ml-3'>Edit</span>
                </li>

            )
        })

        return output
    }


    render(){
        return(
            <div className="text-center">
                <h1>Latihan Fake API</h1>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <ul className="list-group mb-3">
                            {this.printData()}
                            {/* <li className="list-group-item">
                                Makan (fikri) 
                                <span className='btn btn-outline-danger ml-3'>Delete</span>
                                <span className='btn btn-outline-info ml-3'>Edit</span>
                            </li> */}
                        </ul>
                        <input type="text" ref='todo' placeholder='what will you do?' className='form-control mb-2'/>
                        <input type="text" ref='user'placeholder='your name?' className='form-control mb-2'/>
                        <button className='mb-2 btn btn-outline-primary' onClick={this.onAddBtnClick}>Add</button>  
                    </div>
                </div>
            </div>

        )
    }
}

export default LatihanFakeApi