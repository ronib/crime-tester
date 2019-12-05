import {Component, Input, OnInit} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carusal',
  templateUrl: './carusal.component.html',
  styleUrls: ['./carusal.component.scss']
})
export class CarusalComponent implements OnInit {

  @Input() items?: any;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
    config.interval = 60000;
  }

  ngOnInit() {
  }

}


