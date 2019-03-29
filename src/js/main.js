import $ from 'jquery';
import 'slick-carousel';
import 'bootstrap-select';
import './form.js';
import './humb_icon.js';

let slick1 = $('.slick-card-1'); 

slick1.slick({
   centerMode: true,
   arrows: true,
   initialSlide: 1, 
   slidesToShow: 3,
   infinite: true,
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

$('.slick-card-1 .slick-slide').css('opacity','0.3');

      let slick1_center = $('.slick-card-1 .slick-center'); 
if($(window).width() > 992) {
      slick1_center.css('opacity','1');
      slick1_center.next().css('opacity','1');
      slick1_center.prev().css('opacity','1'); 
}       
else {  if($(window).width() > 576) {
          slick1_center.css('opacity','1');
          slick1_center.prev().css('opacity','1'); 
        }
        else {
          $('.slick-card-1 .slick-slide').css('opacity','1');
        }
}

slick1.on('afterChange', function(event, slick, currentSlide){
  if($(window).width() > 992) {
    $('.slick-card-1 .slick-slide').css('opacity','0.3');
      let slick1_center = $('.slick-card-1 .slick-center');  
      slick1_center.css('opacity','1');
      slick1_center.next().css('opacity','1');
      slick1_center.prev().css('opacity','1');
  }
  else {  if($(window).width() > 576) {
            $('.slick-card-1 .slick-slide').css('opacity','0.3');
            let slick1_center = $('.slick-card-1 .slick-center');  
            slick1_center.css('opacity','1');
            slick1_center.prev().css('opacity','1');
          }
          else {
            $('.slick-card-1 .slick-slide').css('opacity','1');
          } 
  }
});

// SELECT
$('.js-select').selectpicker();
