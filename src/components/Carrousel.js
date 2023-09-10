import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import nft1 from "../img/carrousel1.webp"
import nft2 from "../img/caroussel2.webp"
import nft3 from "../img/carrousel3.webp"
import nft4 from "../img/carrousel4.webp"

export default function Carrousel() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    return(
        <div className="carousel-container" style={{ width: "80%", margin: '0 auto',display: "block"}}>
        <Slider {...settings}>
          <div >
            <img  style={{ width: "300px", height: "300px", margin: '0 auto',display: "block"}} src={nft1} alt="nft 1" />
          </div>
          <div>
            <img style={{ width: "300px", height: "300px", margin: '0 auto',display: "block"}} src={nft2} alt="nft 2" />
          </div>
          <div>
            <img style={{ width: "300px", height: "300px", margin: '0 auto',display: "block"}} src={nft3} alt="nft 3" />
          </div>
          <div>
            <img style={{ width: "300px", height: "300px", margin: '0 auto',display: "block"}} src={nft4} alt="nft 4" />
          </div>
        </Slider>
      </div>
    )
}