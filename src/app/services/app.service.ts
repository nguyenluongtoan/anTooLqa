import { Injectable } from '@angular/core';

@Injectable()
export class AppService   {
    constructor(){
    }
    getTime(){
        return `${new Date().getHours()}`;
    }
    static shape: string;

    public static get valueShape() : string {
        return this.shape
    }
    public static set valueShape(v : string) {
        this.shape = v;
    }
}