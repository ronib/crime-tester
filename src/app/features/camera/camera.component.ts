import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const scale = 0.25;

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
  constructor(private http: HttpClient) { }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'
      }
    }).then(stream => {
      this.video.nativeElement.srcObject = stream;
    });
  }

  captureImage() {
    const canvas = document.createElement('canvas');
    canvas.width = this.video.nativeElement.videoWidth * scale;
    canvas.height = this.video.nativeElement.videoHeight * scale;
    canvas.getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL();
    /// console.log(base64);
    this.http.post('http://10.9.6.186:9191/api/v1/crimetracer/pushevent', {data:  base64}, {}).subscribe(() => {
      console.log('evidence sent');
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

/*(function() {
  "use strict";

  var video, $output;
  var scale = 0.25;

  var initialize = function() {
    $output = $("#output");
    video = $("#video").get(0);
    $("#capture").click(captureImage);
  };

  var captureImage = function() {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d')
      .drawImage(video, 0, 0, canvas.width, canvas.height);

    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    $output.prepend(img);
  };

  $(initialize);

}());

<video id="video" controls="controls">
    <source src=".mp4" />
</video>

<button id="capture">Capture</button>

<div id="output"></div>
*/
