import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    @ViewChild('slideWithNav', {static: false}) slideWithNav;
    @ViewChild('slideWithNav2', {static: false}) slideWithNav2;
    @ViewChild('slideWithNav3', {static: false}) slideWithNav3;

    sliderOne: any;
    sliderTwo: any;
    sliderThree: any;


    // Configuration for each Slider
    slideOpts = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay: true
    };

    constructor(
    ) {
      // Item object for Nature
      this.sliderOne = {
          isBeginningSlide: true,
          isEndSlide: false,
          slidesItems: [
            {
              id: 1,
              image: './assets/img/1.jpg'
            },
            {
              id: 2,
              image: './assets/img/2.jpg'
            },
            {
              id: 3,
              image: './assets/img/3.jpg'
            }
          ]
        };
      // Item object for Food
      this.sliderTwo = {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            image: './assets/img/1.jpg'
          },
          {
            id: 2,
            image: './assets/img/2.jpg'
          },
          {
            id: 3,
            image: './assets/img/3.jpg'
          }
        ]
      };
      // Item object for Fashion
      this.sliderThree = {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            image: './assets/img/1.jpg'
          },
          {
            id: 2,
            image: './assets/img/2.jpg'
          },
          {
            id: 3,
            image: './assets/img/3.jpg'
          }
        ]
      };
    }

    // Move to Next slide
    slideNext(object, slideView) {
      slideView.slideNext(500).then(() => {
        this.checkIfNavDisabled(object, slideView);
      });
    }

    // Move to previous slide
    slidePrev(object, slideView) {
      slideView.slidePrev(500).then(() => {
        this.checkIfNavDisabled(object, slideView);
      });
    }

    // Method called when slide is changed by drag or navigation
    SlideDidChange(object, slideView) {
      this.checkIfNavDisabled(object, slideView);
    }

    // Call methods to check if slide is first or last to enable disbale navigation
    checkIfNavDisabled(object, slideView) {
      this.checkisBeginning(object, slideView);
      this.checkisEnd(object, slideView);
    }

    checkisBeginning(object, slideView) {
      slideView.isBeginning().then((istrue) => {
        object.isBeginningSlide = istrue;
      });
    }
    checkisEnd(object, slideView) {
      slideView.isEnd().then((istrue) => {
        object.isEndSlide = istrue;
      });
    }

  ngOnInit() {
  }

}
