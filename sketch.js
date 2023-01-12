/*
Created by Vrindavan Sanap
Code quality: Mid
*/
let slider_hit_sound = new Audio('assets/hit.mp3');
let game_over_sound = new Audio("assets/lost.mp3")
let game_over = false

function setup(){
    createCanvas(800,800)
    b = new Ball(100, 100)
    s = new Slider()
}
class Ball{
    constructor(px, py, vx=0, vy=15, daimeter=20){
        this.position = new createVector(px, py)
        this.velocity = new createVector(vx, vy)
        this.daimeter = daimeter
        this.radius = daimeter/2 
    }
    reset(){
        this.position  = new createVector(100, 100)
        this.velocity = new createVector(0,15)
    }
    update(){ 
        this.position.add(this.velocity)
        if ((this.position.x > width - this.radius) || (this.position.x < this.radius)){
            this.velocity.x = -this.velocity.x
        }
        if (this.position.y < 0 + this.radius){
            this.velocity.y = -this.velocity.y
        } 
    }
    render(){
        fill(255) 
        circle(this.position.x, this.position.y, this.daimeter)
    }
}

class Slider{
    constructor(){
        this.positionX = mouseX
        this.widht = 150
        this.half_width = this.widht/2
        this.height = 25
        this.buffer = 10
        this.positionY = height - this.height - this.buffer
    }
    update(){
        this.positionX = mouseX - this.half_width
        this.positionX = constrain(this.positionX, 0 + this.buffer, width - this.widht - this.buffer);
    }
    render(){
        fill(255)
        rect(this.positionX, this.positionY, this.widht, this.height)
    }

}
function check_collision(ball, slider){
    let inside =false 
    if((ball.position.x + ball.radius-  slider.positionX >0) &(ball.position.x -(slider.positionX + slider.widht+ ball.radius) < 0)){ 
        inside = true
    }else{
        inside = false
    }

    if (ball.position.y > height - ball.radius - 35){
        if (inside == false){
            game_over = true
            game_over_sound.play()
            ball.reset()
        }else{
            console.log("COLLISION")
            /*
            set the return angle of ball based on where the ball hits the slider
            */
            slider_hit_sound.play()
            let dd = (-ball.position.x+ slider.positionX+slider.half_width)
            let angle=  map(dd, -100, 100, 15, 165);
            let dumble = p5.Vector.fromAngle(radians(angle), ball.velocity.mag());
            dumble.y = -dumble.y
            ball.velocity = dumble
        
        }
    }
}

function keyPressed(){
    if (keyCode === RETURN) {

        game_over = !game_over
    }
}
function draw(){

        background(0)
    if (!game_over){
        b.update()
        b.render()

        s.update()
        s.render()
        check_collision(b, s)
    }else{
        textSize(30)
        text("GAME OVER", 100, height/2)
        textSize(15)
        text("Click to Enter again", 100, height/2 + 25)
        
        s.update()
        s.render()
    }
}