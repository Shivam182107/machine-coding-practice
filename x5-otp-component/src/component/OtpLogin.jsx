import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../AppContext'

const OtpLogin = () => {
    const { PhoneNumber, OtpInputSize, setIsOtpOpenfunc } = useContext(AppContext);
    const [otp, setotp] = useState(new Array(OtpInputSize).fill(""));
    const otpRef = useRef([]);
    useEffect(() => {
        if (!PhoneNumber || !OtpInputSize) return;
        otpRef?.current[0]?.focus();
    }, [])
    function handleOnChage(e, idx) {
        let value = e.target.value;
        let regex = /[^0-9]/g;
        if (isNaN(value) || regex.test(value)) return;
        let newOtp = [...otp];
        newOtp[idx] = value[value.length - 1];
        setotp(newOtp);
        console.log(newOtp);
        // if(value&&otpRef.current[idx-1]&&!otp[idx-1]){
        //     let emptyidx=otp.findIndex(val=>val==""||val==undefined);
        //     otpRef.current[emptyidx].focus();
        // }
        if (value && otpRef.current[idx + 1] && idx < OtpInputSize - 1) {
            let emptyidx = newOtp.findIndex(val => val == "" || val == undefined);
            otpRef.current[emptyidx].focus();
        }


    }
    function handleKeyDown(e, idx) {
        if (e.key == 'Backspace' && otpRef.current[idx - 1] && !otp[idx] && idx > 0) {
            otpRef.current[idx - 1].focus();
        }
    }
    function handleClick(idx) {
        otpRef.current[idx].setSelectionRange(1, 1);
        let emptyplace = otp.findIndex(val => val == "" || val == undefined);
        if (emptyplace != -1 && emptyplace < idx) {
            otpRef.current[emptyplace].focus();
        }
    }
    return (
        <>
            <div style={{
                border: "1px solid #334155",
                padding: "24px",
                borderRadius: "12px",
                backgroundColor: "#020617",
                width: "420px",
                margin: "100px auto",
                boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                textAlign: "center"
            }}>

                <h1 style={{
                    color: "#f8fafc",
                    marginBottom: "16px"
                }}>
                    Enter your OTP
                </h1>

                <button
                    onClick={() => {
                        setIsOtpOpenfunc();
                    }}
                    style={{
                        marginBottom: "20px",
                        padding: "6px 12px",
                        fontSize: "14px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#dc2626",
                        color: "#fff",
                        cursor: "pointer",
                        position:"absolute",
                        top:"10px",
                        right:"10px"
                        
                    }}
                >
                    Close
                </button>

                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    {
                        otp.map((val, idx) => (
                            <input
                                type="text"
                                name="OtpInput"
                                id="OtpInput"
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    marginRight: "10px",
                                    textAlign: "center",
                                    fontSize: "18px",
                                    borderRadius: "8px",
                                    border: "1px solid #334155",
                                    backgroundColor: "#020617",
                                    color: "#fff",
                                    outline: "none"
                                }}
                                ref={(inp) => otpRef.current[idx] = inp}
                                onChange={(e) => handleOnChage(e, idx)}
                                value={val}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                onClick={() => handleClick(idx)}
                            />
                        ))
                    }
                </div>

            </div>

        </>
    )
}

export default OtpLogin