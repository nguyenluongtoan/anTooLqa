"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var CreditCardMaskPipe = (function () {
    function CreditCardMaskPipe() {
    }
    CreditCardMaskPipe.prototype.transform = function (plainCreditCard) {
        var visibleDigits = 4;
        var maskedSection = plainCreditCard.slice(0, -visibleDigits);
        var visibleSection = plainCreditCard.slice(-visibleDigits);
        return maskedSection.replace(/./g, '*') + visibleSection;
    };
    return CreditCardMaskPipe;
}());
CreditCardMaskPipe = __decorate([
    core_1.Pipe({
        name: 'creditCardMask'
    })
], CreditCardMaskPipe);
exports.CreditCardMaskPipe = CreditCardMaskPipe;
//# sourceMappingURL=credit-card-mask.pipe.js.map