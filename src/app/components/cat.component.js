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
var CatComponent = (function () {
    function CatComponent() {
        this.drawStyles = [
            { "id": 'line' },
            { "id": 'rectangle' },
            { "id": 'cycle' },
            { "id": 'polyline' },
            { "id": 'polygon' }
        ];
        // console.log(this.timeValue);
    }
    CatComponent.prototype.selectShape = function (shape) {
        app_service_1.AppService.valueShape = shape;
    };
    return CatComponent;
}());
CatComponent = __decorate([
    core_1.Component({
        selector: 'my-cat',
        templateUrl: "./cat.html",
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [])
], CatComponent);
exports.CatComponent = CatComponent;
//# sourceMappingURL=cat.component.js.map