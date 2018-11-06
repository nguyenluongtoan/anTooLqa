"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var app_service_1 = require("../services/app.service");
var BatComponent = (function () {
    function BatComponent(serv) {
        this.serv = serv;
        this.currentMousePosX = 0;
        this.currentMousePosY = 0;
        this.the1stPointX = 0;
        this.the1stPointY = 0;
        this.the2ndPointX = 0;
        this.the2ndPointY = 0;
        this.scale = 1.0;
        this.scaleMultiplier = 0.9;
        this.translatePositionX = 0;
        this.translatePositionY = 0;
        this.startDragOffsetX = 0;
        this.startDragOffsetY = 0;
        this.points = [];
    }
    BatComponent.prototype.ngAfterViewInit = function () {
        console.log("ngAfterViewInit");
        this.element = this.imageCar.nativeElement;
        //this.drawImageBackground();
    };
    BatComponent.prototype.afterLoading = function () {
        console.log("afterLoading");
        console.log(this.imageCar);
        console.log(this.element.width);
        this.imgWidth = this.element.width;
        this.imgHeight = this.element.height;
        console.log(this.imgWidth);
        console.log(this.imgHeight);
        this.context = this.myCanvas.nativeElement.getContext('2d');
        this.reDraw(this.scale, this.translatePositionX, this.translatePositionY);
        //this.reDraw(1,0,0);
        this.recs = [];
        this.combi = new Combination();
    };
    BatComponent.prototype.draw = function () {
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(333, 111);
        this.context.stroke();
    };
    BatComponent.prototype.mouseMoveInCanvas = function (e) {
        this.currentMousePosX = e.offsetX;
        this.currentMousePosY = e.offsetY;
        this.the2ndPointX = e.offsetX;
        this.the2ndPointY = e.offsetY;
        if (this.mouseHold) {
            this.translatePositionX = e.offsetX - this.startDragOffsetX;
            this.translatePositionY = e.offsetY - this.startDragOffsetY;
            this.reDraw(this.scale, this.translatePositionX, this.translatePositionY);
        }
        else {
        }
        //this.reDraw(this.scale,0,0);
        // comment for draw rect
        if (app_service_1.AppService.valueShape == 'rectangle') {
            this.drawRect();
        }
        if (app_service_1.AppService.valueShape == 'polyline') {
            this.drawPolylineZ();
            this.drawPointInSquare();
            this.drawLstPolyLine();
        }
    };
    BatComponent.prototype.reDraw = function (scale, translateX, translateY) {
        this.xoahet();
        this.context.save();
        this.context.translate(translateX, translateY);
        this.context.scale(scale, scale);
        this.context.drawImage(this.element, 0, 0, this.imgWidth, this.imgHeight);
        this.drawSavedObj();
        this.drawFullLine(this.currentMousePosX, this.currentMousePosY);
        this.context.stroke();
        this.context.restore();
    };
    BatComponent.prototype.drawFullLine = function (x, y) {
        this.context.beginPath();
        this.context.moveTo(x, 0);
        this.context.lineTo(x, 2222);
        this.context.moveTo(0, y);
        this.context.lineTo(2222, y);
        this.context.stroke();
    };
    BatComponent.prototype.drawLine = function (x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    };
    BatComponent.prototype.xoahet = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, 2222, 2222);
        this.context.stroke();
    };
    BatComponent.prototype.mouseDownInCanvas = function (e) {
        //
        if (app_service_1.AppService.valueShape == 'rectangle') {
            this.get1stPoint(e);
        }
        if (this.zoomInWhenClick) {
            this.zoomInImage();
        }
        if (this.zoomOutWhenClick) {
            this.zoomOutImage();
        }
        this.startDragOffsetX = e.offsetX - this.translatePositionX;
        this.startDragOffsetY = e.offsetY - this.translatePositionY;
        this.mouseHold = true;
    };
    BatComponent.prototype.mouseUpInCanvas = function (e) {
        if (app_service_1.AppService.valueShape == 'rectangle') {
            this.get2ndPoint(e);
        }
        if (app_service_1.AppService.valueShape == 'polyline') {
            this.getNextPoint(e);
        }
        this.mouseHold = false;
    };
    BatComponent.prototype.get1stPoint = function (e) {
        this.choPhepVe = true;
        this.the1stPointX = e.offsetX;
        this.the1stPointY = e.offsetY;
    };
    BatComponent.prototype.get2ndPoint = function (e) {
        this.choPhepVe = false;
        this.the2ndPointX = e.offsetX;
        this.the2ndPointY = e.offsetY;
        var rec = {
            the1stPointX: this.the1stPointX, the1stPointY: this.the1stPointY,
            the2ndPointX: this.the2ndPointX, the2ndPointY: this.the2ndPointY
        };
        this.recs.push(rec);
    };
    BatComponent.prototype.getNextPoint = function (e) {
        this.points.push(e.offsetX);
        this.points.push(e.offsetY);
        console.log(this.points);
    };
    BatComponent.prototype.dontDraw = function () {
        this.choPhepVe = false;
    };
    BatComponent.prototype.drawRect = function () {
        if (this.choPhepVe) {
            var width = this.the2ndPointX - this.the1stPointX;
            var height = this.the2ndPointY - this.the1stPointY;
            this.context.rect(this.the1stPointX, this.the1stPointY, width, height);
            this.context.stroke();
        }
    };
    BatComponent.prototype.drawSavedObj = function () {
        if (this.recs != null) {
            for (var i = this.recs.length - 1; i >= 0; i--) {
                var width = this.recs[i].the2ndPointX - this.recs[i].the1stPointX;
                var height = this.recs[i].the2ndPointY - this.recs[i].the1stPointY;
                this.context.rect(this.recs[i].the1stPointX, this.recs[i].the1stPointY, width, height);
                this.context.stroke();
            }
        }
        // if(this.polys!=null){
        //     for(var i = this.polys.length - 1; i >= 0; i--){
        //     }
        // }
    };
    BatComponent.prototype.drawPolylineZ = function () {
        this.context.beginPath();
        if (this.points.length >= 4) {
            for (var i = 0; i < this.points.length; i += 2) {
                this.context.moveTo(this.points[i + 0], this.points[i + 1]);
                this.context.lineTo(this.points[i + 2], this.points[i + 3]);
            }
        }
        this.context.strokeStyle = '#0000ff';
        this.context.stroke();
        this.context.restore();
    };
    BatComponent.prototype.drawPointInSquare = function () {
        if (this.points.length >= 4) {
            for (var i = 0; i < this.points.length; i += 2) {
                this.context.rect(this.points[i] - 1, this.points[i + 1] - 1, 3, 3);
                this.context.strokeStyle = '#ff0000';
                this.context.stroke();
                this.context.restore();
            }
        }
    };
    BatComponent.prototype.drawLstPolyLine = function () {
        var leng = this.points.length;
        this.drawLine(this.points[leng - 2], this.points[leng - 1], this.currentMousePosX, this.currentMousePosY);
    };
    BatComponent.prototype.onKeyUp = function (ev) {
        console.log("onKeyUp " + ev.key + "!");
        this.combi.pop(ev.key);
        if (ev.key == 'z') {
            this.drawPolyline = true;
            console.log(this.drawPolyline);
        }
        if (ev.key == 'x') {
            this.drawPolyline = false;
            console.log(this.drawPolyline);
        }
        if (ev.key == 'c') {
            this.zoomInWhenClick = true;
            this.zoomOutWhenClick = false;
        }
        if (ev.key == 'v') {
            this.zoomOutWhenClick = true;
            this.zoomInWhenClick = false;
        }
        if (ev.key == 'b') {
            this.zoomInWhenClick = this.zoomOutWhenClick = false;
        }
    };
    BatComponent.prototype.onKeyDown = function (ev) {
        console.log("onKeyDown " + ev.key + "!");
        this.combi.pus(ev.key + "");
    };
    BatComponent.prototype.zoomInImage = function () {
        this.scale *= this.scaleMultiplier;
        this.reDraw(this.scale, this.translatePositionX, this.translatePositionY);
        //this.reDraw(1,0,0);
    };
    BatComponent.prototype.zoomOutImage = function () {
        this.scale /= this.scaleMultiplier;
        this.reDraw(this.scale, this.translatePositionX, this.translatePositionY);
        //this.reDraw(1,0,0);
    };
    return BatComponent;
}());
__decorate([
    core_1.ViewChild('myCanvas'),
    __metadata("design:type", core_1.ElementRef)
], BatComponent.prototype, "myCanvas", void 0);
__decorate([
    core_1.ViewChild('imageCar'),
    __metadata("design:type", core_1.ElementRef)
], BatComponent.prototype, "imageCar", void 0);
__decorate([
    core_1.HostListener('document:keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], BatComponent.prototype, "onKeyUp", null);
__decorate([
    core_1.HostListener('document:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], BatComponent.prototype, "onKeyDown", null);
BatComponent = __decorate([
    core_1.Component({
        selector: 'my-bat',
        templateUrl: "./bat.html",
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], BatComponent);
exports.BatComponent = BatComponent;
var Rect = (function () {
    function Rect() {
    }
    return Rect;
}());
exports.Rect = Rect;
var Poly = (function () {
    function Poly() {
    }
    return Poly;
}());
exports.Poly = Poly;
var Combination = (function () {
    function Combination() {
        this.datas = [];
    }
    Combination.prototype.pus = function (value) {
        this.datas.push(value);
    };
    Combination.prototype.pop = function (value) {
        for (var i = this.datas.length - 1; i >= 0; i--) {
            if (this.datas[i] == value) {
                this.datas.splice(i, 1);
            }
        }
    };
    return Combination;
}());
exports.Combination = Combination;
//# sourceMappingURL=bat.component.js.map