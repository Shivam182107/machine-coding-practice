import React from 'react'

const BillingSection = ({register,errors}) => {
  return (
    <>
  
      <div>
        <label htmlFor="CardNumber">Card Number</label>
        <input type="text" name="CardNumber" id="CardNumber"
          {...register("CardNumber", {
            minLength: { value: 16, message: "Minimum length is 16 " },
            required: { value: true, message: "This field is required" },

          })}
        />

        {errors?.CardNumber && <p>{errors?.CardNumber.message}</p>}
      </div>
      <div>
        <label htmlFor="">Cardholder Name</label>
        <input type="text" name="CardholderName" id="CardholderName"
          {...register("CardholderName", {
            minLength: { value: 6, message: "Minimum length is 6 " },
            required: { value: true, message: "This field is required" },

          })}
        />
        {errors?.CardholderName && <p>{errors?.CardholderName.message}</p>}
      </div>
      <div>
        <label htmlFor="">Expiry</label>
        <input type="text" name="expiry" id="expiry"

          {...register("expiry", {
            minLength: { value: 10, message: "Minimum length is  6 " },
            required: { value: true, message: "This field is required" },

          })}
        />
        {errors?.expiry && <p>{errors?.expiry.message}</p>}
      </div>
       <div>
        <label htmlFor="">cvv</label>
        <input type="text" name="cvv" id="cvv"

          {...register("cvv", {
            minLength: { value: 10, message: "Minimum length is  6 " },
            required: { value: true, message: "This field is required" },

          })}
        />
        {errors?.cvv && <p>{errors?.cvv.message}</p>}
      </div>
    </>
  )
}

export default BillingSection