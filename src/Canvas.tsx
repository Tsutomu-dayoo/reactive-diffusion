import React, { useEffect } from "react";
import p5 from "p5";
import './Canvas.css';
import { clear } from "console";

const width = 500;
const height = 500;
const cell_length = 20;

const cells: any = [];

let dt = 0.1;
let dx = 0.6;
let Du = 0.02 / (dx*dx);
let Dv = 0.5 / (dx*dx);
let f = 0.022;
let k = 0.051;

const SQUARE_SIZE = 50;
const square_start = width / 2 - SQUARE_SIZE /2;
const square_end = width / 2 + SQUARE_SIZE /2;

const uMax = 7.5;
const vMax = 10.0;

class Cell{
    neighbor: any[];
    u: number;
    v: number;
    u_reacted: number;
    v_reacted: number;
    u_spreaded: number;
    v_spreaded: number;

    constructor(){
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

    result(){
        this.u = this.u + dt * (this.u_spreaded + this.u_reacted);
        this.v = this.v + dt * (this.v_spreaded + this.v_reacted);
    }

}

const sketch = (p: p5) =>{
    p.setup = () =>{
        p.createCanvas(width, height).parent('canvas');


        for(let y=0; y<height; y++){
            cells.push([]);
            for(let x=0; x<width; x++){
                const cell = new Cell();
                cells[y].push(cell);
                const c = cells[y][x];
                if((square_start<=y && y<=square_end) && (square_start<=x && x<=square_end)){
                    c.u = 0;
                    c.v = 0;
                }
            }
        }

        // for(let y=0; y<height; y++){
        //     for(let x=0; x<width; x++){
        //         const c = cells[y][x];
        //         c.neighbor.pusu(cells[Math.max(y-1,0)][x]);
        //         c.neighbor.pusu(cells[Math.min(y+1,cell_length-1)][x]);
        //         c.neighbor.pusu(cells[y][Math.max(x-1,0)]);
        //         c.neighbor.pusu(cells[y][Math.min(x+1,cell_length-1)]);
        //     }
        // }
    }

    p.draw = () =>{
        p.background(192,192,192);
        p.scale(5);
        //p.clear(0,0,0,0);

        //描画
        for(let y=0; y<height; y++){
            for(let x=0; x<width; x++){
                const c = cells[y][x];
                const r = (c.u/uMax)*255;
                const b = (c.u/vMax)*255;
                p.stroke(r,r,b);
                p.point(x, y);

            }
        }
    }

}

const Canvas = () => {

    useEffect(() => {
        new p5(sketch)
    }, [])

    return(
        <div>
            <h1>Reactive Deffusion Simulation</h1>
            <canvas id="canvas" width="640" height="480"></canvas>
            {/* <div id="canvas" className="canvas controlls"/> */}
        </div>
        
    );
}

export default Canvas;