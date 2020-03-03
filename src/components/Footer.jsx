import React from 'react'
import './../supports/css/Footer.css'



class FooterFarmHub extends React.Component{
    render(){
        return(
            <div className='my-footer container-fluid py-5'>
                <div className='row'>

                    <div className='col-md-3'>
                        <div className="farmhub-footer-title">
                            SITEMAP
                        </div>
                        <div className="farmhub-footer-items-wrapper">
                            <div className="farmhub-footer-item">
                                Product
                            </div>
                            <div className="farmhub-footer-item">
                                About
                            </div>
                            <div className="farmhub-footer-item">
                                Contact
                            </div>
                            <div className="farmhub-footer-item">
                                Career
                            </div>
                        </div>
                    </div>


                    <div className='col-md-6'>
                        <div className="farmhub-footer-title">
                            ADDRESS
                        </div>
                        <div className="farmhub-footer-items-wrapper">
                            <div className="farmhub-footer-item">
                                Jl. Gatot Subroto Nomor 25, Jakarta Selatan
                            </div>
                            <div className="farmhub-footer-item">
                                Jl. Trunojoyo Nomor 11, Bandung
                            </div>
                            <div className="farmhub-footer-item">
                                Jl. Jendral Sudirman Nomor 30, Surabaya
                            </div>
                            <div className="farmhub-footer-item">
                                Jl. Malioboro Nomor 40, Yogyakarta
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3'>
                         <div className="farmhub-footer-title">
                            OPERATIONAL HOURS
                        </div>
                        <div>
                            <div className="farmhub-footer-item">
                                Monday - Friday
                            </div>
                            <div className="farmhub-footer-item">
                                09.00 - 18.00
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default FooterFarmHub