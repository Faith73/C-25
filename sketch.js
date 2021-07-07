const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon, cannonball;
var balls = [];



function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle=-PI/4;
  ground=new Ground(0,600,2400,10);

  tower = new Tower(150, 350, 160, 310);
  cannon=new Cannon (180,110,110,50,angle);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  

  Engine.update(engine);
  ground.display();
  

  tower.display();
  cannon.display();
 
  for(var i=0; i<balls.length; i=i+1){
    showCannonballs(balls[i],i);
  }
}

function keyPressed(){
  if (keyCode===DOWN_ARROW){
    cannonball = new CannonBall(cannon.x,cannon.y);
    balls.push(cannonball);
  }
}

function keyReleased(){
  if (keyCode===DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

function showCannonballs(ball,index){
  ball.display();
  if (ball.body.position.x>=width || ball.body.position.y>=height-50){
    World.remove(world,ball.body);
    balls.splice(index,1);
  }
}




