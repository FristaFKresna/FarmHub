import React from 'react'
import Axios from 'axios'

class LatihanFakeApi2 extends React.Component{

    state = {
        data : []
    }

    componentDidMount(){
        this.getDataFromApi()
    }

    getDataFromApi = () => {
        Axios.get('http://localhost:3002/dataMurid')
        .then((res) => {
            this.setState({data:res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onAddBtnClick = () => {
        var nama = this.refs.name.value 
        var tahun = this.refs.year.value
        var image = this.refs.image.value

        if(nama && tahun && image){
            var data = {
                name : nama,
                year : tahun,
                imageUrl : image
            }
    
            Axios.post('http://localhost:3002/dataMurid', data)
            .then((res) => {
                this.getDataFromApi()
                this.refs.name.value = ''
                this.refs.year.value = ''
                this.refs.image.value = ''
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert('Data Harus Diisi Semua')
        }
    }


    onDeleteBtnClick = (id) => {
        Axios.delete('http://localhost:3002/dataMurid/' + id)
        .then((res)=>{
            this.getDataFromApi()
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })


    }





    printData = () => {
        var output = this.state.data.map((val) => {
            return(
                <div className="col-md-4 mb-3">
                    
                        <div className="card text-center">
                            <img src={val.imageUrl} className='mb-4' width='100%' alt=""/>
                            <div className="row justify-content-between">
                                <div className="col-md-4 ml-3">
                                    <h4>Nama :</h4>
                                    <h4>Umur :</h4>
                                </div>

                                <div className="col-md-6 mr-3 align-self-end">
                                    <p>{val.name}</p>
                                    <p>{2020 - val.year}</p>
                                </div>
                            </div>
                        </div>
                        <div onClick={()=>this.onDeleteBtnClick(val.id)} className='btn btn-outline-danger my-4'>Delete</div>
                        
                </div>

            )
        })

        return output
    }




    render(){
        return(
            <div className="container-fluid">
                <div className='text-center mb-5'>
                    <h2>Latihan Fake Api 2</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <input type='text' ref='name' placeholder='input name' className='form-control mb-2'/>
                            <input type='text' ref='year' placeholder='input year' className='form-control mb-2'/>
                            <input type='text' ref='image' placeholder='input img-url' className='form-control mb-2'/>
                        </div>
                    </div>
                    <button className='btn btn-outline-primary' onClick={this.onAddBtnClick}>Add</button>
                </div>

                <div className="container">
                    <div className="row">
                        {/* <div className="col-md-4 mb-3">
                            <div className="card text-center">
                                <img src='https://image.flaticon.com/icons/png/512/175/175062.png' className='mb-4' width='100%' alt=""/>
                                <h3>NAMA</h3>
                                <h4>UMUR</h4>
                            </div>
                            <div className='btn btn-outline-danger my-4'>Delete</div>
                        </div>  */}
                        {this.printData()}                     
                    </div>
                </div>
            </div>

        )
    }
}

export default LatihanFakeApi2