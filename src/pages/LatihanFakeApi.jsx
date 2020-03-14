import React from 'react'
import Axios from 'axios'

class LatihanFakeApi extends React.Component{

    state = {
        data : [],
        showEditForm : false,
        indexSelectedToEdit : null
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

    onEditBtnClick = (bebas) => {
        this.setState({showEditForm : true, indexSelectedToEdit : bebas})
    }

    onSaveBtnClick = (id) => {
        var inputTodoEdit = this.refs.todoEdit.value ? this.refs.todoEdit.value : this.state.data[this.state.indexSelectedToEdit].todo
        var inputUserEdit = this.refs.userEdit.value ? this.refs.userEdit.value : this.state.data[this.state.indexSelectedToEdit].user

        var data = {
            todo:inputTodoEdit,
            user:inputUserEdit
        }

        Axios.patch('http://localhost:3001/todos/' + id , data)
        .then((res) =>{
            console.log(res)
            this.getDataFromApi()
            this.setState({showEditForm : false})
        })
        .catch((err) => {
            console.log(err)
        })
    }


    onCancelBtnClick = () => {
        this.setState({showEditForm : false})
    }

    renderEditForm = () => {
        if(this.state.showEditForm){
            return(
                <span>
                    <input type="text" ref='todoEdit' placeholder={this.state.data[this.state.indexSelectedToEdit].todo} className='form-control mb-2'/>
                    <input type="text" ref='userEdit'placeholder={this.state.data[this.state.indexSelectedToEdit].user} className='form-control mb-2'/>
                    <button className='mb-2 btn btn-outline-success mr-2'onClick={()=> this.onSaveBtnClick(this.state.data[this.state.indexSelectedToEdit].id)}>Save</button>
                    <button className='mb-2 btn btn-outline-danger' onClick={this.onCancelBtnClick}>Cancel</button>
                </span>
            )
        }
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
         
        var output = this.state.data.map((val,index) => {
            return(
                <li key={val.id} className="list-group-item">
                    {val.todo + " - " +  val.user }
                    <span onClick={() => this.onDeleteBtnClick(val.id)} className='btn btn-outline-danger ml-3'>Delete</span>
                    <span className='btn btn-outline-info ml-3' onClick={() => this.onEditBtnClick(index)}>Edit</span>
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

                        <hr/>
                        {this.renderEditForm()}

                    </div>
                </div>
            </div>

        )
    }
}

export default LatihanFakeApi