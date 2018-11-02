"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var credit_card_mask_pipe_1 = require("./credit-card-mask.pipe");
var credit_card_service_1 = require("./credit-card.service");
var credit_card_component_1 = require("./credit-card.component");
var CreditCardModule = CreditCardModule_1 = (function () {
    function CreditCardModule() {
    }
    CreditCardModule.forRoot = function () {
        return {
            ngModule: CreditCardModule_1,
            providers: [credit_card_service_1.CreditCardService]
        };
    };
    return CreditCardModule;
}());
CreditCardModule = CreditCardModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [
            credit_card_mask_pipe_1.CreditCardMaskPipe,
            credit_card_component_1.CreditCardComponent
        ],
        exports: [credit_card_component_1.CreditCardComponent]
    })
], CreditCardModule);
exports.CreditCardModule = CreditCardModule;
var CreditCardModule_1;
//# sourceMappingURL=credit-card.module.js.map