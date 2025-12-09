import { useState } from "react";
import { useForm } from "react-hook-form"

const useMultiStepperForm = (StepperLength) => {
  const [Step, setStep] = useState(0);
   const [isFromSubmit,setisFromSubmit]=useState(false)
  const [isSubmitArray, setisSubmitArray] = useState([{
    fieldidx: 0,
    isSubmit: false,
  }])

  const {
    register,
    watch,
    formState: { errors, },
    reset,
    handleSubmit,

  } = useForm();
  const next = (data) => {
    if (Step < StepperLength - 1) {
      setisSubmitArray((prev) => {
        let obj = {
          fieldidx: Step,
          isSubmit: true,
        }

        if (Step == 0) {
          return [obj]
        }
        else {
          return [...prev, obj];

        }

      })
      setStep((prev) => prev + 1);
    
      
    }
    else {
      console.log(data);
      console.log(Step);
        if(Step==StepperLength-1){
        setisFromSubmit(true);
      }
      console.log(isFromSubmit);
      reset();
      setStep(0)
      return
    }

  }
  const Previous = () => {
    if (Step > 0) {
      setStep((prev) => prev - 1);
    }
    else {
      return;
    }

  }


  const ResetAll=()=>{
    setisFromSubmit(false);
    setisSubmitArray([{
    fieldidx: 0,
    isSubmit: false,
  }])
  }

  return {
    Step,
    next,
    Previous,
    register,
    handleSubmit,
    errors,
    isSubmitArray,
    isFromSubmit,
    ResetAll

  }
}

export default useMultiStepperForm