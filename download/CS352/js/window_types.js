import { Window } from "./window.js";
import { Button } from './button.js';
class Dialog extends Window {
    constructor(title, x, y, message) {
        super(title, x, y, 220, 120);
        this.message = message;
        this.buttons.push(new Button(this, this.x + this.width - 50, this.y + this.height - 30, "OK", 40, 20))
        var img = new Image();
        img.src = "images/info.png";
        this.icon = img;
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.drawImage(this.icon, this.x + 20, this.y + this.height / 3, 32, 32);
        ctx.fillStyle = '#000000';
        ctx.font = "12px Tahoma";
        ctx.fillText(this.message.split("|")[0], this.x + 64, this.y + 50);
        ctx.fillText(this.message.split("|")[1], this.x + 64, this.y + 70);
    }

}

class Project1 extends Window {
    constructor(title, x, y) {
        super(title, x, y, 320, 255);
        var img = new Image();
        img.src = "images/tpt3.png";
        this.project1 = img;
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.drawImage(this.project1, this.x, this.y + 15, 320, 240);
    }

}

class Project3 extends Window {
    constructor(title, x, y) {
        super(title, x, y, 320, 255);
        var img = new Image();
        img.src = "images/tpt3.png";
        this.project1 = img;
    }
    draw(ctx) {
        super.draw(ctx);
        var project3 = document.createElement('canvas');
        project3.width = 320;
        project3.height = 220;
        var project3_ctx = buffer.getContext('2d');
        if ($('#enableredraws').is(":checked")) {
            main.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        function draw_window(window) {
            window.draw(buffer_ctx);
        }
        main.windows.forEach(draw_window);
        this.ctx.drawImage(buffer, 0, 0)
    }
}
export { Dialog, Project1 };