import React from 'react'

const ProfessionalInfo = ({register,errors}) => {
  return (
    <>
   
      <div>
        <label htmlFor="company">company</label>
        <input type="text" name="company" id="company"
          {...register("company", {
            minLength: { value: 6, message: "Minimum length is 6 " },
            required: { value: true, message: "This field is required" },

          })}
        />

        {errors?.company && <p>{errors?.company.message}</p>}
      </div>
      <div>
        <label htmlFor="">Years of Experience</label>
        <input type="text" name="YearsofExperience" id="YearsofExperience"
          {...register("YearsofExperience", {
            minLength: { value: 6, message: "Minimum length is 6 " },
            required: { value: true, message: "This field is required" },

          })}
        />
        {errors?.YearsofExperience && <p>{errors?.YearsofExperience.message}</p>}
      </div>
      <div>
        <label htmlFor="">Position</label>
        <input type="text" name="Postion" id="Postion"

          {...register("Postion", {
            minLength: { value: 10, message: "Minimum length is  6 " },
            required: { value: true, message: "This field is required" },

          })}
        />
        {errors?.Postion && <p>{errors?.Postion.message}</p>}
      </div>

  
    </>
  )
}

export default ProfessionalInfo