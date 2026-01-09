import React, { useContext, useRef } from 'react'
import { AppContext } from '../AppContext'

const LoginInput = () => {
    const{getPhoneNumber}=useContext(AppContext);
    const inpRef=useRef();
  return (
    <>
   <div style={{
    border: "1px solid #334155",
    height: "300px",
    width: "500px",
    margin: "100px auto",
    padding: "24px",
    borderRadius: "12px",
    backgroundColor: "#020617",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}}>
    <h1 style={{
        textAlign: "center",
        marginBottom: "8px",
        color: "#f8fafc"
    }}>
        Shivam's App
    </h1>

    <p style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#94a3b8"
    }}>
        Please Login to your account
    </p>

    <input
        type="text"
        name="PhoneNumber"
        id="PhoneNumber"
        placeholder="Enter your phone number"
        ref={inpRef}
        style={{
            
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #334155",
            outline: "none",
            marginBottom: "16px",
            backgroundColor: "#020617",
            color: "#fff"
        }}
    />

    <button
        type="submit"
        style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "#fff",
            fontWeight: "600"
        }}
        onClick={() => {
            let value = inpRef.current.value;
            let regex = /[^0-9]/g;
            if (value.length > 10 || regex.test(value)) {
                alert("You entered the phone number is invalid  plz checke it ");
                return;
            }
            getPhoneNumber(value);
            console.log("inside Login Componet And the phone number is ", value)
            inpRef.current.value = "";
        }}
    >
        Submit
    </button>
</div>

    </>
  )
}

export default LoginInput

