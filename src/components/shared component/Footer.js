import React from "react";

function Footer() {
  return (
    <div>
      <h3 className="text-center mt-3 mb-4">~~~~~FAQ'S~~~~~</h3>
      <div className="row row-cols-sm-1 row-cols-md-2 container-fluid footer">
        <div>
          <h6 className="fw-bold footer-heading">
            How to book a hotel with BonVoyage
          </h6>
          <p className="text-muted footer-para">
            Booking a hotel online is easy through BonVoyage. All you need to do
            first is to download our app on your Android or iOS device or simply
            use your computer. On the app, tap on the Hotels section on the top
            left corner and enter the details of the city, the area or the
            hotel. Fill out the check-in and check-out dates, along with the
            other details and tap Search. Use the Sort & Filter options so that
            you can book one as per your convenience. You can also choose hotels
            according to user reviews and ratings. The same follows on our site.
          </p>
        </div>
        <div>
          <h3 className="fw-bold footer-heading">
            How do I make a flight booking on BonVoyage?
          </h3>
          <p className="text-muted footer-para">
            You can book a flight on BonVoyage in five easy steps: Head over to
            the MakeMyTrip flight booking page, Enter your departure and arrival
            destinations, Select your air travel dates, Choose from our wide
            range of flights based on your airfare preferences, Click on ‘Book
            Now’ and your air flight booking is done. Alternatively, you can
            also use the MakeMyTrip app for your flight ticket booking. Download
            the BonVoyage app, Put in the details i.e. date of journey,
            departure and arrival destinations, travel class of your choice,
            Select on your best comfortable option and click on 'Book Now'.
          </p>
        </div>
        <div>
          <h3 className="fw-bold footer-heading">
            Why Book Holidays with BonVoyage?
          </h3>
          <p className="text-muted footer-para">
            BonVoyage, India's leading online travel company, has a profound
            understanding of Indian consumers travel needs and preferences. It
            offers a wide range of holiday packages in India and across the
            world, catering to various segments of travellers. While the dynamic
            or customized tour and travel packages give consumers an option to
            create and design their own holiday, the fixed departure holiday
            packages have a pre-designed itinerary; thus ensuring there is
            something to meet the holiday needs of every kind of traveller.
          </p>
        </div>
        <div>
          <h3 className="fw-bold footer-heading">
            Can I avail domestic flight offers on BonVoyage?
          </h3>
          <p className="text-muted footer-para">
            Of course, you can. While making domestic flight bookings, you can
            avail any special offer that is active at that time. In accordance
            with the offer selected, a listing of eligible flights would show up
            on your screen. You can then apply the price filter and click on the
            downwards arrow, following which budget-friendly flights would start
            showing up in ascending order from the top (lowest price on top).
          </p>
        </div>
      </div>
      <div className="container-fluid bg-dark p-3 mt-1 mb-1 d-flex justify-content-around">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
            alt="twitter"
            width="40px"
            className="ms-3 icons"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
            alt="Instagram"
            width="40px"
            className="ms-3 icons"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
            alt="Facebook"
            width="40px"
            className="ms-3 icons"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
            alt="Youtube"
            width="40px"
            className="ms-3 icons"
          />
        </div>
        <div>
          <h6 className="text-light">© 2021 BonVoyage PVT. LTD.</h6>
          <p className="text-light mt-0">Country India USA UAE</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
