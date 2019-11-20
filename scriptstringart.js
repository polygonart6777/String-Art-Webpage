var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var sliderX = document.getElementById("myXRange");  //Slider for the max value on the x-axis.
var sliderY = document.getElementById("myYRange");  //Slider for the max value on the y-axis.
var slidernumlines= document.getElementById("numlines"); //Slider for the number of lines to plot.
var sliderspeed= document.getElementById("speed");  //Slider for the time it takes to complete the animation, sgives you the option to slow things down.
var button = document.getElementById("button"); //Record when button has been clicked.

var outputY = document.getElementById("demoY"); //Create variables in order to show the user what the sliders have changed.
var outputX = document.getElementById("demoX");
var demospeed = document.getElementById("demospeed");
var outputlines = document.getElementById("demolines");

outputY.innerHTML = sliderY.value;  //Update the values the sliders have changed.
outputX.innerHTML = sliderX.value;

//outputlines.innerHTML = slidernumlines.value; //When I figure out what the speed is actually doing, I will uncomment this.

var strokeEvery = sliderspeed.valueAsNumber;    //Store all of the slider values to use within the draw function.
var x_axis = sliderX.valueAsNumber;
var y_axis = sliderY.valueAsNumber;
var number_lines = slidernumlines.valueAsNumber;
//demospeed.innerHTML = number_lines/sliderspeed.value;
var margin_x = (1000-x_axis*10)/2;              //Centers the animation by providing nice margins on the sides according to canvas dimensions.
var margin_y = (1000-y_axis*10)/4+y_axis*10;

var step_x= x_axis*10/number_lines;     //Used to find the step size for the lines drawn.
var step_y= y_axis*10/number_lines;

ctx.lineWidth = 1;


//Starts the animation when the page opens.
window.onload = function () {  
  clearCanvas();
  draw(x_axis,y_axis);
};


//Once the button is clicked update the animation with the input values coming from the sliders.
//First clear the canvas, scroll to the top of the page, update all of the values from the sliders then recalculate the variables needed for the draw function, and then draw.
button.addEventListener("click", () => {
    clearCanvas();
    scrollToTop()

    var sliderX = document.getElementById("myXRange");  //Updates the variables from the new input values from the sliders
    var sliderY = document.getElementById("myYRange");
    var slidernumlines = document.getElementById("numlines");
    var sliderspeed= document.getElementById("speed");

    
    var x = 0;  //Sets the position to start at the top of the y-axis.
    var y = 0;
    var num_track = 0; //Resets the tracking for the number of lines to 0.

    var x_axis = sliderX.valueAsNumber; //Updates the variables from the sliders used in the scope of this draw function.
    var y_axis = sliderY.valueAsNumber;
    var margin_x = (1000-x_axis*10)/2
    var margin_y = (1000-y_axis*10)/4+y_axis*10
    var number_lines = slidernumlines.valueAsNumber
    var step_x= x_axis*10/number_lines;
    var step_y= y_axis*10/number_lines;

    var strokeEvery = sliderspeed.valueAsNumber;
    
    outputY.innerHTML = sliderY.value; //Updates the output values.
    outputX.innerHTML = sliderX.value;
    outputlines.innerHTML = slidernumlines.value;
    //demospeed.innerHTML = number_lines/sliderspeed.value;
    
    draw(x_axis,y_axis)

});


//This function clears our canvas!
function clearCanvas(){
    ctx.clearRect(0, 0, c.width, c.height)
    x = 0 
    y = 0;
    num_track=0;
}


//Scrolls the window to the top so after a user clicks the button they can see the animation unfold.
function scrollToTop() { 
    window.scrollTo(0, 0); 
} 


//A function to draw tick marks on the y-axis according to the user's choice of the max y-axis value.
function tickLineY(ctx,j){
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(j,margin_y);
    ctx.lineTo(j,margin_y+10)
    ctx.stroke();
}


//A function to draw tick marks on the x-axis according to the user's choice of the max x-axis value.
function tickLineX(ctx,j){
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(margin_x,j);
    ctx.lineTo(margin_x-10,j)
    ctx.stroke();
}
            
//A function to draw a line from the y-axis to the x-axis.
function strokeLine(ctx, x,y) {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(margin_x, margin_y-y_axis*10+y);
    ctx.lineTo(margin_x+x, margin_y);
    ctx.stroke();
}


//Draws the parabola that fits the given family of lines.  There is a different parabola for each choice of max y and x-axis values. 
function parabola(ctx,y){
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(margin_x,margin_y-y_axis*10);
    for(var x = 0; x < y; x += 1)
          ctx.lineTo(x*x/(10*x_axis)+margin_x,-y_axis*10*(1-x/(x_axis*10))**2+margin_y);
    ctx.stroke()
}


//The main player, draw function that draws each set of tick marks, parabola and animate the lines.
function draw(x_axis,y_axis) {
    
    //Begin by drawing the x and y-axis
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(margin_x,margin_y);
    ctx.lineTo(margin_x,margin_y-y_axis*10);
    ctx.stroke();
    ctx.moveTo(margin_x,margin_y);
    ctx.lineTo(margin_x+x_axis*10,margin_y);
    ctx.stroke();  

    //Draw all of the tick marks on the x-axis for the given input.
    for (var j =margin_x; j<margin_x+x_axis*10+20; j+=20){
        tickLineY(ctx,j)
        ctx.font = '17px Arial';
        ctx.textAlign = 'center'; 
        ctx.fillText((j-margin_x)/10, j, margin_y+25);
    }

    // Draw all of the tick marks on the y-axis for the given input.
    for (var j =margin_y-y_axis*10; j<margin_y; j+=20){
        tickLineX(ctx,j)
        ctx.font = '17px Arial';
        ctx.textAlign = 'center'; 
        ctx.fillText(-(j-margin_y)/10, margin_x-25,j);
    }


    strokeLine(ctx,x,y);
    parabola(ctx,x);

    //draws the number of lines given by a user starting from the top of the y-axis and steping one unit down and to the right each time.
    if (num_track <number_lines-1) {
        num_track+=1;
        x += step_x;
        y += step_y
        setTimeout(draw, strokeEvery, x_axis, y_axis);
        setTimeout(parabola,strokeEvery, ctx, y);
    }
}


 


