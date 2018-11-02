import { Component } from '@angular/core';

import {ImageZoomModule} from 'angular2-image-zoom';

import {AppService} from '../services/app.service';

@Component({
  selector: 'my-cat',
  templateUrl: `./cat.html`,
  providers: [AppService],
})
export class CatComponent  {
    timeValue: string ;
    drawStyles: any[] = [
        {"id": 'line'},
        {"id": 'rectangle'},
        {"id": 'cycle'},
        {"id": 'polyline'},
        {"id": 'polygon'}
    ];

    constructor(){
        // console.log(this.timeValue);
    }

    public selectShape(shape: string){

        AppService.valueShape = shape;
    }
}

