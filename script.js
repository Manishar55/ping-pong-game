//few events are there which executed once the dom load
//eg: DOMContentLoaded:
// The DOMContentLoaded event fires when the HTML document has been completely parsed,
// and all deferred scripts have downloaded and executed. It doesn't wait for other things 
//like images, subframes, and async scripts to finish loading.

document.addEventListener("DOMContentLoaded", ()=>{
    let table =document.getElementById("ping-pong-table")
    let ball =document.getElementById("ball");  //targetting the ball element
    let paddle =document.getElementById("paddle"); //targetting the paddle element

    //here the ballX and ballY will be helping us to set a starting point of ball w.r.t table

    let ballX=50; //distance of the top of the ball w.r.t ping pong table
    let ballY=50; //distance of the top of the ball w.r.t ping pong table


    let dx=2; //displacement factor in x-direction, 2-> you will displace by 2px in +x direction
                                                 //-2-> you will displace by 2px in -x direction

    let dy=2; //displacement factor in y-direction, 2-> you will displace by 2px in +y direction
                                                 //-2-> you will displace by 2px in -y direction

    ball.style.left=`${ballX}px` ;  
    ball.style.top=`${ballY}px` ;  
    setInterval(function exec(){

        ballX+=dx; //after every 1 mili second increment ballX by the dx (i.e 2px)
        ballY+=dy;

        ball.style.left=`${ballX}px`; //update the left of the ball 
        ball.style.top=`${ballY}px`; //update the top of the ball 

        // if(ballX > 700-20 || ballX <= 0) dx*=-1;
        // if(ballY > 400-20 || ballY <= 0) dy*=-1;

        //js will not directly get the width of the table altough we have already set
        //table.style.width => table.offsetWidth(700)
        //table.style.Height => table.offsetHeight(400)


        if(ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) dx*=-1; //change in x-direction
        if(ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) dy*=-1; //change in y-direction


    },1);

    let paddleY=0;
    let dpY=5; //displacement for paddle in Y direction
    document.addEventListener("keydown", (event)=>{
        if(event.keyCode==38 && paddleY>0){
            //up arrow is pressed
            paddleY+=(-1)*dpY;
            console.log("up", paddleY);
        }
        else if(event.keyCode==40 && paddleY < table.offsetHeight - paddle.offsetHeight){
            //down arrow
            paddleY+=dpY;
        }
        paddle.style.top=`${paddleY}px`;
    })

    
});
