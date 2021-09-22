import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

function UserRegister() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();
  let [userRegisterStatus, setUserRegisterStatus] = useState("");
  let [file, setFile] = useState(null);

  // full form submission
  const onFormSubmit = async (userObj) => {
    let formData = new FormData();
    // Append Image to it
    formData.append("profileimage", file, file.name);
    // Append user Object
    formData.append("userObj", JSON.stringify(userObj));
    let responseObj = await axios.post("/users/userregister", formData);
    let payload = responseObj.data;
    if (payload.message === "Success") {
      // redirect to login
      alert("Succesfully Registered");
      history.push("/home");
    } else {
      alert("Choose Different User name");
      setUserRegisterStatus("Username had already taken");
    }
  };

  // for profileImage select
  const onProfileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="row mt-3 container-fluid">
      <form
        className="col-11 col-sm-8 col-md-6 col-lg-5 shadow mx-auto scale-up-center"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        {userRegisterStatus && (
          <h3 className="text-danger text-center">{userRegisterStatus}</h3>
        )}
        <h2 className="text-center">User Registration Form</h2>
        {/* Name */}
        <div className="form-floating mb-4">
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="name"
            {...register("name", { required: true })}
          />
          <label htmlFor="name">Name*</label>
        </div>
        {errors.name?.type === "required" && (
          <p className="alert alert-danger ">*Name is Required</p>
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
        {/* Address */}
        <div className="form-floating mb-4">
          <input
            type="text"
            name="address"
            id="address"
            className="form-control"
            placeholder="address"
            {...register("address", { required: true })}
          />
          <label htmlFor="address">Address*</label>
        </div>
        {errors.address?.type === "required" && (
          <p className="alert alert-danger ">*Address is Required</p>
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
        {errors.email?.type === "required" && (
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
        {/* Profile pic */}
        <div className="form-floating mb-4">
          <input
            type="file"
            name="profileimage"
            id="profileimage"
            className="form-control"
            placeholder="profileimage"
            onChange={onProfileSelect}
          />
        </div>
        {errors.profileimage?.type === "required" && (
          <p className="alert alert-danger ">*Profilepic is Required</p>
        )}
        {/* Submit */}
        <button className="btn w-50 d-block mx-auto mb-4 mt-3 rounded-pill glow-on-hover">
          Register
        </button>
      </form>
    </div>
  );
}

export default UserRegister;
