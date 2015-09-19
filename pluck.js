                var startX=0, startY=0, finalEndX=500, finalEndY=200, currentEndX = 0, currentEndY = 0;
                var controlX=(currentEndX - startX)/2, controlY=(currentEndY - startY)/2;
                var isGrown = false;
                var a=20, k, interv = null, currentMousePos = { x: -1, y: -1 }, flag=0;
                var c=document.getElementById("string");
                var ctx=c.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(startX,startY);
                ctx.bezierCurveTo(startX, startY, controlX, controlY, currentEndX, currentEndY);
                ctx.stroke();

                $(document).ready(function(){

                      $(document).mousemove(function(event) {
                          currentMousePos.x = event.pageX;
                          currentMousePos.y = event.pageY;

                          if(currentMousePos.x > startX && currentMousePos.x < currentEndX && currentMousePos.y > startY && currentMousePos.y < currentEndY ){
                                if(((currentMousePos.x-startX)/(currentMousePos.y-startY) >= (currentEndX-startX)/(currentEndY-startY)) && (flag ==1)){
                                   a=20;
                                  interv = setInterval(pluck, 20);
                                  flag = 0;
                                }
                                else if(((currentMousePos.x - startX)/(currentMousePos.y - startY) <= (currentEndX-startX)/(currentEndY-startY)) && (flag ==0)){
                                  a=20;
                                  interv = setInterval(pluck, 20);
                                  flag = 1;
                                }
                                else unpluck;
                          }
                      });

               $('#grow').on('click', function(){
                  growthinterval = setInterval(grow, 10);

                      });
                  });

                  function pluck() {
                        var controlY = (currentEndY - startY)/2;
                        if(a>0) a-=0.2;
                        else if(a==0){ 
                          unpluck; 
                        } else a+=0.2;
                        a=a*(-1) ;
                        controlY+=a;
                        c.width = c.width;
                        ctx.moveTo(startX, startY);
                        ctx.bezierCurveTo(startX, startY, controlX, controlY, currentEndX, currentEndY);
                        ctx.strokeStyle = '#000000';
                        ctx.stroke();
                      }

                function unpluck() {
                 if(a==0){
                    clearInterval(interv);
                 }
                    a=20;
                }
              
                function grow(){
                    if (isGrown == true) {
                        
                    } else {
                        if (currentEndX < finalEndX) {
                            currentEndX += 5;
                            currentEndY = currentEndX * (finalEndY/finalEndX);
                            
                            controlX = (currentEndX - startX)/2;
                            controlY = (currentEndY - startY)/2;
                        }
                        else {
                            stopgrowth;
                            isGrown = true;
                        }
                        
                        c.width = c.width;
                        ctx.moveTo(startX, startY);
                        ctx.bezierCurveTo(startX, startY, controlX, controlY, currentEndX, currentEndY);
                        ctx.strokeStyle = '#000000';
                        ctx.stroke();
                    }
                }

                function stopgrowth(){
                  clearInterval(growthinterval);
                }
                                
