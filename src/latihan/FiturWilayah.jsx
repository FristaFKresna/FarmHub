import React from 'react'
import {FormGroup, Label, CustomInput} from 'reactstrap'
import Axios from 'axios'

//triggernya pake onchange

export default class FiturWilayah extends React.Component{
    state = {
        provinsi:[],
        kota:[],
        kecamatan:[]
    }

    componentDidMount=()=>{
        this.getDataWilayah() 
    }

    getDataWilayah=()=>{
        Axios.get('https://x.rajaapi.com/poe')
        .then((res) => {
            console.log(res.data.token)
            let url = 'https://x.rajaapi.com/MeP7c5ne'+ res.data.token + '/m/wilayah/provinsi'
            Axios.get(url)
            .then((res)=>{
                console.log(res)
                this.setState({provinsi : res.data.data})
                console.log(this.state.provinsi)
            })
            .catch((err)=>{
                console.log(err)
            })

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderListProvinsi=()=>{
        var output=this.state.provinsi.map((val)=>{
            return(
                <option value={val.id} key={val.id}>{val.name}</option>
            )
        })
        return output
    } 

    handleChangeProvinsi = (event) => {
        var id = event.target.value
        this.getDataKotaKab(id)
    }


    getDataKotaKab=(id)=>{
        if(id !== ''){
            Axios.get('https://x.rajaapi.com/poe')
            .then((res) => {
                console.log(res.data.token)
                let url = 'https://x.rajaapi.com/MeP7c5ne'+ res.data.token + '/m/wilayah/kabupaten?idpropinsi='+ id
                Axios.get(url)
                .then((res)=>{
                    console.log(res)
                    this.setState({kota : res.data.data})
                    console.log(this.state.kota)
                })
                .catch((err)=>{
                    console.log(err)
                })

            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            this.setState({kota:[]})
        }
        
    }

    renderListKotaKab=()=>{
        var output=this.state.kota.map((val)=>{
            return(
                    <option value={val.id} key={val.id}>{val.name}</option>
                )
        })
        return output
    } 

    handleChangeKotaKab = (event) => {
        var id = event.target.value
        this.getDataKecamatan(id)
    }

    getDataKecamatan=(id)=>{
        if(id !== ''){
            Axios.get('https://x.rajaapi.com/poe')
            .then((res) => {
                console.log(res.data.token)
                let url = 'https://x.rajaapi.com/MeP7c5ne'+ res.data.token + '/m/wilayah/kecamatan?idkabupaten='+ id
                Axios.get(url)
                .then((res)=>{
                    console.log(res)
                    this.setState({kecamatan : res.data.data})
                    console.log(this.state.kecamatan)
                })
                .catch((err)=>{
                    console.log(err)
                })

            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            this.setState({kecamatan:[]})
        }
    }

    renderListKec=()=>{
        var output=this.state.kecamatan.map((val)=>{
            return(
                    <option value={val.id} key={val.id}>{val.name}</option>
                )
        })
        return output
    } 


    render(){
        return(

            <div className="container my-4">
                <div className="row justify-content-center">
                    <h3>Fitur Wilayah</h3>
                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-3 my-2">
                        <FormGroup >
                            <Label for="exampleCustomSelect">Pilih Provinsi</Label>
                            <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={this.handleChangeProvinsi}>
                            <option value=''>Pilih Provinsi</option>
                            {this.renderListProvinsi()}
                            </CustomInput>
                        </FormGroup>
                    </div>

                    <div className="col-sm-3 my-2">
                        <FormGroup>
                            <Label for="exampleCustomSelect">Plih Kota / Kabupaten</Label>
                            <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={this.handleChangeKotaKab}>
                            <option value="">Pilih Kota/Kabupaten</option>
                            {this.renderListKotaKab()}
                            </CustomInput>
                        </FormGroup>
                    </div>

                    <div className="col-sm-3 my-2">
                        <FormGroup>
                            <Label for="exampleCustomSelect">Pilih Kecamatan</Label>
                            <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                            <option value="">Pilih Kecamatan</option>
                            {this.renderListKec()}
                            </CustomInput>
                        </FormGroup>
                    </div>
                    


                </div>
            </div>   
        )
    }
}