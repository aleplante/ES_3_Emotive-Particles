// Particle System Simulation
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/syR0klfncCk
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html
// https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ

class Particle {
  constructor(x, y, raggio, life, vel) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(0.5, 1), random(-1, 1));
    this.vel.setMag(vel)
    this.acc = createVector(0, 0);
    this.r = raggio;
    this.lifetime = life;
    this.damp = random(0.94, 0.99)
  }
  isInCanvas(x0, y0, x1, y1) {
    if (this.pos.x < x0) return false
    if (this.pos.y < y0) return false
    if (this.pos.x > x1) return false
    if (this.pos.y > y1) return false
    return true
  }
  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force)
  }

  // edges() {
  //   if (this.pos.y >= height - this.r) {
  //     this.pos.y = height - this.r;
  //     this.vel.y *= -1;
  //   }

  //   if (this.pos.x >= width - this.r) {
  //     this.pos.x = width - this.r;
  //     this.vel.x *= -1;
  //   } else if (this.pos.x <= this.r) {
  //     this.pos.x = this.r;
  //     this.vel.x *= -1;
  //   }
  // }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(this.damp)
    this.acc.set(0, 0);
    this.lifetime -= 1;
  }

  // show() {
  //   square(this.pos.x, this.pos.y, this.r *10, this.r*10);
  // }
  attracted(target, G) {
    let force = p5.Vector.sub(target, this.pos)
    let dsquared = force.magSq()
    dsquared = constrain(dsquared, 25, 500)
    let strenght = (G / dsquared)//*cos(0,1000)
    //console.log(strenght)
    force.setMag(strenght)
    this.acc.add(force)
  }
}
