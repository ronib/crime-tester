import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  @ViewChild('camera', {static: true}) video;
  blur: boolean;
  sepia: boolean;
  invert: boolean;
  flip: boolean;
  constructor() { }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'
      }
    }).then(stream => {
      this.video.nativeElement.srcObject = stream;
    });
  }

  videoStyle() {
    let filter = '';
    let transform = '';
    if (this.blur) {
      filter += 'blur(5px)';
    }

    if (this.sepia) {
      filter += 'sepia(60%)';
    }

    if (this.invert) {
      filter += 'invert(1)';
    }

    if (this.flip) {
      transform += 'scaleX(-1)';
    }

    return {
      filter,
      transform
    };
  }

}
