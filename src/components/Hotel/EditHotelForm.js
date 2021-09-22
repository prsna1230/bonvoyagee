import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { editHotels } from "../redux-store/hotelSlice";
const EditHotelForm = ({ hotelForEdit, seted, index }) => {
  let dispatch = useDispatch();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: hotelForEdit,
  });
  let [file, setFile] = useState([]);
  let { userObj } = useSelector((state) => state.user);
  // image adding
  const onFileSelect = (e) => {
    setFile([...e.target.files]);
  };

  // create Formdata Object
  let formData = new FormData();

  // On Submitting Form
  const addHotelForm = async (hotelObj) => {
    // append image to it
    file.forEach((element, ind) => {
      let temp = `hotelImg`;
      formData.append(temp, element, element.name);
    });
    //append hotel ownername
    hotelObj.ownername = userObj.ownername;

    // // append hotel object
    formData.append("hotelObj", JSON.stringify(hotelObj));

    dispatch(
      editHotels({ hid: hotelObj._id, formData: formData, index: index })
    );

    seted(false);
  };
  return (
    <form onSubmit={handleSubmit(addHotelForm)}>
      <div class="form-floating mb-3">
        <input
          type="file"
          class="form-control"
          id="img"
          multiple
          accept="image/*"
          placeholder="Hotel Images"
          onChange={onFileSelect}
        />
      </div>
      {/* hotelname */}
      <div className="form-floating mb-4">
        <input
          type="text"
          name="hotelname"
          id="hotelname"
          className="form-control"
          placeholder="hotelname"
          {...register("hotelname", { required: true })}
        />
        <label htmlFor="hotelname">Hotelname*</label>
      </div>
      {errors.hotelname?.type === "required" && (
        <p className="alert alert-danger ">*Hotelname is Required</p>
      )}
      {/* hotelstar */}
      <div className="form-floating mb-4">
        <input
          type="number"
          name="hotelstar"
          id="hotelstar"
          className="form-control"
          placeholder="hotelstar"
          {...register("hotelstar", { required: true })}
        />
        <label htmlFor="hotelstar">hotelStar*</label>
      </div>
      {errors.hotelstar?.type === "required" && (
        <p className="alert alert-danger ">*hotelstar is Required</p>
      )}
      {/* location */}
      <div className="form-floating mb-4">
        <input
          type="text"
          name="location"
          id="location"
          className="form-control"
          placeholder="location"
          {...register("location", { required: true })}
        />
        <label htmlFor="location">Location*</label>
      </div>
      {errors.location?.type === "required" && (
        <p className="alert alert-danger ">*Location is Required</p>
      )}
      {/* no of rooms */}
      <div class="form-floating mb-3">
        <input
          type="number"
          class="form-control"
          id="noOfRooms"
          placeholder="destination"
          {...register("noOfRooms", { required: true })}
        />
        <label for="floatingInput">Number of rooms</label>
      </div>
      {errors.noOfRooms?.type === "required" && (
        <p className="alert alert-danger">Number of rooms are Required</p>
      )}
      {/* Room name */}
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="roomname"
          placeholder="days"
          {...register("roomname", { required: true })}
        />
        <label for="floatingInput">Room Name</label>
      </div>
      {errors.roomname?.type === "required" && (
        <p className="alert alert-danger">Room name is required</p>
      )}
      {/* price */}
      <div class="form-floating mb-3">
        <input
          type="number"
          class="form-control"
          id="price"
          placeholder="price"
          {...register("price", { required: true })}
        />
        <label for="floatingInput">Room Price</label>
      </div>
      {errors.price?.type === "required" && (
        <p className="alert alert-danger">Price is Required</p>
      )}
      {/* hotel description */}
      <div class="form-floating mb-3">
        <input
          type="textarea"
          class="form-control"
          id="desp"
          placeholder="package description"
          {...register("desp", { required: true })}
        />
        <label for="floatingInput">Hotel description</label>
      </div>
      {errors.desp?.type === "required" && (
        <p className="alert alert-danger">Descrption is Required</p>
      )}
      {/* hotel facilities */}
      <div class="form-floating mb-3">
        <input
          type="textarea"
          class="form-control"
          id="hotelfacilities"
          placeholder="hotelfacilities"
          {...register("hotelfacilities", { required: true })}
        />
        <label for="floatingInput">Hotel Facilities</label>
      </div>
      {errors.hotelfacilities?.type === "required" && (
        <p className="alert alert-danger">hotel Facilities is Required</p>
      )}
      {/* Room Facilities */}
      <div class="form-floating mb-3">
        <input
          type="textarea"
          class="form-control"
          id="roomfacilities"
          placeholder="roomfacilities"
          {...register("roomfacilities", { required: true })}
        />
        <label for="floatingInput">Room Facilities</label>
      </div>
      {errors.roomfacilities?.type === "required" && (
        <p className="alert alert-danger">Room Facilities is Required</p>
      )}
      {/*Important Land Marks */}
      <div class="form-floating mb-3">
        <input
          type="textarea"
          class="form-control"
          id="landmarks"
          placeholder="landmarks"
          {...register("landmarks", { required: true })}
        />
        <label for="floatingInput">Landmarks</label>
      </div>
      {errors.landmarks?.type === "required" && (
        <p className="alert alert-danger">Landmarks is Required</p>
      )}

      <button className="btn btn-success w-50">Update Hotel</button>
    </form>
  );
};

export default EditHotelForm;
