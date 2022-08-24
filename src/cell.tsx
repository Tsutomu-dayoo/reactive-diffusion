import React from 'react';

let dt = 0.1;
let dx = 0.6;
let Du = 0.02 / (dx*dx);
let Dv = 0.5 / (dx*dx);
let f = 0.022;
let k = 0.051;
const uMax = 7.5;
const vMax = 10.0;

export class Cell{
    result: number[][];
    neighbor: any[];
    u: number;
    v: number;
    u_reacted: number;
    v_reacted: number;
    u_spreaded: number;
    v_spreaded: number;

    constructor(){
        this.result = [];
        this.neighbor = [];
        this.u = 0.0;
        this.v = 0.0;
        this.u_reacted = 0.0;
        this.v_reacted = 0.0;
        this.u_spreaded = 0.0;
        this.v_spreaded = 0.0;
    }

    spreaded(){
        let sum_u = 0.0;
        let sum_v = 0.0;

        this.neighbor.map((nei) =>{
            sum_u += nei.u;
            sum_v += nei.v;
        });
        this.u_spreaded = Du * (sum_u - 4.0 * this.u);
        this.v_spreaded = Dv * (sum_v - 4.0 * this.v);
    }

    reacted(){
        this.u_reacted = this.u * this.u * this.v - (f+k) * this.u;
        this.u_reacted = Math.max(0, Math.min(this.u_reacted, uMax));
        this.v_reacted = -1 * this.u * this.u * this.v + f * (1-k);
        this.v_reacted = Math.max(0, Math.min(this.v_reacted, vMax));
    }

    sum_result(){
        this.u = this.u + dt * (this.u_spreaded + this.u_reacted);
        this.v = this.v + dt * (this.v_spreaded + this.v_reacted);
    }

}
