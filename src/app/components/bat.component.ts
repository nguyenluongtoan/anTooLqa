import { Component, ViewChild, AfterViewInit, ElementRef, HostListener, NgModule, } from '@angular/core';
import {AppService} from '../services/app.service';



@Component({
  selector: 'my-bat',
  templateUrl: `./bat.html`,
  providers: [AppService],

})
export class BatComponent implements AfterViewInit {
    @ViewChild('myCanvas') myCanvas: ElementRef;
    @ViewChild('imageCar') imageCar: ElementRef;

    public context : CanvasRenderingContext2D;
    public element : HTMLImageElement;

    imgWidth: number;
    imgHeight: number;

    currentMousePosX = 0;
    currentMousePosY = 0;
    the1stPointX=0;
    the1stPointY=0;
    the2ndPointX=0;
    the2ndPointY=0;
    e : MouseEvent;

    polys : Poly[];
    recs : Rect[];
    combi : Combination;

    constructor(private serv: AppService){

        this.points=[];
    }

    ngAfterViewInit(){
        console.log("ngAfterViewInit");
        this.element = this.imageCar.nativeElement;
        //this.drawImageBackground();
    }

    afterLoading(){
        console.log("afterLoading");
        console.log(this.imageCar);
        console.log(this.element.width);

        this.imgWidth = this.element.width;
        this.imgHeight = this.element.height;
        console.log(this.imgWidth);
        console.log(this.imgHeight);
        this.context = (<HTMLCanvasElement> this.myCanvas.nativeElement).getContext('2d');
        this.reDraw(this.scale,this.translatePositionX, this.translatePositionY);
        this.recs = [];
        this.combi = new Combination();
    }

    private draw(){
        this.context.beginPath();
        this.context.moveTo(0,0);
        this.context.lineTo(333,111);
        this.context.stroke();
    }

    private mouseMoveInCanvas(e: MouseEvent){
        this.currentMousePosX = e.offsetX;
        this.currentMousePosY = e.offsetY;
        this.the2ndPointX = e.offsetX;
        this.the2ndPointY = e.offsetY;
        if(this.mouseHold){
            this.translatePositionX = e.offsetX - this.startDragOffsetX;
            this.translatePositionY = e.offsetY - this.startDragOffsetY;
            this.reDraw(this.scale,this.translatePositionX, this.translatePositionY);
        }else{
            //this.reDraw(this.scale,0,0);
        }
        //this.reDraw(this.scale,0,0);




        // comment for draw rect
        if(AppService.valueShape == 'rectangle'){
            this.drawRect();
        }
        if(AppService.valueShape == 'polyline'){
            this.drawPolylineZ();
            this.drawPointInSquare();
            this.drawLstPolyLine();
        }
    }

    private reDraw(scale: number, translateX: number, translateY: number){
        this.xoahet();
        this.context.save();
        this.context.translate(translateX, translateY);
        this.context.scale(scale,scale);
        this.context.drawImage(this.element,0,0,this.imgWidth,this.imgHeight);
        this.drawSavedObj();
        this.drawFullLine(this.currentMousePosX,this.currentMousePosY);
        this.context.stroke();
        this.context.restore();
    }

    private drawFullLine (x:number,y:number){
        this.context.beginPath();
        this.context.moveTo(x,0);
        this.context.lineTo(x,2222);
        this.context.moveTo(0,y);
        this.context.lineTo(2222,y);
        this.context.stroke();
    }

    private drawLine (x1:number,y1:number,x2:number,y2:number){
        this.context.beginPath();
        this.context.moveTo(x1,y1);
        this.context.lineTo(x2,y2);

        this.context.stroke();
    }

    private xoahet (){
        this.context.beginPath();
        this.context.clearRect(0, 0, 2222, 2222);
        this.context.stroke();
    }

    private mouseDownInCanvas(e:MouseEvent){
        //
        if(AppService.valueShape == 'rectangle'){
            this.get1stPoint(e);
        }
        if(this.zoomInWhenClick){
            this.zoomInImage();
        }
        if(this.zoomOutWhenClick){
            this.zoomOutImage();
        }
        this.startDragOffsetX = e.offsetX - this.translatePositionX;
        this.startDragOffsetY = e.offsetY - this.translatePositionY;
        this.mouseHold = true;
    }

    private mouseUpInCanvas(e:MouseEvent){
        if(AppService.valueShape == 'rectangle'){
            this.get2ndPoint(e);
        }
        if(AppService.valueShape == 'polyline'){
            this.getNextPoint(e);
        }
        this.mouseHold = false;
    }

    private get1stPoint(e:MouseEvent){
        this.choPhepVe = true;
        this.the1stPointX = e.offsetX;
        this.the1stPointY = e.offsetY;
    }
    private get2ndPoint(e:MouseEvent){
        this.choPhepVe = false;
        this.the2ndPointX = e.offsetX;
        this.the2ndPointY = e.offsetY;
        let rec = {
            the1stPointX: this.the1stPointX, the1stPointY: this.the1stPointY,
            the2ndPointX:this.the2ndPointX, the2ndPointY:this.the2ndPointY
        };
        this.recs.push(rec);
    }

    private getNextPoint(e:MouseEvent){
        this.points.push(e.offsetX);
        this.points.push(e.offsetY);
        console.log(this.points);
    }

    private dontDraw(){
        this.choPhepVe = false;
    }

    choPhepVe: boolean;
    drawPolyline: boolean;
    zoomInWhenClick: boolean;
    zoomOutWhenClick: boolean;
    mouseHold: boolean;
    private drawRect(){
        if(this.choPhepVe){
            let width = this.the2ndPointX-this.the1stPointX;
            let height = this.the2ndPointY-this.the1stPointY;
            this.context.rect(this.the1stPointX, this.the1stPointY, width, height);
            this.context.stroke();
        }
    }
    private drawSavedObj(){
        if(this.recs!=null){
            for (var i = this.recs.length - 1; i >= 0; i--) {
                let width = this.recs[i].the2ndPointX-this.recs[i].the1stPointX;
                let height = this.recs[i].the2ndPointY-this.recs[i].the1stPointY;
                this.context.rect(this.recs[i].the1stPointX,
                    this.recs[i].the1stPointY, width, height);
                this.context.stroke();
            }
        }
        // if(this.polys!=null){
        //     for(var i = this.polys.length - 1; i >= 0; i--){
        //     }
        // }
    }

    points : number[];
    private drawPolylineZ(){

        this.context.beginPath();
        if(this.points.length >=4){
            for (var i = 0; i < this.points.length; i+=2) {
                this.context.moveTo(this.points[i+0],this.points[i+1]);
                this.context.lineTo(this.points[i+2],this.points[i+3]);
            }
        }
        this.context.strokeStyle = '#0000ff';
        this.context.stroke();
        this.context.restore();

    }

    private drawPointInSquare(){
        if(this.points.length >=4){
            for (var i = 0; i < this.points.length; i+=2) {
                this.context.rect(this.points[i]-1, this.points[i+1]-1, 3, 3);
                this.context.strokeStyle = '#ff0000';
                this.context.stroke();
                this.context.restore();
            }
        }
    }

    private drawLstPolyLine(){
        let leng = this.points.length;
        this.drawLine(this.points[leng -2],this.points[leng -1],
            this.currentMousePosX,this.currentMousePosY);

    }



    @HostListener('document:keyup', ['$event'])
    onKeyUp(ev:KeyboardEvent) {
        console.log(`onKeyUp ${ev.key}!`);
        this.combi.pop(ev.key);
        if(ev.key == 'z'){
            this.drawPolyline = true;
            console.log(this.drawPolyline);
        }
        if(ev.key == 'x'){
            this.drawPolyline = false;
             console.log(this.drawPolyline);
        }if(ev.key == 'c'){
            this.zoomInWhenClick = true;
            this.zoomOutWhenClick = false;
        }
        if(ev.key == 'v'){
            this.zoomOutWhenClick = true;
            this.zoomInWhenClick = false;
        }
        if(ev.key == 'b'){
            this.zoomInWhenClick = this.zoomOutWhenClick = false;
        }
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(ev:KeyboardEvent) {
        console.log(`onKeyDown ${ev.key}!`);
        this.combi.pus(ev.key + "");
    }

    scale: number = 1.0;
    scaleMultiplier = 0.9;
    translatePositionX: number = 0;
    translatePositionY: number = 0;
    startDragOffsetX: number = 0;
    startDragOffsetY: number = 0;
    private zoomInImage(){
        this.scale *= this.scaleMultiplier;
        this.reDraw(this.scale, this.translatePositionX, this.translatePositionY);
    }
    private zoomOutImage(){
        this.scale /= this.scaleMultiplier;
        this.reDraw(this.scale, this.translatePositionX, this.translatePositionY);
    }
}

export class Rect {
    the1stPointX:number; the1stPointY:number;
        the2ndPointX:number; the2ndPointY:number;
}
export class Poly {
    points: number[];
}

export class Combination{
    datas: string[];
    constructor(){
        this.datas = [];
    }
    public pus(value: string){
        this.datas.push(value);
    }
    public pop(value: string){
        for (var i = this.datas.length - 1; i >= 0; i--) {
            if(this.datas[i] == value){
                this.datas.splice(i,1);
            }
        }
    }
}