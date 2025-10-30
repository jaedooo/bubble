const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let engine, canvas, mouse, mouseConstraint;
let bubble;
let bubbles = [];
let wind = 0;
//sin 쓸려면 세터값
let t = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  engine = Engine.create();
  engine.gravity.y = -1;
  engine.gravity.x = -1;
  engine.gravity.scale = 0.0005;

  // 마우스 생성
  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      angularStiffness: 0.1,
    },
  });
  // 벽
  let margin = 40;
  Composite.add(engine.world, [
    Bodies.rectangle(margin, height / 2, margin, height, { isStatic: true }),
    Bodies.rectangle(width - margin, height / 2, margin, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width / 2, margin, width, margin, { isStatic: true }),
    Bodies.rectangle(width / 2, height - margin, width, margin, {
      isStatic: true,
    }),
  ]);

  Composite.add(engine.world, mouseConstraint);
  bubbles.push(new Bubble(random(width), random(height), 20));
  // bubble = new Bubble(200, 200, 50);
}

function draw() {
  Engine.update(engine);
  background(0);
  // bubble.display();
  for (let b of bubbles) {
    b.display();
  }

  wind = sin(t) * 0.001;
  t += 0.01;
  for (let b of bubbles) {
    let bd = b.body;
    Body.applyForce(bd, bd.position, { x: wind, y: 0 });
  }
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY, random(5, 20)));
}
// function mouseReleased() {
//   //b = 버블 클래스를 이야기하는 것 바디 아님
//   for (let b of bubbles) {
//     let bd = b.Body;
//     //{}=오브젝트임
//     Body.applyForce(bd, bd.position, { x: wind, y: 0 });
//   }
// }
function mouseDragged() {
  bubbles.push(new Bubble(mouseX, mouseY, random(5, 20)));
}
