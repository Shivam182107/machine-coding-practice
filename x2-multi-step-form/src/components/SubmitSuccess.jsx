import { Check } from 'lucide-react'
import React from 'react'

const SubmitSuccess = ({Reset,resetwidth}) => {
  return (
   
    <div className='success'>
        <div className='greencircle'>
            <Check/>
        </div>
        <h2>Form is Submited Successfully</h2>
        <button 
        onClick={()=>{
            Reset()
            resetwidth()
        }}
        >Reset</button>
    </div>
  )
}

export default SubmitSuccess