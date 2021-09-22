import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function HotelOwnerRegister() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const onFormSubmit = async (hotelObj) => {
    console.log(hotelObj);
    let responseObj = await axios.post(
      "/hotelowner/hotelownerregister",
      hotelObj
    );
    let payload = responseObj.data;
    if (payload.message === "Success") {
      alert("Successfully Registered");
      history.push("/home");
    } else {
      alert("email id already taken, Give Unique Email Id");
    }
  };

  return (
    <div className="row mt-3 container-fluid">
      <form
        className="col-11 col-sm-8 col-md-6 col-lg-5 shadow mx-auto scale-up-center"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <h2 className="text-center">Hotel Registration Form</h2>

        {/* ownername */}
        <div className="form-floating mb-4">
          <input
            type="text"
            name="ownername"
            id="ownername"
            className="form-control"
            placeholder="ownername"
            {...register("ownername", { required: true })}
          />
          <label htmlFor="ownername">Hotel User Name*</label>
        </div>
        {errors.ownername?.type === "required" && (
          <p className="alert alert-danger ">*Ownername is Required</p>
        )}
        {/* password */}
        <div className="form-floating mb-4">
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="password"
            {...register("password", { required: true })}
          />
          <label htmlFor="password">Password*</label>
        </div>
        {errors.password?.type === "required" && (
          <p className="alert alert-danger ">*Password is Required</p>
        )}
        {/* email id */}
        <div className="form-floating mb-4">
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="email"
            {...register("email", { required: true })}
          />
          <label htmlFor="email">Email*</label>
        </div>
        {errors.location?.type === "required" && (
          <p className="alert alert-danger ">*Email is Required</p>
        )}
        {/* Mobile Number */}
        <div className="form-floating mb-4">
          <input
            type="number"
            name="mobilenumber"
            id="mobilenumber"
            className="form-control"
            placeholder="mobilenumber"
            {...register("mobilenumber", { required: true })}
          />
          <label htmlFor="mobilenumber">MobileNumber*</label>
        </div>
        {errors.mobilenumber?.type === "required" && (
          <p className="alert alert-danger ">*MobileNumber is Required</p>
        )}
        {/* Submit */}
        <button className="btn w-50 d-block mx-auto mb-4 mt-3 rounded-pill glow-on-hover">
          Register
        </button>
      </form>
    </div>
  );
}

export default HotelOwnerRegister;
