import React, { useEffect, useState } from 'react'
import useMultiStepperForm from '../useMultiStepperForm'
import PersonalInfo from './PersonalInfo';
import ProfessionalInfo from './ProfessionalInfo';
import BillingSection from './BillingSection';
import { User, Briefcase, CreditCard } from "lucide-react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import SubmitSuccess from './SubmitSuccess';

const MultiStepForm = () => {
    const [widthValue, setwidthValue] = useState("0%");
   
    const formfield = [
        { field: "PersonalInfo", icon: <User /> },
        { field: "ProfeessionalInfo", icon: <Briefcase /> },
        { field: "BillingSection", icon: <CreditCard /> },
    ];
    const {
        Step,
        next,
        Previous,
        register,
        handleSubmit,
        errors,
        isSubmitArray,
        isFromSubmit,
        ResetAll

    } = useMultiStepperForm(formfield.length);


    let SubmitedCount = isSubmitArray?.reduce((acc, val) => {
        return val?.isSubmit ? acc + 1 : acc
    }, 0)


    function handlewidthvalue(){
        setwidthValue("0%");
    }
    useEffect(() => {
        if (SubmitedCount == 0) return;
        switch (SubmitedCount) {
            case 1: setwidthValue("50%"); break;
            case 2: setwidthValue("100%"); break;
            case 3: setwidthValue("100%"); break;
            default: setwidthValue("0%")
        }
    }, [SubmitedCount])
    return (
        <>

            {!isFromSubmit?<div className='container'>
                <div className='stepper'>


                    {

                        formfield.map((val, idx) => <div className='stpes'>
                            <span className='iconspan'
                                style={{
                                    backgroundColor: "black",
                                    padding: "8px",
                                    color: "white ",
                                    borderRadius: "50%",

                                }}
                            >{isSubmitArray[idx]?.isSubmit ? <Check /> : val.icon}</span>
                            {val.field}</div>)}

                    <div className="line"
                        style={{
                            width: widthValue
                        }}
                    ></div>
                </div>
                <form onSubmit={handleSubmit(next)}>

                    {Step == 0 && <PersonalInfo register={register} errors={errors} />

                    }
                    {Step == 1 && <ProfessionalInfo register={register} errors={errors} />

                    }
                    {Step == 2 && <BillingSection register={register} errors={errors} />

                    }
                    <button type="submit"
                        className='nextbtn'
                        disabled={Step > formfield.length}
                    > {Step == formfield.length - 1 ? "Submit" : "next"}   <ChevronRight /></button>
                </form>

                <button
                    className='prevbtn'
                    onClick={Previous}
                    disabled={Step == 0}
                ><ChevronLeft /> prev </button>


            </div>:<SubmitSuccess Reset={ResetAll} resetwidth={handlewidthvalue}/>}
        </>
    )
}

export default MultiStepForm