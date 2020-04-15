import React from "react"
import {Link} from 'react-router-dom'
import Loading from "../components/Loading"
import Axios from "axios"
import { urlApi } from "../supports/constants/urlApi"


class WishList extends React.Component{
    state={
        dataWishlist : null,
        dataProduct : null
    }

    componentDidMount=()=>{
        this.getDataWishList()
    }

    getDataWishList = () => {
        Axios.get(urlApi + 'wishlist?id_pembeli=' + localStorage.getItem('id'))
        .then((res)=>{
            this.setState({dataWishlist : res.data})

            var url = 'http://localhost:3001/products?'

            res.data.forEach((val)=>{
                url += 'id=' + val.id_product + '&'
            })

            url=url.slice(0,url.length - 1 )

            Axios.get(url)
            .then((res)=>{
                this.setState({dataProduct : res.data})
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    printDataWishlist = () =>{
        let data_gabungan = []
        this.state.dataProduct.forEach((val)=>{
            var new_obj = val
            new_obj.id_wishlist = this.state.dataWishlist.filter((wish)=> wish.id_product === val.id)[0].id
            
            data_gabungan.push(new_obj)
        })

        console.log(data_gabungan)
        return data_gabungan.map((val,index)=>{
            return(
                <div key={index} className="col-md-4 p-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="my-card">
                                <Link to={'/product-detail/'+ val.id}>
                                    <img style={{height:'100%',objectFit:'cover'}} src={val.img_url} width='100%' alt=""/>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 my-4">
                            <h3>{val.name}</h3>
                            <h5>Rp. {val.price}</h5>
                            <div className="btn btn-outline-success mb-3">Add to Cart</div>
                            <div className="btn btn-outline-danger mb-3" onClick={()=>this.onDeleteBtnClick(val.id_wishlist)}>Delete</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    onDeleteBtnClick = (id) => {
        if(window.confirm('Are You Sure Want to Delete?')){
        Axios.delete(urlApi+'wishlist/'+id)
        .then((res)=>{
            console.log(res)   
            this.getDataWishList()
            this.printDataWishlist()     /// MASIH NGE BUG
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    }

    render(){
        if(this.state.dataWishlist === null || this.state.dataProduct === null) return <Loading/>
        return(
            <div className="container-fluid my-4">
                <div className="row">
                    
                    {this.printDataWishlist()}

                </div>
            </div>
        )
    }
}

export default WishList