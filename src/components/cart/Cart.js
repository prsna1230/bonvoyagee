import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Modal, Button } from "react-bootstrap";
import Fare from "./Fare";
import FlightCart from "../cart/FlightCart";
import HolidayCart from "../cart/HolidayCart";
import HotelCart from "../cart/HotelCart";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux-store/cartSlice";
import Footer from "../shared component/Footer";

function MyverticallyCenteredPopup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2 className="text-center popup">
          <strong>
            The journey of a thousand miles begins with a single step.
            <br />
            The world is waiting for you. Good Luck. Travel Safe.
          </strong>{" "}
        </h2>
        <h1 className="text-center text-danger popup">
          Thank You For Booking..! Bon Voyage..!!
        </h1>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const Cart = () => {
  let dispatch = useDispatch();
  let { isSuccess } = useSelector((state) => state.cart);
  let stateitem = localStorage.getItem("state");
  let userDetails = localStorage.getItem("userDetails");
  let { stateType, stateObj } = JSON.parse(stateitem);
  let { username } = JSON.parse(userDetails);
  let [travellerCount, setTravellerCount] = useState(1);
  const [modalShow, setModalShow] = React.useState(false);
  let history = useHistory();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onChange" });

  const onDetailSubmit = (detailObj) => {
    detailObj.stateInfo = stateObj;
    detailObj.stateType = stateType;
    detailObj.username = username;
    dispatch(addCart(detailObj));
    setModalShow(true);
  };

  // travellers count function
  const travellerCountfun = (e) => {
    console.log(e);
    let value = e.target.value;
    if (value < 2) {
      setTravellerCount(1);
    } else {
      setTravellerCount(value);
    }
    console.log("Value from cart", value);
  };
  return (
    <>
      {isSuccess && (
        <MyverticallyCenteredPopup
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            history.push("/home");
          }}
        />
      )}

      <div className="container">
        {/* info component */}
        <div className="row mt-3">
          <div className="col-sm-12 col-md-9">
            <h5 className="top-heading">
              {" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1001/1001259.png"
                alt="icon"
                width="25px"
              />{" "}
              Review Your Booking
            </h5>

            {stateType === "hotel" ? (
              <HotelCart state={stateObj} />
            ) : stateType === "flights" ? (
              <FlightCart state={stateObj} />
            ) : (
              <HolidayCart state={stateObj} />
            )}
            {/* contact info */}
            <h4 className="top-heading mt-4">
              <img
                src="https://img-premium.flaticon.com/png/512/2080/premium/2080904.png?token=exp=1632113991~hmac=abccefedab018a2b65f43517377cc419"
                alt="icon"
                width="25px"
              />{" "}
              Enter Traveller Details
            </h4>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="card p-3 g-2 " style={{ borderRadius: "0px" }}>
                  <form action="" onSubmit={handleSubmit(onDetailSubmit)}>
                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2">
                      {/* email */}
                      <div className="form-floating col mt-2">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="email"
                          className="form-control rounded-pill"
                          {...register("email", { required: true })}
                        />
                        <label className="ms-2">Email</label>
                      </div>
                      {errors.email?.type === "required" && (
                        <p className="alert alert-danger">Email Required</p>
                      )}
                      {/* Mobile Number*/}
                      <div className="form-floating col mt-2">
                        <input
                          type="number"
                          name="mobile"
                          id="mobile"
                          placeholder="mobile"
                          className="form-control rounded-pill"
                          {...register("mobile", { required: true })}
                        />
                        <label className="ms-2">Mobile Number</label>
                      </div>
                      {errors.mobile?.type === "required" && (
                        <p className="alert alert-danger">
                          Mobile Number Required
                        </p>
                      )}
                    </div>
                    <p className="text-muted text-center mb-0 pb-0 policy-para">
                      Your booking details will be sent to this email address
                      and mobile number.
                    </p>
                    <hr className="text-muted mt-0 pt-0" />
                    <div className="mx-auto">
                      {/* Name */}
                      <div className="form-floating col mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Name"
                          className="form-control rounded-pill"
                          {...register("name", { required: true })}
                        />
                        <label className="ms-2">Name*</label>
                        <p id="info" className="form-text ms-3 policy-para">
                          On This Name Registration Will Happen
                        </p>
                      </div>
                      {errors.name?.type === "required" && (
                        <p className="alert alert-danger">Name Required</p>
                      )}
                    </div>
                    {/* For Hotel */}
                    {stateType === "hotel" ? (
                      <div className="mx-auto">
                        <div className="form-floating col mt-2">
                          <input
                            type="number"
                            name="roomnum"
                            id="roomnum"
                            placeholder="roomnum"
                            className="form-control rounded-pill"
                            {...register("roomnum", {
                              required: true,
                            })}
                            onChange={travellerCountfun}
                          />
                          <label className="ms-2">Number Of Rooms*</label>
                        </div>
                        {errors.roomnum?.type === "required" && (
                          <p className="alert alert-danger">
                            No of Rooms Required
                          </p>
                        )}
                      </div>
                    ) : stateType === "flights" ? (
                      <div className="mx-auto">
                        <div className="form-floating col mt-2">
                          <input
                            type="number"
                            name="travellerCount"
                            id="travellerCount"
                            placeholder="travellerCount"
                            className="form-control rounded-pill"
                            {...register("travellerCount", { required: true })}
                            onChange={travellerCountfun}
                          />
                          <label className="ms-2">TravellerCount*</label>
                        </div>
                        {errors.travellerCount?.type === "required" && (
                          <p className="alert alert-danger">
                            No of Travellers Required
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="mx-auto">
                        <div className="form-floating col mt-2">
                          <input
                            type="number"
                            name="travellerCount"
                            id="travellerCount"
                            placeholder="travellerCount"
                            className="form-control rounded-pill"
                            {...register("travellerCount", { required: true })}
                            onChange={travellerCountfun}
                          />
                          <label className="ms-2">Traveller's Count*</label>
                        </div>
                        {errors.travellerCount?.type === "required" && (
                          <p className="alert alert-danger">
                            No of Travellers Required
                          </p>
                        )}
                      </div>
                    )}
                    {/* Submit */}
                    <div className="mx-auto">
                      <p className="smalltext">
                        By proceeding, I agree to BonVoyage's{" "}
                        <a href="#">User Agreement, Terms of Service</a> and
                        <a href="#">
                          {" "}
                          Cancellation & Property Booking Policies.
                        </a>
                      </p>
                      <button className="btn btn-info rounded-pill p-2  mt-2  glow-on-hover text-center">
                        Pay Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <h5 className="top-heading">Tariff Details</h5>
            <div className="card shadow " style={{ borderRadius: "0px" }}>
              <Fare state={stateObj} travellerCount={travellerCount} />
            </div>
            <img
              src="https://previews.123rf.com/images/mikalaimanyshau/mikalaimanyshau1608/mikalaimanyshau160800037/60724391-travel-to-world-road-trip-tourism-old-suitcase-with-landmarks-vertical-web-banner-modern-flat-design.jpg"
              alt="banner"
              width="100%"
              className="mt-5"
            />
          </div>
        </div>
        <h5 className="text-center top-heading mt-3 mb-5">
          Thank You..! Visit Again
        </h5>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
