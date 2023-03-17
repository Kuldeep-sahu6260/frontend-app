import React, { useState } from 'react';
import firebase from '../firebase';
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import signinImage from '../assets/demo.png';
import logo from "../assets/logo.png"

import OtpInput from 'react-otp-input';





const Auth = () => {
    
    const [isOtp, setisOtp] = useState(true);
    const [otp, setOtp] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [final,setFinal] = useState(false);

    const handleChange = (e) => {
        
        setPhoneNumber(e.target.value);
    }

    const handleChangeotp = (otp) => {
        setOtp(otp);
    };


    const onSignInSubmit = (e) => {
        e.preventDefault()
        configureCaptcha()
        const Number = "+91" + phoneNumber
        console.log(Number)
        const appVerifier = window.recaptchaVerifier;
        const auth = getAuth();
       signInWithPhoneNumber(auth,Number, appVerifier)
            .then((confirmationResult) => {
                
                window.confirmationResult = confirmationResult;
                setisOtp(false);
                console.log("OTP has been sent")
                
            }).catch((error) => {
            
                console.log("SMS not sent",error)
            });
    }

    const onSubmitOTP = (e) => {
        e.preventDefault()
        const code = otp
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
           
            const user = result.user;
            console.log(JSON.stringify(user))
            alert("User is verified")
            setFinal(true);
           
        }).catch((error) => {
           console.log(error);
        });
    }
    const configureCaptcha = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              
              onSignInSubmit();
              console.log("Recaptca varified")
            },
            defaultCountry: "IN"
          }, auth);
    }

    const switchMode = () => {
        setisOtp((previsOtp) => !previsOtp);
    }

    if(final){
        return (
            <>
            <div className='logo' >
                <img className='img' src={logo} alt="logo" />
                <h5 className='text'>Success</h5>
            </div>
            </>
        )
    }


    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{'Welcome to SystemPakage'}</p>
                   {!isOtp && (
                     <form onSubmit={onSubmitOTP}>
                         {!isOtp && (
                        <OtpInput
                            value={otp}
                            onChange={handleChangeotp}
                            numInputs={6}
                            separator={<span>-</span>}
                        />
                    )}

                    <div className="auth__form-container_fields-content_button">
                        <button>{isOtp ? "Next" : "verify"}</button>
                    </div>
                     </form>
                   )}

                  {isOtp && (
                      <form onSubmit={onSignInSubmit}>
                        
                      <div className="auth__form-container_fields-content_input" >
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <div id="sign-in-button"></div>
                          <input
                              name="phoneNumber"
                              type="text"
                              placeholder="Phone Number"
                              onChange={handleChange}
                              required
                          />
                      </div>
                

                  <div className="auth__form-container_fields-content_button">
                      <button>{isOtp ? "Next" : "verify"}</button>
                  </div>
              </form>
                  )}
                    <div className="auth__form-container_fields-account">
                        <p>
                            {
                                "Don't have an account?"
                            }
                            <span onClick={switchMode}>
                                {'create account'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth;