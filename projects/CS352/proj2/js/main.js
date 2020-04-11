import { Dialog, Project1 } from "./window_types.js";
import { Button } from './button.js';

class Main {
    constructor() {
        this.canvas = $('#canvas1')[0];
        $('#canvas1').css('background-color', '#008080');
        this.ctx = this.canvas.getContext('2d');
        this.windows = []; // array of open windows
        this.panel = new Panel();
        this.crashed = false;
        this.crash_window = null;
        this.interval = 8;
        // create the starting windows
        var start_window = new Dialog("Welcome", 400, 50, "Welcome to|Windows Mistake Edition!");
        var project1_window = new Project1("tpt3.png", 50, 50);
        //setInterval(this.draw, 1)
        // push the windows onto the array
        this.windows.push(start_window);
        this.windows.push(project1_window);
    }
    init() {
        $('#crashbutton').bind('click', main.crash);
        $('#enableredraws').attr('checked', true);
        $('#slider1').bind('change', main.interval_change);

        // mouse down event
        this.canvas.addEventListener('mousedown', function (e) {
            // function called on each window in array
            function window_mousedown(window) {
                if (window.mousedown(e)) { // window.mousedown returns true if the window border is clicked
                    // delete the window from the array then push it to the begining of the array
                    // this is so that the active window is rendered on top of everything else
                    let forDeletion = [window];
                    main.windows = main.windows.filter(window => !forDeletion.includes(window));
                    if (window.delete == false) {
                        main.windows.push(window);
                    }

                }
            }
            // call window_mousedown for each window in array
            main.windows.forEach(window_mousedown);
            main.panel.mousedown(e);
        });
        this.canvas.addEventListener('mousemove', function (e) {
            // pass along mouse movements to each window in the array
            function window_mousemove(window) {
                window.mousemove(e);
            }
            main.windows.forEach(window_mousemove);
            main.panel.mousemove(e);
        });
        this.canvas.addEventListener('mouseup', function (e) {
            // pass along mouseups to each window in the array
            function window_mouseup(window) {
                window.mouseup(e);
            }
            main.windows.forEach(window_mouseup);
            main.panel.mouseup(e);
        });
        main.draw();
    }
    draw() {
        // double buffer
        if ($('#doublebuffer').is(":checked")) {
            var buffer = document.createElement('canvas');
            buffer.width = 640;
            buffer.height = 480;
            var buffer_ctx = buffer.getContext('2d');
            if ($('#enableredraws').is(":checked")) {
                main.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
            function draw_window(window) {
                window.draw(buffer_ctx);
            }
            main.windows.forEach(draw_window);
            this.ctx.drawImage(buffer, 0, 0)
        } else {
            // redrawing the background "clears" the screen
            if ($('#enableredraws').is(":checked")) {
                main.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
            function draw_window(window) {
                // if the window is marked for deletion (close button clicked)
                // delete the window from the array
                // otherwise draw the window
                if (window.delete == true) {
                    let forDeletion = [window];
                    main.windows = main.windows.filter(window => !forDeletion.includes(window));
                } else {
                    window.draw(main.ctx);
                }

            }
            // call draw_window for each window in array
            main.windows.forEach(draw_window);
        }
        this.panel.draw(main.ctx);
        if (this.crashed == true) {
            main.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            main.ctx.beginPath();
            main.ctx.rect(290, 100, 60, 20);
            main.ctx.fillStyle = '#b3b3b3';
            main.ctx.fill();
            main.ctx.fillStyle = '#0000aa';
            main.ctx.font = "bold 10pt Tahoma";
            main.ctx.fillText("Windows", 291, 112);
            main.ctx.textAlign = "center";
            main.ctx.fillStyle = '#b3b3b3';
            main.ctx.font = "bold 10pt Tahoma";
            main.ctx.fillText("Windows Mistake Edition made a mistake", 320, 180);
            main.ctx.fillText("Who could have guessed", 320, 200);
            main.ctx.textAlign = "start";
            if (this.crash_window !== null) {
                this.crash_window.draw(main.ctx);
            }

        }
        setTimeout(this.draw.bind(this), main.interval);
    }
    interval_change(ev){
        console.log("here")
        $('#drawinterval').text($('#slider1').val());
        main.interval = $('#slider1').val();
    }
    // change the background to a bluescreen
    // and delete every window
    crash(ev) {
        function delete_window(window) {
            let forDeletion = [window]
            main.windows = main.windows.filter(window => !forDeletion.includes(window))
        }
        main.windows.forEach(delete_window);
        this.crashed = true;

        function create_crash_window() {
            main.crash_window = new Dialog("Error: Success", 210, 200, "Error:|Task failed successfully")
        }
        setTimeout(create_crash_window, 5000);
        $('#canvas1').css('background-color', '#0000aa');
    }
}

class Panel {
    constructor() {
        this.start_button = new Button(this, 2, 456, "Start", 54, 22)
        this.start_menu = new StartMenu();
        this.start_button.action = function () {
            this.window.start_menu.shown = true;
        }
        this.start_button.draw_text = function (ctx) {
            ctx.fillStyle = '#000000';
            ctx.font = "bold 8pt Tahoma";
            ctx.fillText(this.text, this.x + 22, this.y + 16);
        }
        var img = new Image();
        img.src = "images/start.png";
        this.start_icon = img;
    }
    draw(ctx) {
        // main bottom panel
        ctx.beginPath();
        ctx.rect(0, 452, 640, 28);
        ctx.fillStyle = '#dfdfdf';
        ctx.fill();
        ctx.beginPath();
        ctx.rect(0, 453, 640, 27);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.beginPath();
        ctx.rect(0, 454, 640, 27);
        ctx.fillStyle = '#c0c0c0';
        ctx.fill();

        // clock
        ctx.beginPath();
        ctx.rect(575, 456, 63, 22);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.beginPath();
        ctx.rect(575, 456, 62, 21);
        ctx.fillStyle = '#808080';
        ctx.fill();
        ctx.beginPath();
        ctx.rect(576, 457, 61, 20);
        ctx.fillStyle = '#c0c0c0';
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.font = "8pt Tahoma";
        ctx.fillText(this.getCurrentTime(), 588, 471);

        // start button
        this.start_button.draw(ctx);
        ctx.drawImage(this.start_icon, 6, 460);
        this.start_menu.draw(ctx);

    }
    mouseup(e) {
        this.start_button.mouseup(e);
        this.start_menu.mouseup(e);
    }
    mousemove(e) {
        this.start_button.mousemove(e);
        this.start_menu.mousemove(e);
    }
    mousedown(e) {
        this.start_button.mousedown(e);
    }
    getCurrentTime() {
        var date = new Date();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        if (hours > 12) {
            var suffix = "PM"
            hours = hours - 12;
        } else {
            var suffix = "AM"
        }
        var time = hours + ":" + minutes + " " + suffix;
        return time;
    }
}

class StartMenu {
    constructor() {
        this.height = 192;
        this.shown = false;
        this.entries = [];
        // first start menu entry
        var welcome = function () {
            var x = Math.floor(Math.random() * (440 - 0 + 1)) + 0;
            var y = Math.floor(Math.random() * (240 - 0 + 1)) + 0;
            var start_window = new Dialog("Welcome", x, y, "Welcome to|Windows Mistake Edition!");
            main.windows.push(start_window);
        }
        var info = new Image();
        info.src = "images/info.png";
        this.entries.push(new Entry("Welcome", info, welcome));

        // second start menu entry
        var project1 = function () {
            var x = Math.floor(Math.random() * (440 - 0 + 1)) + 0;
            var y = Math.floor(Math.random() * (240 - 0 + 1)) + 0;
            var project1_window = new Project1("tpt3.png", x, y);
            main.windows.push(project1_window);
        }
        var tpt3 = new Image();
        tpt3.src = "images/tpt3.png";
        this.entries.push(new Entry("Project1", tpt3, project1));
        // third start menu entry
        var paint = function () {
            var x = Math.floor(Math.random() * (440 - 0 + 1)) + 0;
            var y = Math.floor(Math.random() * (240 - 0 + 1)) + 0;
            var paint_window = new Dialog("Paint", x, y, "No paint...|yet...");
            var img = new Image();
            img.src = "images/paint.png";
            paint_window.icon = img;
            main.windows.push(paint_window);
        }
        var paint_icon = new Image();
        paint_icon.src = "images/paint.png";
        this.entries.push(new Entry("Paint", paint_icon, paint));

        // fourth start menu entry
        var crash = function () {
            main.crash();
        }
        var error = new Image();
        error.src = "images/error.png";
        this.entries.push(new Entry("Crash", error, crash));

    }
    draw(ctx) {
        if (this.shown == true) {
            ctx.beginPath();
            ctx.rect(2, 452 - this.height, 164, this.height);
            ctx.fillStyle = '#000000';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(2, 452 - this.height, 164 - 1, this.height - 1);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(2 + 1, 452 - this.height + 1, 164 - 2, this.height - 2);
            ctx.fillStyle = '#c0c0c0';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(2 + 1, 452 - this.height + 1, 22, this.height - 2);
            ctx.fillStyle = '#808080';
            ctx.fill();
            ctx.save();
            ctx.rotate(-Math.PI / 2);
            ctx.fillStyle = '#ffffff';
            ctx.font = "bold 12pt Tahoma";
            ctx.fillText("Windows ME", -440, 20);
            ctx.restore();
            for (var i = 0; i < this.entries.length; i++) {
                this.entries[i].draw(ctx, i);
            }
        }
    }
    mouseup(e) {
        this.mx = e.offsetX;
        this.my = e.offsetY;
        if (!(this.mx >= 2 &&
            this.mx <= 2 + 164 &&
            this.my >= 452 - this.height &&
            this.my <= 452 + this.height)) {
            this.shown = false;
        }
        if (this.shown == true) {
            for (var i = 0; i < this.entries.length; i++) {
                this.entries[i].mouseup(e, i);
            }
        }

    }
    mousemove(e) {
        for (var i = 0; i < this.entries.length; i++) {
            this.entries[i].mousemove(e, i);
        }
    }
}

class Entry {
    constructor(name, img, action) {
        this.name = name;
        this.action = action;
        this.hover = false;
        this.icon = img;
    }
    draw(ctx, number) {
        if (this.hover == true) {
            ctx.beginPath();
            ctx.rect(26, 261 + 32 * number, 138, 32);
            ctx.fillStyle = '#000080';
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = "12px Tahoma";
            ctx.fillText(this.name, 64, 280 + 32 * number);
        } else {
            ctx.fillStyle = '#000000';
            ctx.font = "12px Tahoma";
            ctx.fillText(this.name, 64, 280 + 32 * number);
        }
        ctx.drawImage(this.icon, 28, 262 + 32 * number, 30, 30);
    }
    mouseup(e, number) {
        this.mx = e.offsetX;
        this.my = e.offsetY;
        if (this.mx >= 26 &&
            this.mx <= 26 + 138 &&
            this.my >= 261 + 32 * number &&
            this.my <= 261 + 32 * number + 32) {
            this.action();
        }
    }
    mousemove(e, number) {
        this.mx = e.offsetX;
        this.my = e.offsetY;
        if (this.mx >= 26 &&
            this.mx <= 26 + 138 &&
            this.my >= 261 + 32 * number &&
            this.my <= 261 + 32 * number + 32) {
            this.hover = true;
        } else {
            this.hover = false;
        }
    }
}
// create main object
var main = new Main();

// when loaded run init function
$(document).ready(function () { main.init(); });