import React from "react";

const HotelCancelatonPolicy = () => {
  return (
    <div>
      <h5 className="policy-heading">
        {" "}
        <strong>CANCELLATION POLICY / HOTEL POLICIES</strong>{" "}
      </h5>
      <h6 className="policy-heading">Standard Rate:</h6>
      <p className="policy-para">
        The cancellation is free of charge 7 days prior to the date of arrival,
        after this time we charge you 90% the room rate as cancellation fee, if
        we could not sell the room more.
      </p>
      <h6 className="policy-heading">Non Refundable Rate:</h6>
      <p className="policy-para">
        For the non refundable bookings are no cancellation or changes possible.
        In case of a cancellation, 90% of the total amount will be charged as
        cancellation fee.
      </p>
    </div>
  );
};

export default HotelCancelatonPolicy;
