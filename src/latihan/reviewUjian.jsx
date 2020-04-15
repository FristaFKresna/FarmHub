// json cart yang bagus

import Axios from "axios"

// onBtnAddToCart = () => {}
// {
// id : 
// id_pembeli:
// id_product:
// qty:
// }


// lebih fleksibel kalo nama price stock
state={
    dataCart : null,
    dataProduct : null,
    dataGabungan : null
}

componentDidMount () {
    this.getDataCart()
}

getDataCart = () => {                                                                               ///ngambil data cart sama data produk
    Axios.get(urlApi +'cart?id_pembeli=' + localStorage.getItem('id'))
    .then((res)=>{
        this.setState({dataCart : res.data})
        var url = 'http://localhost:3001/products?'

        res.data.forEach((val)=>{                           ///kodingan buat jadiin http://localhost:3001/products?id=1&id=2&id=3
            url += 'id=' + val.id_product + '&'
        })
        
        url = url.slice(0,url.length-1)
        Axios.get(url)
        .then((res)=>{
            this.setState({dataProduct : res.data})
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

        
    })

    .catch((err)=>{
        console.log(err)
    })


}

// JSONNYA
// transaction : [
//     {
//         id:
//         date:
//         total:
//         id_pembeli:
//         items:[
//             {
//                 name:
//                 price:
//                 qty:
//             },
//             {
//                 name:
//                 price:
//                 qty:
//             },
//         ]

//     }
// ]


checkout = ()=>{
if(window.confirm('Are You Sure Want To Chekout')){
//post data ke transaction
//update stock
//delete data di cart

var data = {
    date : new Date(),
    total:,
    id_pembeli : localStorage.getItem('id'),
    items:[
        {

        }
    ]
}


}
}


renderDataCart = () => {
    console.log('renderDataCart')
    console.log(this.state.dataProduct)
    console.log(this.state.dataCart)

    let data_gabungan = []
    this.state.dataProduct.forEach((val) => {
        var new_obj = val
        new_obj.qty =this.state.dataCart.filter((cart) => cart.id_product === val.id)[0].qty
        new_obj.id_cart =this.state.dataCart.filter((cart) => cart.id_product === val.id)[0].id

        data_gabungan.push(new_obj)
    })

    this.setState({dataGabungan : data_gabungan})

    console.log(data_gabungan)

    return data_gabungan.map((val,index) => {
        return(
            <tr key={val.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{val.product_name}</td>
                    <td><img src={val.image} width='50px' alt=''/></td>
                    <td>{val.price}</td>
                    <td>
                        <button onClick={()=>{this.onBtnMinClick(val)}}>-</button>
                        <span className='mx-3'>{val.qty}</span>
                        <button onClick={()=>{this.onBtnPlusClick(val)}}>+</button>
                    </td>
                    <td>{val.qty*val.price}</td>
                    <td>
                        <input type='button' className='btn btn-outline-danger' value='delete' onClick={()=>{this.onDeleteBtnClick(val)}}/>
                    </td>
                </tr>
        )
    })

}

render(){
    if(this.state.dataCart === null||this.state.dataProduct === null){
        return <Loading/>
    } 

    return(
        <div className="container">
            <div className="table-responsive">
                <div className="table">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderDataCart()}
                    </tbody>
                </div>
            </div>
        </div>
    )

}







//BIKIN BUTTON ADD TO CART DI PRODUCT DETAIL

onBtnAddToCart = () => {
    var dataCart = {
        id_pembeli : Number(localStrorage.getItem('id')),
        id_product : Number(window.location.pathname.split('/')[2]),
        qty : this.state.num
    }

    Axios.get(urlApi+'cart?id_products='+dataCart.id_product)               ///masi ada bug harus dibawah stok
    .then((res)=>{
        console.log(res)
        if(res.data.length > 0){

            //udah ada jadi update qty
            console.log(res.data)
            let qty_lama = res.data[0].qty
            let qty_baru = qty_lama + dataCart.qty

            Axios.patch(urlApi + 'cart/'+ res.data[0].id, {qty:qty_baru})
            .then((res)=>{
                alert('update cart success')
            })
            .catch((err)=>{
                console.log(err)
            })


        }else{

            //belum ada
            Axios.post(urlApi + 'cart', dataCart)
            .then((res)=>{
                console.log(res)
                alert('success')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    })
    .catch((err)=>{
        console.log(err)
    })

}