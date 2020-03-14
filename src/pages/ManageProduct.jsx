import React, { Component } from 'react'
import Loading from './../components/Loading'
import Axios from 'axios'
import { urlApi } from '../supports/constants/urlApi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

class ManageProduct extends Component{
    state={
        data:null
    }

componentDidMount(){
    this.getDataProduct()
}
    
getDataProduct=()=>{
let id=localStorage.getItem('id')
Axios.get(urlApi+'products?id_penjual='+id)
.then((res)=>{
    console.log(res)
    this.setState({data:res.data})
})
.catch((err)=>{
    console.log(err)
})

}

onDeleteBtnClick=(id,name)=>{
    Swal.fire({
        title : "Delete Data",
        text : "Are You Sure Want to Delete " + name + ' ?',
        showCancelButton : true,
        icon : "warning",
        cancelButtonColor : 'red'
    })
    .then((val)=>{
        if(val.value){
            Axios.delete(urlApi+'products/'+id)
            .then((res)=>{
                console.log(res)
                Swal.fire('Delete Data Success')
                this.getDataProduct()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    })


}



printDataProduct=()=>{
    var Output=this.state.data.map((val,index)=>{
        return(
            <tr key={val.id}>
                <td>{index + 1}</td>
                <td>{val.name}</td>
                <td>Rp. {val.price}</td>
                <td>{val.stock}</td>
                <td>{val.deskripsi}</td>
                <td><img src={val.img_url} width='50px' alt=''/></td>
                <td>
                    <input type='button' className='btn btn-outline-danger' value='delete' onClick={()=>this.onDeleteBtnClick(val.id,val.name)}/>
                </td>
                <td>
                    <Link to={'/edit-data/'+ val.id}>
                        <input type='button' className='btn btn-outline-info' value='edit'/>   
                    </Link>
                </td>
            </tr>
        )
    })

return Output                       

}
//aktifkan tombol edit

    render(){
        if(this.state.data===null){
            return(
                <Loading/>
            )
        }

        return(
            <div className="container">
                <h4>Manage Your Product Here</h4>
                <div className="table-responsive">

                    <div className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Description</th>
                                <th>image Url</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.printDataProduct()}
                        </tbody>
                    </div>

                </div>
            </div>
        )
    }
}

export default ManageProduct