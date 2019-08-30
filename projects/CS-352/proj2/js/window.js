import { Button } from './button.js';
class Window {
    constructor(title, x, y, width, height) {
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.buttons = [new Button(this, this.x + this.width - 16, this.y + 1, null, 12, 12)]
        this.delete = false;
    }
    draw(ctx) {
        // window border
        ctx.beginPath();
        ctx.rect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.beginPath();
        ctx.rect(this.x - 1, this.y - 1, this.width + 1, this.height + 1);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        //window content
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#c0c0c0';
        ctx.fill();

        // window title bar gradient
        var grd = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
        grd.addColorStop(0, "#0f2048");
        grd.addColorStop(1, "#bccade");
        ctx.fillStyle = grd;
        ctx.fillRect(this.x, this.y, this.width, 15);
        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 10px Tahoma";
        ctx.fillText(this.title, this.x + 5, this.y + 10);
        
        // draw buttons
        function draw_button(button) {
            button.draw(ctx)
        }
        this.buttons.forEach(draw_button);
        // draw x on button
        ctx.beginPath();
        ctx.moveTo(this.x + this.width - 13, this.y + 4);
        ctx.lineTo(this.x + this.width - 6, this.y + 11);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + this.width - 6, this.y + 4);
        ctx.lineTo(this.x + this.width - 13, this.y + 11);
        ctx.stroke();
    }
    mousedown(e) {
        function mousedown_button(button) {
            button.mousedown(e);
        }
        this.buttons.forEach(mousedown_button);
        this.mx = e.offsetX;
        this.my = e.offsetY;
        if (this.mx >= this.x &&
            this.mx <= this.x + this.width &&
            this.my >= this.y &&
            this.my <= this.y + 15) {
            this.dragging = true;
            return true;
        }
    }

    mouseup(e) {
        function mouseup_button(button) {
            button.mouseup(e);
        }
        this.buttons.forEach(mouseup_button);
        this.dragging = false;
    }

    mousemove(e) {
        if (this.dragging) {
            var new_mx = e.offsetX;
            var new_my = e.offsetY;
            var x_delta = new_mx - this.mx;
            var y_delta = new_my - this.my;
            this.x += x_delta;
            this.y += y_delta;
            this.mx = new_mx;
            this.my = new_my;
            function move_button(button) {
                button.move(button.x + x_delta, button.y + y_delta);
            }
            this.buttons.forEach(move_button);
        }
        function mousemove_button(button) {
            button.mousemove(e);
        }
        this.buttons.forEach(mousemove_button);
    }
}

export { Window };