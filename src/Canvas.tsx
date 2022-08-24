import { useEffect, useRef } from "react";
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
//描画
const draw = () =>{

}

const Canvas = () => {
    const canvasRef = useRef(null);

    const getContext = (): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;

        return canvas.getContext('2d');
    };

    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        ctx.fillRect(0,0, width, height);
        ctx.save();

        ctx.fillStyle = 'rgb(255, 165, 0)';
        ctx.fillRect(square_start, square_start, SQUARE_SIZE, SQUARE_SIZE);
        ctx.save();
    }, [])

    return(
        <div>
            <canvas width={width} height={height} id="canvas" className=".canvas-border" ref={canvasRef}></canvas>
        </div>
        
    );
}

export default Canvas;