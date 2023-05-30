import React from 'react';
import './footer.css'
function Footer(props) {
    return (

        <div className="container-fluid my-5 p-0 mb-0">

            <footer className="text-secondary text-center text-lg-start" style={{backgroundColor:"#cbedf8" , fontWeight:'bold'}}>

                <div className="container p-4">

                    <div className="row mt-4">

                        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase mb-4">About School</h5>

                            <p>
                                this school was established in 2019 in the city of Tulkarm, Quds Bank Street. It obtained a leadership education certificate by two teachers, Mr. Bashar Khader and Fouad Abu Shanab.
                            </p>


                            <div className="mt-4">

                                <a type="button" className="btn btn-floating  btn-lg" style={{backgroundColor:'transparent'}}><i className="bi bi-facebook"></i></a>

                                <a type="button" className="btn btn-floating btn-lg" style={{backgroundColor:'transparent'}}><i className="bi bi-dribbble"></i></a>

                                <a type="button" className="btn btn-floating btn-lg" style={{backgroundColor:'transparent'}}><i className="bi bi-twitter"></i></a>

                                <a type="button" className="btn btn-floating btn-lg" style={{backgroundColor:'transparent'}}><i className="bi bi-google"></i></a>

                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-4 mb-md-0 mt-2">

                            <ul className="fa-ul" style={{marginLeft: "1.65em" , listStyle:'none'}}>
                                <li className="mb-3">
                                    <span className="fa-li"><i className="bi bi-house-fill h3"></i></span><span className="ms-2">Tulkarm, Palestine</span>
                                </li>
                                <li className="mb-3">
                                    <span className="fa-li"><i className="bi bi-envelope h3"></i></span><span className="ms-2">palestine-school@gmail.com</span>
                                </li>
                                <li className="mb-3">
                                    <span className="fa-li"><i className="bi bi-phone h3"></i></span><span className="ms-2">+970 56-9922586</span>
                                </li>
                                <li className="mb-3">
                                    <span className="fa-li"><i className="bi bi-printer h3"></i></span><span className="ms-2">+970 59-3806162</span>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase mb-4">Opening hours</h5>

                            <table className="table text-center text-secondary">
                                <tbody className="font-weight-bold">
                                <tr>
                                    <td>Mon - Thu:</td>
                                    <td>8am - 9pm</td>
                                </tr>
                                <tr>
                                    <td>Fri - Sat:</td>
                                    <td>Break </td>
                                </tr>
                                <tr>
                                    <td>Sunday:</td>
                                    <td>9am - 10pm</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

                <div className="text-center p-3" style={{backgroundColor: '#000000' , opacity:'0.2' , color:'white'}}>
                    © 2021 Copyright:
                    <a className="text-white px-1" href="" style={{textDecoration:'none'}}>Al-Zerei</a>
                </div>
            </footer>

        </div>
    );
}

export default Footer;