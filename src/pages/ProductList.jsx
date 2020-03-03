import React from 'react'
import './../supports/css/ProductList.css'
import { FormGroup, Label, Input } from 'reactstrap'

class ProductList extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 mt-3">
                        <div className="my-card p-3">
                            <div className="farmhub-product-title">
                                Filter By Category
                            </div>
                            <div className="farmhub-product-location">
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                        Buah-Buahan
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                        Sayuran
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                        Rempah-Rempah
                                    </Label>
                                </FormGroup>

                            </div>
                        </div>
                    </div>

                    <div className="col-sm-10">
                        <div className="row">
                            <div className="my-card col-sm-2 mr-3 mt-3">
                                <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/7/4503850/4503850_cce2c93e-03a7-41c1-a3ed-75a02be6431f_480_480.jpg" width='100%' alt=""/>
                                <div className='farmhub-product-title'>Apel Fuji</div>
                                <div className='farmhub-product-price'>Rp. 30.000</div>
                                <div className='farmhub-product-location'>Jakarta Selatan</div>
                            </div>
                            
                            <div className="my-card col-sm-2 mr-3 mt-3">
                                <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/7/4503850/4503850_cce2c93e-03a7-41c1-a3ed-75a02be6431f_480_480.jpg" width='100%' alt=""/>
                                <div className='farmhub-product-title'>Apel Fuji</div>
                                <div className='farmhub-product-price'>Rp. 30.000</div>
                                <div className='farmhub-product-location'>Jakarta Selatan</div>
                            </div>

                            <div className="my-card col-sm-2 mr-3 mt-3">
                                <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/7/4503850/4503850_cce2c93e-03a7-41c1-a3ed-75a02be6431f_480_480.jpg" width='100%' alt=""/>
                                <div className='farmhub-product-title'>Apel Fuji</div>
                                <div className='farmhub-product-price'>Rp. 30.000</div>
                                <div className='farmhub-product-location'>Jakarta Selatan</div>
                            </div>

                            <div className="my-card col-sm-2 mr-3 mt-3">
                                <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/7/4503850/4503850_cce2c93e-03a7-41c1-a3ed-75a02be6431f_480_480.jpg" width='100%' alt=""/>
                                <div className='farmhub-product-title'>Apel Fuji</div>
                                <div className='farmhub-product-price'>Rp. 30.000</div>
                                <div className='farmhub-product-location'>Jakarta Selatan</div>
                            </div>

                            <div className="my-card col-sm-2 mr-3 mt-3">
                                <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/7/4503850/4503850_cce2c93e-03a7-41c1-a3ed-75a02be6431f_480_480.jpg" width='100%' alt=""/>
                                <div className='farmhub-product-title'>Apel Fuji</div>
                                <div className='farmhub-product-price'>Rp. 30.000</div>
                                <div className='farmhub-product-location'>Jakarta Selatan</div>
                            </div>

                            <div className="my-card col-sm-2 mr-3 mt-3">
                                <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/7/4503850/4503850_cce2c93e-03a7-41c1-a3ed-75a02be6431f_480_480.jpg" width='100%' alt=""/>
                                <div className='farmhub-product-title'>Apel Fuji</div>
                                <div className='farmhub-product-price'>Rp. 30.000</div>
                                <div className='farmhub-product-location'>Jakarta Selatan</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductList