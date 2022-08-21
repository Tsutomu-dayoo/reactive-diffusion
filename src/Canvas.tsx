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
    neighbor: number[];
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

    react(){

    }

    spreaded(){
        
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
            <div id="canvas" className="canvas controlls"/>
        </div>
        
    );
}

export default Canvas;