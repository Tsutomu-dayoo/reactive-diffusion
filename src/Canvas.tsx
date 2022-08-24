import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import './Canvas.css';
import { Cell } from './cell'
import { clear } from "console";
import { createTextChangeRange } from "typescript";

const width = 500;
const height = 500;
const cell_size = 1;
const cell_length = 100;

const SQUARE_SIZE = 50;
const square_start = width / 2 - SQUARE_SIZE /2;
const square_end = width / 2 + SQUARE_SIZE /2;

const uMax = 7.5;
const vMax = 10.0;

const STEP = 5000;

const cells = Array(width).fill(null).map(row => new Array(height).fill(null))

const initialization = () =>{
    
    for(let x=0; x<width; x++){
        for(let y=0; y<height; y++){
            let cell = new Cell();
            cells[x][y] = cell;
        }
    }
    for(let x=0; x<width; x++){
        for(let y=0; y<height; y++){
            cells[x][y].neighbor.push(cells[x][Math.max(0, y-1)])
            cells[x][y].neighbor.push(cells[Math.min(x+1, width-1)][y])
            cells[x][y].neighbor.push(cells[x][Math.min(height-1, y+1)])
            cells[x][y].neighbor.push(cells[Math.max(x-1, 0)][y])
        }
    }
    for(let x=square_start; x<(SQUARE_SIZE+square_start); x++){
        for(let y=square_start; y<(SQUARE_SIZE+square_start); y++){
            cells[x][y].u = 0.5;
            cells[x][y].v = 0.25;
            console.log("x: " + x + ", y: " + y + ", u: " + cells[x][y].u)
        }
    }
        

}

const update = () =>{
    const dt = 0.1
    for(let x=0; x<width; x++){
        for(let y=0; y<height; y++){
            cells[x][y].reacted();
            cells[x][y].spreaded();
        }
    }
    for(let x=0; x<width; x++){
        for(let y=0; y<height; y++){
            let c = cells[x][y];
            //cells[x][y].sum_result();
            cells[x][y].u = c.u + dt * (c.u_spreaded + c.u_reacted);
            cells[x][y].v = c.v + dt * (c.v_spreaded + c.v_reacted);

            console.log("x: " + x + ", y: " + y + ", u: " + cells[x][y].u)
    }
}

}

const style = {
    border: '1px solid black',
    backgroundColor: 'white',
  };

const Canvas = () => {
    const canvasRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const getContext = (): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;

        return canvas.getContext('2d');
    };
    
    //初期化処理
    useEffect(()=>{
        const ctx: CanvasRenderingContext2D = getContext();
        initialization();
        for(let x=0; x<width; x++){
            for(let y=0; y<height; y++){
                let c = cells[x][y];
                let r = (c.u/uMax)*255;
                let b = (c.v/vMax)*255;
                ctx.fillStyle='rgb(' + r + ',' + r + ',' + b + ')';
                ctx.rect(x,y,1,1);
            }
        }
        setLoaded(true);
        ctx.fill();
    });
    
    let count = 0;
    useEffect(()=>{
        const ctx: CanvasRenderingContext2D = getContext();
        while(loaded){
            update();
            for(let x=0; x<width; x++){
                for(let y=0; y<height; y++){
                    let c = cells[x][y];
                    let r = (c.u/uMax)*255;
                    let b = (c.v/vMax)*255;
                    ctx.fillStyle='rgb(' + r + ',' + r + ',' + b + ')';
                    ctx.rect(x,y,1,1);
                }
            }
            ctx.fill();
            count++;
            if(count>STEP){
                setLoaded(false);
            }
        }
    });
    
    return(
        <div>
            <canvas
                width={width} 
                height={height} 
                ref={canvasRef}
                id="canvas" 
                style={style}
                />
        </div>
        
    );
}


export default Canvas;