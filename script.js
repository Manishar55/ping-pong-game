//few events are there which executed once the dom load
//eg: DOMContentLoaded:
// The DOMContentLoaded event fires when the HTML document has been completely parsed,
// and all deferred scripts have downloaded and executed. It doesn't wait for other things 
//like images, subframes, and async scripts to finish loading.

document.addEventListener("DOMContentLoaded", ()=>{
    let table =document.getElementById("ping-pong-table")
    let ball =document.getElementById("ball");  //targetting the ball element
    let paddle =document.getElementById("paddle"); //targetting the paddle element
    let aipaddle =document.getElementById("aipaddle");
    //here the ballX and ballY will be helping us to set a starting point of ball w.r.t table


    let userscore=document.getElementById("userscore");
    let aiscore=document.getElementById("aiscore");

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



        let ballTop=ball.offsetTop;
        let ballBottom=ball.offsetTop+ball.offsetHeight;
        let ballLeft=ball.offsetLeft;
        let ballRight=ball.offsetLeft+ball.offsetWidth;

        let paddleTop=paddle.offsetTop;
        let paddleBottom=paddle.offsetTop+paddle.offsetHeight;
        let paddleLeft=paddle.offsetLeft;
        let paddleRight=paddle.offsetLeft+paddle.offsetWidth;


        let aipaddleTop=aipaddle.offsetTop;
        let aipaddleBottom=aipaddle.offsetTop+aipaddle.offsetHeight;
        let aipaddleLeft=aipaddle.offsetLeft;
        let aipaddleRight=paddle.offsetLeft+aipaddle.offsetWidth;



        //collision of ball and paddle (added paddle collision logic)
        // if(ballX <= paddle.offsetLeft + paddle.offsetWidth && 
        //     ballY >= paddle.offsetTop &&
        //     ballY + ball.offsetHeight <= paddle.offsetTop + paddle.offsetHeight
        //     // ballY >= paddle.offsetTop &&
        //     // ballY<=paddle.offsetTop+paddle.offsetHeight
        //     ) {
        //         dx*=-1;              
        //     }

            //ballX < paddle.offsetLeft + paddle.offsetWidth =>left(wrt table) of ball < right(wrt table) of the paddle
            //ballY > paddle.offsetTop => if top(wrt table) of ball > top(wrt table) of paddle
            //ballY + ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight
            //ballY + ball.offsetHeight =>bottom of the ball
            //paddle.offsetTop + paddle.offsetHeight => bottom of paddle



        if(ballBottom>=paddleTop &&
            ballTop<=paddleBottom &&
            ballLeft<=paddleRight)
            {
                dx*=-1;
               
            }

        if(ballBottom>=aipaddleTop+2 &&
           ballTop<=aipaddleBottom+2 &&
           ballRight>=aipaddleLeft+2)
            {
                dx*=-1;
                
            }

        // if(ballX > 700-20 || ballX <= 0) dx*=-1;
        // if(ballY > 400-20 || ballY <= 0) dy*=-1;

        //js will not directly get the width of the table altough we have already set
        //table.style.width => table.offsetWidth(700)
        //table.style.Height => table.offsetHeight(400)


        if(ballX >= table.offsetWidth - ball.offsetWidth){
            reset();
            userscore.innerHTML=parseInt(userscore.innerHTML)+1;
        } 
        if(ballX <= 0) {
            reset();
            aiscore.innerHTML=parseInt(aiscore.innerHTML)+1;
        }
        
        if(ballY >= table.offsetHeight - ball.offsetHeight || ballY <= 0) dy*=-1; //change in y-direction


    },5);

    function  reset(){
        ballX=450;
        ballY=250;
    }

    let paddleY=0;
    let dpY=5; //displacement for paddle in Y direction
    let aipaddleY=0;
    let aidpY=5;
    document.addEventListener("keydown", (event)=>{

        event.preventDefault(); //prevents the execution of the default behaviour //prevents scrolling of the page

        if(event.keyCode==38 && paddleY>0){
            //up arrow is pressed
            paddleY+=(-1)*dpY;
            console.log("up", paddleY);
        }
        else if(event.keyCode==37 && aipaddleY>0){
            //up arrow is pressed
            aipaddleY+=(-1)*aidpY;
            console.log("up", aipaddleY);
        }
        else if(event.keyCode==40 && paddleY < table.offsetHeight - paddle.offsetHeight){
            //down arrow
            paddleY+=dpY;
        }
        else if(event.keyCode==39 && aipaddleY < table.offsetHeight - aipaddle.offsetHeight){
            //down arrow
            aipaddleY+=aidpY;
        }
        aipaddle.style.top=`${aipaddleY}px`;

        paddle.style.top=`${paddleY}px`;

    });

   
    //Adding paddle movement by the mouse
    document.addEventListener("mousemove", (event)=>{
        if(event.clientX < table.offsetLeft+(table.offsetWidth/2)){
            let mouseMoseDistanceFromTop = event.clientY; //this is the distance of the mouse point from the top the screen
            let distanceOfTableFromTop=table.offsetTop;
            
            let mousePointControl=mouseMoseDistanceFromTop-distanceOfTableFromTop-paddle.offsetHeight/2;
            paddleY=mousePointControl;
    
            //if bottom of the paddle touches bottom of the table then return 
            if(paddleY <= 0 || paddleY > table.offsetHeight - paddle.offsetHeight)
            return;
            paddle.style.top=`${paddleY}px`;
    
        }
        else{
            let mouseMoseDistanceFromTop = event.clientY; //this is the distance of the mouse point from the top the screen
            let distanceOfTableFromTop=table.offsetTop;
            
            let mousePointControl=mouseMoseDistanceFromTop-distanceOfTableFromTop-aipaddle.offsetHeight/2;
            aipaddleY=mousePointControl;
    
            //if bottom of the paddle touches bottom of the table then return 
            if(aipaddleY <= 0 || aipaddleY > table.offsetHeight - aipaddle.offsetHeight)
            return;
            aipaddle.style.top=`${aipaddleY}px`;
        }

       
    })

});







        //-------------------------------------------
        
        // if (ballY > table.clientHeight - 20 || ballY < 0 ) {
        //     dy*=-1;
        //   }
        //   if (ballX < 0) {
        //     if (
        //         ballBottom>=paddleTop &&
        //     ballTop<=paddleBottom &&
        //     ballLeft<=paddleRight) {
        //         dx*=-1;
        //     } else {
        //       //player2Score++;
        //       aiscore.innerHTML=parseInt(aiscore.innerHTML)+1;
        //       reset();
        //     }
        //   }
  
        //   if (ballX > table.clientWidth - 20) {
        //     if (ballBottom>=aipaddleTop+2 &&
        //         ballTop<=aipaddleBottom+2 &&
        //         ballRight>=aipaddleLeft+2) {
        //         dx*=-1;
        //     } else {
        //       //player1Score++;
        //       userscore.innerHTML=parseInt(userscore.innerHTML)+1;
        //       reset();
        //     }
        //   }
        // /-------------------------------