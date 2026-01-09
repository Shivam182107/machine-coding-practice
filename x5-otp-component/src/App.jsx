// import { useEffect, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const inprref = useRef("");
//   console.log(inprref);
//   const [Showotp, setShowotp] = useState(false);
//   const OtpInpSize = 4;
//   const otpinpref = useRef([]);
//   const [otp, setotp] = useState(new Array(OtpInpSize).fill(""))

//   const handelSubmit = (e) => {
//     e.preventDefault();
//     console.log(inprref);
//     console.log(inprref.current.value);
//     const regex = /[^0-9]/g;
//     if (inprref.current.value.length < 10 || regex.test(inprref.current.value)) {
//       alert("The Entered Phone Number is invalid ");
//       return;
//     }
//     setShowotp(true);
//     console.log(otpinpref);
//     inprref.current.value = "";
//   }
//   useEffect(() => {
//     if (otpinpref.current[0]) {
//       otpinpref.current[0].focus();
//       console.log("inside the efefect and focus done")
//     }
//   }, [Showotp])


//   function haldeleOnchage(e, idx) {
//     let CombinedOtp = "";
//     let newotp = [...otp]
//     let value = e.target.value;
//     if (isNaN(value)) return;
//     newotp[idx] = value[value.length - 1];//value.substring(value.length-1);
//     setotp(newotp);
//     console.log(newotp.join(""));
//     console.log(newotp);
//     if (value && idx < OtpInpSize - 1 && otpinpref.current[idx + 1]) {
//       otpinpref.current[idx + 1].focus();
//     }

//   }
//   function handleBackSpace(e, idx) {
//     if (e.key === "Backspace" && !otp[idx] && otpinpref.current[idx - 1] && idx > 0) {
//       otpinpref.current[idx - 1].focus();
//     }
//   }
//   // function handleOnClick(idx) {
//   //   otpinpref.current[idx].setSelectionRange(1, 1);

//   //   //if the enter value of  any input feild and the privious value is not feild then jumping to that input 1 - 3 4

//   //   if (idx > 0 && !otp[idx - 1]) {
//   //     otpinpref.current[otp.indexOf("")].focus();
//   //   }

//   // }

//   function handleOnClick(idx) {
//     const firstEmptyIndex = otp.indexOf("");

//     setTimeout(() => {
//       if (firstEmptyIndex !== -1 && idx > firstEmptyIndex) {
//         otpinpref.current[firstEmptyIndex]?.focus();
//       } else {
//         otpinpref.current[idx]?.setSelectionRange(1, 1);
//       }
//     }, 0);
//   }

//   return (
//     <>
//       <div style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         backgroundColor: "black",
//         color: "white",
//         height: "100vh"
//       }}>
//         <h1 style={{
//           textAlign: "center"
//         }}>Wellcome to Shivam's App </h1>
//         <p style={{
//           textAlign: "center"
//         }}> Please Login!</p>
//         {!Showotp ? <form action="" onSubmit={handelSubmit}>

//           <input type="text" name="PhoneNumber" id="PhoneNumber" placeholder='Enter Your Number '
//             style={{
//               paddingInline: "10px",
//               paddingBlock: "10px"
//             }}
//             ref={inprref}
//           />
//           <button type="submit">Submit</button>
//         </form> : <div>
//           {
//             otp.map((val, idx) => (
//               <input type="text" name="otp" id="otp"
//                 ref={(inp) => otpinpref.current[idx] = inp}
//                 style={{

//                   width: "21px",
//                   height: "24px",
//                   marginRight: "10px",
//                   textAlign: "center"


//                 }}
//                 onChange={(e) => haldeleOnchage(e, idx)}
//                 value={val}
//                 onKeyDown={(e) => handleBackSpace(e, idx)}
//                 onClick={() => handleOnClick(idx)}

//               />
//             ))
//           }
//         </div>}
//       </div>

//     </>
//   )
// }

// export default App

import React, { useEffect, useState } from 'react'
import LoginInput from './component/LoginInput'
import { AppContext } from './AppContext'
import './App.css'
import OtpLogin from './component/OtpLogin'

const App = () => {

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [isOtpOpen, setisOtpOpen] = useState(false);
  function getPhoneNumber(data) {
    setPhoneNumber(data)
  }
  useEffect(() => {
    if (isNaN(PhoneNumber)||PhoneNumber.length>10||PhoneNumber.length==0) return;
    setisOtpOpen(true);
  }, [PhoneNumber])

  function setIsOtpOpenfunc() {
    setisOtpOpen(false);
    setPhoneNumber("")
  }
  return (
    <>
      <AppContext.Provider value={{
        getPhoneNumber,
        PhoneNumber,
        OtpInputSize:4,
        setIsOtpOpenfunc
      }}>

       {isOtpOpen? <OtpLogin/>:<LoginInput/>}
      </AppContext.Provider>
    </>
  )
}

export default App