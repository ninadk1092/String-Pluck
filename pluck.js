var xStart = 100, ystart = 100;
var xEnd = 300, yEnd = 500;
var xCurrent = xStart, yCurrent = ystart;
var slope = 0;
var pluckAmplitude = 20;
var pluckInterval = null;
var growthinterval = null;
var isGrown = false;
var currentMousePos = { x: -1, y: -1 };

var c=document.getElementById("string");
var ctx=c.getContext("2d");

$(document).ready(function(){
                  if (xEnd == xStart) {
                  //Vertical Line
                  
                  } else if (yEnd == ystart) {
                  //Horizontal Line
                  
                  } else {
                  //All other lines
                  slope = (yEnd - ystart)/(xEnd - xStart);
                  }
                  
                  $(document).mousemove(function(event) {
                                        if (currentMousePos.x == -1 && currentMousePos.y == -1) {
                                        currentMousePos.x = event.pageX;
                                        currentMousePos.y = event.pageY;
                                        }
                                        
                                        if (isGrown == true) {
                                        if (xEnd == xStart) {
                                        //Vertical Line
                                        if ((event.pageX >= xStart && currentMousePos.x < xStart) || (event.pageX <= xStart && currentMousePos.x > xStart)) {
                                        clearInterval(pluckInterval);
                                        pluckAmplitude = 20;
                                        pluckInterval = setInterval(pluck, 10);
                                        }
                                        } else if (yEnd == ystart) {
                                        //Horizontal Line
                                        if ((event.pageY >= ystart && currentMousePos.y < ystart) || (event.pageY <= ystart && currentMousePos.y > ystart)) {
                                        clearInterval(pluckInterval);
                                        pluckAmplitude = 20;
                                        pluckInterval = setInterval(pluck, 10);
                                        }
                                        } else {
                                        //All other lines
                                        if (line_intersects(xStart, ystart, xEnd, yEnd, event.pageX, event.pageY, currentMousePos.x, currentMousePos.y) == true) {
                                        clearInterval(pluckInterval);
                                        pluckAmplitude = 20;
                                        pluckInterval = setInterval(pluck, 10);
                                        }
                                        }
                                        currentMousePos.x = event.pageX;
                                        currentMousePos.y = event.pageY;
                                        }
                                        });
                  
                  $('#grow').on('click', function(){
                                growthinterval = setInterval(grow, 10);
                                });
                  
                  });

function line_intersects(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
    
    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;
    s2_y = p3_y - p2_y;
    
    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
    
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        return true;
    }
    
    return false; // No collision
}

function pluck() {
    c.width = c.width;
    ctx.beginPath();
    ctx.moveTo(xStart, ystart);
    
    if (xEnd == xStart) {
        //Vertical Line
        ctx.bezierCurveTo(xStart, ystart, xStart + pluckAmplitude, (ystart + yEnd)/2, xEnd, yEnd);
    } else if (yEnd == ystart) {
        //Horizontal Line
        ctx.bezierCurveTo(xStart, ystart, (xStart + xEnd)/2, ystart + pluckAmplitude, xEnd, yEnd);
    } else {
        //All other lines
        ctx.bezierCurveTo(xStart, ystart, xStart + (xEnd - xStart)/2, ystart + (yEnd - ystart)/2 + pluckAmplitude, xEnd, yEnd);
    }
    
    console.log(pluckAmplitude);
    if (pluckAmplitude > 0) {
        pluckAmplitude -= 0.5;
    } else if (pluckAmplitude < 0) {
        pluckAmplitude += 0.5;
    } else {
        clearInterval(pluckInterval);
        pluckAmplitude = 20;
    }
    pluckAmplitude = pluckAmplitude*-1;
    
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

function grow(){
    ctx.beginPath();
    ctx.moveTo(xStart, ystart);
    
    console.log(xCurrent, yCurrent);
    if (xEnd == xStart) {
        //Vertical Line
        if (yCurrent < yEnd) {
            yCurrent = yCurrent + 5;
        } else {
            yCurrent = yCurrent - 5;
        }
        xCurrent = xStart;
        ctx.lineTo(xCurrent, yCurrent);
    } else if (yEnd == ystart) {
        //Horizontal Line
        if (xCurrent < xEnd) {
            xCurrent = xCurrent + 5;
        } else {
            xCurrent = xCurrent - 5;
        }
        yCurrent = ystart;
        ctx.lineTo(xCurrent, yCurrent);
    } else {
        //All other lines
        if (xStart < xEnd) {
            xCurrent = xCurrent + 5;
            yCurrent = ystart + (xCurrent - xStart)*slope;
        } else if (xStart > xEnd) {
            xCurrent = xCurrent - 5;
            yCurrent = ystart + (xCurrent - xStart)*slope;
        }
        ctx.lineTo(xCurrent, yCurrent);
    }
    
    //TODO: Needs cleanup.
    if (yEnd < ystart) {
        if (yCurrent <= yEnd) {
            isGrown = true;
            clearInterval(growthinterval);
        }
    } else if (yEnd > ystart) {
        if (yCurrent >= yEnd) {
            isGrown = true;
            clearInterval(growthinterval);
        }
    } else if (xEnd < xStart) {
        if (xCurrent <= xEnd) {
            isGrown = true;
            clearInterval(growthinterval);
        }
    } else if (xEnd > xStart) {
        if (xCurrent >= xEnd) {
            isGrown = true;
            clearInterval(growthinterval);
        }
    }
    
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}