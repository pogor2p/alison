import $ from 'jquery';
import 'slick-carousel';

$('.slick-card-1').slick({
   centerMode: true,
   arrows: true,
   initialSlide: 1, 
   slidesToShow: 3,
   infinite: false,
   centerMode: true, 
   centerPadding: '0px',

   responsive: [
       {
          breakpoint: 992,
          settings: {
            arrows: true,
            initialSlide: 1,
            slidesToShow: 2,
            infinite: true
          } 
       },
       {
       breakpoint: 576,
       settings: {
           arrows: false,
           initialSlide: 0,
           slidesToShow: 1,
           infinite: true,
           centerPadding: '60px'
           }
       },
       {
       breakpoint: 480,
        settings: {
        arrows: false,
        initialSlide: 0,
        slidesToShow: 1,
        infinite: true,
        centerPadding: '20px'
          }
       },
       {
       breakpoint: 400,
       settings: {
        arrows: false,
        initialSlide: 0,
        slidesToShow: 1,
        infinite: true,
        centerPadding: '0px'
          }
       }
   ]
  });

$('.slick-card-2').slick({
   centerMode: true,
   arrows: true,
   dots: true,
   centerPadding: '0px',
   initialSlide: 1,
   slidesToShow: 3,
   infinite: false, 
   centerMode: true,
   centerPadding: '0px',
   responsive: [
       {
        breakpoint: 992,
        settings: {
           slidesToShow: 2,
        }
       },
       {
       breakpoint: 576,
         settings: {
           arrows: false,
           centerPadding: '60px',
           slidesToShow: 1
         }
       },
       {
       breakpoint: 480,
         settings: {
           arrows: false,
           centerPadding: '20px',
           slidesToShow: 1
         }
       },
       {
       breakpoint: 400,
         settings: {
           arrows: false,
           centerPadding: '0px',
           slidesToShow: 1
         }
       }
   ]
  });

