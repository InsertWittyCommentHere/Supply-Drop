var helicopterIMG, helicopterSprite, packageSprite,packageIMG
var packageBody,ground, box1, box2, box3
const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(1700, 900)
	rectMode(CENTER)
	
	packageSprite=createSprite(width/2, 80, 10,10)
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10)
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-65, width + 50,20)
	groundSprite.shapeColor=color(255)

	engine = Engine.create()
	world = engine.world

	packageBody = Bodies.circle(width/2 , 200 , 12, {restitution:0.2, isStatic:true})
	World.add(world, packageBody)
	
	box1 = new Box(750, 800, 20, 140)
	box2 = new Box(850, 800, 200, 20)
	box3 = new Box(950, 800, 20, 140)
	packageSprite.depth = -20
	World.add(world, box1)
	World.add(world, box2)
	World.add(world, box3)
	//Create a Ground
	ground = Bodies.rectangle(width/2, height - 50, width + 100, 20, {isStatic:true} )
 	World.add(world, ground)
	Engine.run(engine)
}

function draw() {
  rectMode(CENTER)
  background(0)
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  groundSprite.x = ground.position.x 
  groundSprite.y = ground.position.y 
  box1.display()
  box2.display()
  box3.display()

  drawSprites()
  box1.isStatic = true;
  box2.isStatic = true;
  box3.isStatic = true;
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	// Look at the hints in the document and understand how to make the package body fall only on
	Matter.Body.setStatic(packageBody, false)
  }
}
class Box{
    constructor(x, y, width, height){
    var options = {
        'restitution':0,
        'friction':1.0,
        'density':1.0
    }
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    
    World.add(world, this.body);
  }
  display(){
    var pos =this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(0, 0, this.width, this.height);
    pop();
  }
};
