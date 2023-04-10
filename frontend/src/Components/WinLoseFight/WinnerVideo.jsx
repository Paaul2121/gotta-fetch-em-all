import { useRef, useEffect } from "react"

export default function WinnerVideo(props){

    const boxRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null)

    

     
    useEffect(()=>{
       let width = videoRef.current.clientWidth;
       let height = videoRef.current.clientHeight;

       canvasRef.current.setAttribute("height", height)
        const ctx = canvasRef.current.getContext("2d");
       
        videoRef.current.addEventListener("play",drawVid)

      videoRef.current.style.visibility = "hidden";
       

      canvasRef.current.style.color = "rgb(15, 135, 14)"
        
        function drawVid(){
            ctx.drawImage(videoRef.current,0,0,width,height);

            let frame = ctx.getImageData(0,0,width,height);
            for(let i=0; i<frame.data.length; i+=4){
                let r = frame.data[i];
                let g = frame.data[i+1];
                let b = frame.data[i+2];
                if( r>=0 && r<= 130 && g>= 61 && g<= 230 && b>=0 && b<=70){
                    frame.data[i+3] = 0
                }
            }
            ctx.putImageData(frame,0,0);


            requestAnimationFrame(drawVid)
        }
        
      
        
        console.log(videoRef.current)
    },[])


    return(
        <>
        <video ref={videoRef} id="WinnerVideo" src="../../public/images/WinnerVideo.mp4" controls autoPlay width="700"></video>
        <div className="box" ref={boxRef}>
             <canvas className="canvaVideo" ref={canvasRef} width="700"></canvas>
        </div>
        <div className="winOrLoseMessage">CONGRATULATIONS! YOU GAINED {props.xp} XP AND MONEY !!!!</div>
        </>
    )
}