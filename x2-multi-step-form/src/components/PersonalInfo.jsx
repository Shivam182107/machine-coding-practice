import React from 'react'

const PersonalInfo = ({ register, errors }) => {
  return (
    <>
 
     
      <div >
        <label htmlFor="FullName">FullName</label>
        <input type="text" name="FullName" id="FullName"
          {...register("FullName", {
            minLength: { value: 6, message: "Minimum length is 6 " },
            required: { value: true, message: "This field is required" },

          })}
        />

        {errors?.FullName && <p>{errors?.FullName.message}</p>}
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input type="email" name="Email" id="Email"
          {...register("Email", {
            minLength: { value: 6, message: "Minimum length is 6 " },
            required: { value: true, message: "This field is required" },

          })}
        />
        {errors?.Email && <p>{errors?.Email.message}</p>}
      </div>
      <div>
        <label htmlFor="">Phone Number</label>
        <input type="text" name="PhoneNumber" id="PhoneNumber"

          {...register("PhoneNumber", {
            minLength: { value: 10, message: "Minimum length is 10 " },
            required: { value: true, message: "This field is required" },

          })}
        />
        {errors?.PhoneNumber && <p>{errors?.PhoneNumber.message}</p>}
      </div>

    </>
  )
}

export default PersonalInfo