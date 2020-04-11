class Button {
    constructor(window, x, y, text = null, width = 40, height = 20) {
        this.window = window;
        this.x = x;
        this.y = y;
        this.text = text;
        this.width = width;
        this.height = height;
        this.pressed = false;
    }
    draw(ctx) {
        // popped out
        if (this.pressed == false) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width + 2, this.height + 2);
            ctx.fillStyle = '#000000';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width + 1, this.height + 1);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(this.x + 1, this.y + 1, this.width, this.height);
            ctx.fillStyle = '#808080';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(this.x + 1, this.y + 1, this.width - 1, this.height - 1);
            ctx.fillStyle = '#dfdfdf';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(this.x + 2, this.y + 2, this.width - 2, this.height - 2);
            ctx.fillStyle = '#c0c0c0';
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width + 2, this.height + 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width + 1, this.height + 1);
            ctx.fillStyle = '#000000';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(this.x + 1, this.y + 1, this.width, this.height);
            ctx.fillStyle = '#808080';
            ctx.fill();
            ctx.beginPath();
            ctx.rect(this.x + 2, this.y + 2, this.width - 2, this.height - 2);
            ctx.fillStyle = '#c0c0c0';
            ctx.fill();
        }
        // button text
        if (this.text) {
            this.draw_text(ctx)
        }
    }
    draw_text(ctx, text){
        ctx.fillStyle = '#000000';
        ctx.font = "12px Tahoma";
        ctx.fillText(this.text, this.x + 12, this.y + 15);
    }
    mousedown(e) {
        this.mx = e.offsetX;
        this.my = e.offsetY;
        if (this.mx >= this.x &&
            this.mx <= this.x + this.width &&
            this.my >= this.y &&
            this.my <= this.y + this.height) {
            this.pressed = true;
        }
    }
    mouseup(e) {
        this.mx = e.offsetX;
        this.my = e.offsetY;
        if (this.mx >= this.x &&
            this.mx <= this.x + this.width &&
            this.my >= this.y &&
            this.my <= this.y + this.height) {
            this.pressed = false;
            this.action();
        }
    }
    mousemove(e) {
        this.pressed = false;
    }
    action() {
        this.window.delete = true;
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
}
export { Button };