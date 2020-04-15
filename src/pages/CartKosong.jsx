import React from 'react'
import {Link} from 'react-router-dom'

class PageCartKosong extends React.Component {
    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h1 className='text-center'>
                            Keranjang Masih Kosong
                        </h1>
                    </div>
                    <div className="col-2">
                        <Link to = '/'>
                            <div className="btn btn-outline-info mt-3">Belanja Dulu</div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageCartKosong