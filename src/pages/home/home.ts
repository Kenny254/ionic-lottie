import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  onNextLoopStop: boolean = false;
  loadingStatus: string = 'loading';

  selectedAnimation: any = "interactive";
  animations: any;
  interactive = false;
  anim: any;
  animationSpeed: number = 1;

  interactiveAnimationOption = {
    loop: true,
    prerender: false,
    autoplay: false,
    autoloadSegments: false,
    // path: 'assets/animations/other/jake.json'
    path: 'assets/animations/loading_success_fail/loader-success-failed.json'
  }

  lottieAnimations = [
    {
      path: 'assets/animations/lottie/Watermelon.json'
    }, {
      path: 'assets/animations/lottie/MotionCorpse-Jrcanest.json'
    }, {
      path: 'assets/animations/lottie/TwitterHeart.json'
    }, {
      path: 'assets/animations/lottie/LottieLogo1.json'
    }, {
      path: 'assets/animations/lottie/LottieWalkthrough.json'
    }, {
      path: 'assets/animations/lottie/LottieLogo2.json'
    }, {
      path: 'assets/animations/lottie/9squares-AlBoardman.json'
    },
  ];

  bodymovinAnimations = [
    {
      path: 'assets/animations/bodymovin/gatin.json'
    }, {
      path: 'assets/animations/bodymovin/adrock.json'
    }, {
      path: 'assets/animations/bodymovin/happy2016.json'
    }, {
      path: 'assets/animations/bodymovin/navidad.json'
    }, {
      path: 'assets/animations/bodymovin/bodymovin.json'
    },
  ]

  otherAnimations = [
    {
      path: 'assets/animations/other/tibetan-monk.json'
    }, {
      path: 'assets/animations/other/bobber.json'
    }, {
      path: 'assets/animations/loading_success_fail/loader-success-failed.json'
    }
  ]

  constructor(public navCtrl: NavController) {
    this.changeAnimations();
  }

  handleAnimation(anim) {
    this.anim = anim;
  }

  stop() {
      this.anim.stop();
  }

  play() {
      this.anim.play();
  }

  pause() {
      this.anim.pause();
  }

  setSpeed() {
      this.anim.setSpeed(this.animationSpeed);
  }

  /**
   * loader-success-failed
   *
   * 0 120 loader part1
   * 119 239 loader part 2
   *
   * 238 423 success
   *
   * 418 538 loader part 1
   * 537 657 loader part 2
   *
   * 657 841 error
   */
  /**
   * How to use:
   *  1) We initiate animate to start the anim
   *  2) when done or err we set this.loadingStatus to 'success' or error'
   *     when loader loop ends, il will trigger the succ or err loop and stop
   */
  animate() {
    this.anim.playSegments([[0, 239]], true);
    this.anim.addEventListener("loopComplete", res => {
      console.log('loopComplete...', res)
      if(this.onNextLoopStop) {
        this.anim.stop()
      } else {
        this.triggerNextLoop()
      }
    });

    // debug/test
    setTimeout(() => {
      this.loadingStatus = 'success';
      console.log('success...')
    }, 8000);
  }


  triggerNextLoop() {
    if(this.loadingStatus === 'success') {
      this.anim.playSegments([[238, 423]], true);
      this.onNextLoopStop = true;
    }
    if(this.loadingStatus === 'error') {
      this.anim.playSegments([[657, 841]], true);
      this.onNextLoopStop = true;
    }
  }

  changeAnimations() {
    this.interactive = false;
    switch (this.selectedAnimation) {
      case "lottie":
        this.animations = this.lottieAnimations;
        break;
      case "bodymovin":
        this.animations = this.bodymovinAnimations;
        break;
      case "other":
        this.animations = this.otherAnimations;
        break;
      case "interactive":
        this.interactive = true;
        break;
    }
  }
}
