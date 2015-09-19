                var xcon1=0, ycon1=0, xcon2=200, yon2=150, xend=400, yend=300;
                var a=40, k, interv = null, currentMousePos = { x: -1, y: -1 }, flag=0;
                var c=document.getElementById("string");
                var ctx=c.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(xcon1,ycon1);
                ctx.bezierCurveTo(xcon1, ycon1, xcon2, yon2, xend, yend);   
                ctx.stroke();

                

                $(document).ready(function(){

                      $(document).mousemove(function(event) {
                      currentMousePos.x = event.pageX;
                      currentMousePos.y = event.pageY;

                      if(currentMousePos.x > xcon1 && currentMousePos.x < xend && currentMousePos.y > ycon1 && currentMousePos.y < yend ){
                        if(((currentMousePos.x-xcon1)/(currentMousePos.y-ycon1) >= (xend-xcon1)/(yend-ycon1)) && (flag ==1)){
                           a=40;
                          interv = setInterval(pluck, 50);
                          flag = 0;
                        }
                        else if(((currentMousePos.x - xcon1)/(currentMousePos.y - ycon1) <= (xend-xcon1)/(yend-ycon1)) && (flag ==0)){
                          a=40;
                          interv = setInterval(pluck, 50);
                          flag = 1;
                        }
                        else unpluck;
                      }
                       });

               $('#grow').on('click', function(){
                  growthinterval = setInterval(grow, 20);

                      });
                  });

                  function pluck() {
                        var ycon2=(yend - ycon1)/2;
                        if(a>0) a-=1; 
                        else if(a==0){ 
                          unpluck; 
                         // a=40;
                        } else a+=1;
                        a=a*(-1) ;
                        ycon2+=a;
                        c.width = c.width;
                        ctx.moveTo(xcon1, ycon1);
                        ctx.bezierCurveTo(xcon1, ycon1, xcon2, ycon2, xend, yend);
                        ctx.strokeStyle = '#000000';
                        ctx.stroke();
                      }

                function unpluck() {
                 if(a==0){
                 
                    clearInterval(interv);}
                    a=40;
                }
              
                function grow(){
                      if(yend<=700) yend += 5;
                      else stopgrowth;
                      c.width = c.width;
                      ctx.moveTo(xcon1, ycon1);
                      ycon2 = yend/2;
                      ctx.bezierCurveTo(xcon1, ycon1, xcon2, ycon2, xend, yend);
                      ctx.strokeStyle = '#000000';
                      ctx.stroke();
                }

                function stopgrowth(){
                  clearInterval(growthinterval);
                }
                                
