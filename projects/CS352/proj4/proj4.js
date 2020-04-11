class Main {
    constructor() {
        this.canvas = $('#canvas1')[0];
        this.ctx = this.canvas.getContext('2d');
        this.x = 0;
        this.vx = 0;
        this.snowflakes = [];

    }
    init() {
        $('#slider1').bind('change', this.slider);
        $('#resetbutton').bind('click', this.reset);
        this.ctx.setTransform(1, 0, 0, 1, 360, 270);
        for (var i = 0; i < snowCount; i++) {
            var snowflake = new Snowflake();
            snowflake.reset();
            this.snowflakes.push(snowflake);
        }
        this.draw()
    }
    draw() {
        tilt = parseInt($('#slider1').val());
        speed = parseInt($('#slider2').val());
        this.ctx.clearRect(-width / 2, -height / 2, width, height);
        this.ctx.fillStyle = '#7EC0EE'
        this.ctx.fillRect(-width / 2, -height / 2, width, width);
        //snow
        this.ctx.fillStyle = '#ffffff'
        for (var i = 0; i < snowCount; i++) {
            var snowflake = this.snowflakes[i];
            snowflake.y += snowflake.vy;
            snowflake.x += snowflake.vx;

            this.ctx.globalAlpha = snowflake.o;
            this.ctx.beginPath();
            this.ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
            this.ctx.closePath();
            this.ctx.fill();

            if (snowflake.y > height) {
                snowflake.reset();
            }
        }
        //ground
        this.ctx.globalAlpha = 1;
        this.ctx.save();
        this.ctx.translate(0, 100);
        this.ctx.rotate(tilt * Math.PI / 180);
        this.ctx.fillRect(-width, 0, width * 2, height);
        this.ctx.translate(0, -75);
        this.ctx.translate(this.x, 0);
        this.vx += tilt / 180;
        if(this.vx > speed){this.vx = speed};
        if(this.vx < -speed){this.vx = -speed};
        this.x += this.vx;
        if (this.x > 500) { this.x = -500 };
        if (this.x < -500) { this.x = 500 };
        if(Math.abs(tilt) > 70){
            this.ctx.rotate((this.x +Math.random())/ 90 );
        }
        //body
        this.ctx.beginPath();
        this.ctx.moveTo(0, -50);
        this.ctx.lineTo(0, 50);
        //legs
        this.ctx.lineTo(25, 75);
        this.ctx.moveTo(0, 50);
        this.ctx.lineTo(-25, 75);
        //arms
        this.ctx.save();
        this.ctx.rotate(-Math.sin(this.x / 10));
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(25, 0);
        this.ctx.restore();
        this.ctx.save();
        this.ctx.rotate(Math.sin(this.x / 10));
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-25, 0);
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx.closePath();
        //head
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.arc(0, -75, 25, 0, 2 * Math.PI);
        this.ctx.fill()
        this.ctx.arc(0, -75, 25, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
        //mouth
        this.ctx.fillStyle = '#000000';
        this.ctx.save();
        this.ctx.translate(0, -60);
        this.ctx.scale(1, Math.abs(tilt) / 90 + 0.1);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        //eyes
        this.ctx.save();
        this.ctx.translate(0, -80);
        this.ctx.beginPath();
        //right eye
        this.ctx.save();
        this.ctx.translate(-7.5, 0);
        this.ctx.rotate(-this.x / 20);
        this.ctx.arc(2, 0, 3, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.restore();
        //left eye
        this.ctx.save();
        this.ctx.translate(7.5, 0);
        this.ctx.rotate(this.x / 20);
        this.ctx.arc(2, 0, 3, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        this.ctx.restore();

        //skateboard
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(0, 75);
        this.ctx.moveTo(-40, 0);
        this.ctx.lineTo(40, 0);
        this.ctx.stroke();
        this.ctx.closePath();
        //front of board
        this.ctx.beginPath();
        this.ctx.arc(40, -6, 6, 0, Math.PI / 2);
        this.ctx.stroke();
        this.ctx.closePath();
        //back of board
        this.ctx.beginPath();
        this.ctx.arc(-40, -6, 6, Math.PI / 2, Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.restore();

        //restore
        this.ctx.restore();
        setTimeout(this.draw.bind(this), 1000 / 60);
    }
    handleOrientation(event) {
        $('#slider1').val(event.gamma);
    }
    reset() {
        $('#slider1').val(0);
        $('#slider2').val(30);
        tilt = 0;
        main.vx = 0;
        main.x = 0;
    }
    slider() {

    }
}

// Snow based on code from https://php.quicoto.com/snow-html-canvas/
class Snowflake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
        this.r = 0;
        this.reset();
    }
    reset() {
        this.x = -width / 2 + Math.random() * width;
        this.y = -height / 2 + Math.random() * -height;

        // More speed? Change this
        this.vy = 1 + Math.random() * 3;
        this.vx = 0.5 - Math.random();

        // Bigger snow?
        this.r = 1 + Math.random() * 2;
        this.o = 0.5 + Math.random() * 0.5;
    }
}

var main = new Main();
var width = 720;
var height = 540;
var snowCount = 300;
var speed = 30;
var tilt = parseInt($('#slider1').val());

window.addEventListener("deviceorientation", main.handleOrientation);

// when loaded run init function
$(document).ready(function () { main.init(); });