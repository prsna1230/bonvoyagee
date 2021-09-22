import React, { useEffect, useRef } from "react";
import bird1 from "../Img/bird1.png";
import bird2 from "../Img/bird2.png";
import forest from "../Img/forest.png";
import rocks from "../Img/rocks.png";
import water from "../Img/water.png";

function Home() {
  // let text = useRef(null);
  // let bird1id = useRef(null);
  // let bird2id = useRef(null);
  // let forestid = useRef(null);
  // let rocksid = useRef(null);
  // let waterid = useRef(null);
  // let btn = useRef(null);
  // let textstyle = { top: 50 + window.scrollY * -0.5 + "%" };
  let text = document.getElementById("text");
  let bird1id = document.getElementById("bird1");
  let bird2id = document.getElementById("bird2");
  let forestid = document.getElementById("forest");
  let btn = document.getElementById("btn");
  let rocksid = document.getElementById("rocks");
  let waterid = document.getElementById("water");
  useEffect(() => {
    window.addEventListener("scroll", function () {
      let value = window.scrollY;

      text.style.top = 50 + value * -0.5 + "%";
      bird1id.style.top = value * -1.5 + "px";
      bird1id.style.left = value * 2 + "px";
      bird2id.style.top = value * -1.5 + "px";
      bird2id.style.left = value * -5 + "px";
      btn.style.marginTop = value * 1.5 + "px";
      rocksid.style.top = value * -0.12 + "px";
      forestid.style.top = value * 0.25 + "px";
    });
  });

  return (
    // <div className="homebackground">
    //   <div className="runway"></div>
    //   <img
    //     src="https://res.cloudinary.com/dv29qwv3v/image/upload/v1631541512/bonvoyage%20images/airplane_jbbflj.png"
    //     alt="aeroplane"
    //     className="airplane"
    //   />
    // </div>
    <>
      <section>
        <h2 id="text">
          <span>It's time for a new</span>
          <br />
          Adventure
        </h2>

        <img src={bird1} id="bird1" alt="bird" />
        <img src={bird2} id="bird2" alt="bird" />
        <img src={forest} id="forest" alt="" />
        <a href="#" id="btn">
          Explore
        </a>
        <img src={rocks} id="rocks" alt="" />
        <img src={water} id="water" alt="" />
      </section>
      <div class="sec">
        <h2>Parallax Scrolling Effects</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quo nulla
          dolorum. Rerum magni aut, quo at velit nemo expedita enim obcaecati,
          voluptatem perspiciatis ducimus labore nam dolor tempora. Expedita?
        </p>
      </div>
    </>
  );
}

export default Home;
