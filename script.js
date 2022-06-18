// Particle System Simulation
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/syR0klfncCk
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html
// https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ

const particles = [];
const attractors = []
const slider_G = document.querySelector("#slider_G")
const slider_Raggio = document.querySelector("#slider_Raggio")
const slider_Life = document.querySelector("#slider_Life")
const slider_Quant = document.querySelector("#slider_Quant")
const slider_Magnitude = document.querySelector("#slider_Magnitude")
const counter = document.getElementById("counter")
const slider_Red = document.querySelector("#slider_Red")
const slider_Green = document.querySelector("#slider_Green")
const slider_Blue = document.querySelector("#slider_Blue")


init()

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < 1; i++) {
    attractors.push(createVector(random(-width * 0.3, width * 0.3),
      random(-height * 0.3, height * 0.3))) //qui al posto di random width e random height, inserisci i punti degli occhi
  }
}

function draw() {
  // attractors.x = slider_AttrX.value * windowWidth
  // attractors.y = slider_AttrY.value * windowHeight
  const r = parseFloat(slider_Raggio.value)
  const life = parseFloat(slider_Life.value)

  //--------------------- PARTICLE EMITTERS ---------------------------//

  // for (let i = 0; i < slider_Quant.value; i++) {
  //   const y = -height / 2
  //   const x = random(-width * 0.2, width * 0.2)
  //   const vel = parseFloat(slider_Magnitude.value)
  //   particles.push(new Particle(x, y, r, life, vel));
  // }
  // for (let j = 0; j < slider_Quant.value; j++) {
  //   const y = height / 2
  //   const x = random(-width * 0.2, width * 0.2)
  //   const vel = parseFloat(slider_Magnitude.value)
  //   particles.push(new Particle(x, y, r, life, vel));
  // }

  for (let k = 0; k < slider_Quant.value; k++) {
    const y = random(-height * 0.2, height * 0.2)
    const x = -width / 2
    const vel = parseFloat(slider_Magnitude.value)
    particles.push(new Particle(x, y, r, life, vel));
  }
  for (let l = 0; l < slider_Quant.value; l++) {
    const y = random(-height * 0.2, height * 0.2)
    const x = width / 2
    const vel = parseFloat(slider_Magnitude.value) * -1
    particles.push(new Particle(x, y, r, life, vel));
  }

  //---------------------------------------------------------------//



  //Per ogni particella
  for (const particle of particles) {
    const gravity = createVector(0.1, 0);
    // particle.applyForce(gravity);
    for (let i = 0; i < attractors.length; i++) {
      particle.attracted(attractors[i], slider_G.value);
    }

    particle.update();

    // particle.edges();
  }


  //--------------------- PARTICLE DESTRUCTOR ---------------------------//
  const x0 = -width / 2
  const y0 = -height / 2
  const x1 = width / 2
  const y1 = height / 2
  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].isInCanvas(x0, y0, x1, y1) || particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  const delta = particles.length - 4000
  if (delta > 0) {
    particles.splice(0, delta)
  }


  // attractors[0].x = mouseX - width / 2
  // attractors[0].y = mouseY - height / 2

  // attractors[1].x = dX - width/2
  // attractors[1].y = dY - width/2

  //attrattore 2
  // attractors[1].x = -attractors[0].x
  // attractors[1].y = -attractors[0].y


  //---------------------------------------------------------------//

  //--------------------- DRAW ---------------------------//


  background('#000');
  noStroke()
  const R = slider_Red.value
  const G = slider_Green.value
  const B = slider_Blue.value

  noFill()
  strokeWeight(r)
  stroke(R, G, B)

  beginShape(POINTS)
  for (const particle of particles) {
    vertex(particle.pos.x, particle.pos.y)
    //fill(R,G,B,particle.lifetime)
    //particle.show();
  }
  endShape()

  noStroke()
  fill('#A465BF')
  for (const attr of attractors) {
    circle(attr.x, attr.y, 5)
  }

  // --------- if PARTE DEL VOLTO esiste, usa attractor --------- //


  if (nose.length > 0) {
    fill(255)
    const nx = map(nose[3]._x, 1, 0, -width / 2, width / 2)
    const ny = map(nose[3]._y, 0, 1, -height / 2, height / 2)
    attractors[0].x = nx
    attractors[0].y = ny

  }
  // ------------------------------------------------------------ //






  let out = ""
  out += "Forza G: " + slider_G.value + " " + "|" + " "
  out += "FPS: " + Math.round(frameRate()) + " " + "|" + " "
  out += "ParticlesQuantity:" + " " + particles.length + " " + "\n"
  out += "Red:" + " " + slider_Red.value + " "
  out += "Green:" + " " + slider_Green.value + " "
  out += "Blue:" + " " + slider_Blue.value + " "

  counter.innerHTML = out
}
//-----------------------------------------------------------------//


//--------------------- SLIDER AUTOMATION - Colori ---------------------------//

const speed = 300
const max = 255
let i = max;
let RED = 0;
let GREEN = 0;
let BLUE = 0;


setInterval(() => {
  RED = Math.abs(i++ % (max * 2) - max)
  GREEN = Math.abs(i++ % (max * 2) - max)
  BLUE = Math.abs(i++ % (max * 2) - max)
  // console.log(GREEN)
}, speed)
//-----------------------------------------------------------------//
//--------------------- SLIDER AUTOMATION - Raggio ---------------------------//
const speedR = 100
const maxR = 8
let iR = maxR;
let RaggioAuto

setInterval(() => {
  RaggioAuto = Math.abs(iR++ % (maxR * 2) - (maxR - 1))
  // console.log("raggio è = a " + " " + RaggioAuto + " " + "ogni" + " " + speedR + " " + "secondi")
}, speedR)

//-------------------------------------------------------------------//

//-------------------- AUDIO INTRO -------------------------------//

const audio1 = new Audio('Ali_WeMightBe_PostProcess2_Speed.wav')
audio1.volume = 0.8
audio1.play()
audio1.onended = FadeIn();

function FadeIn() {
  const audio2 = new Audio('/Swept/Swept128kbps.mp3')
  let vol = 0
  let interval = 300
  audio2.play()
  let FadeIn = setInterval(
    function () {
      if (vol < 0.8) {
        vol += 0.01
        // console.log(vol)
        audio2.volume = vol
      } else {
        clearInterval(FadeIn)
      }
    }, interval)
}
//-----------------------------------------------------------------//
//---------------------- PRELOADER -------------------------------//


setTimeout(() => {
  const preload = document.querySelector('.preload');
  preload.classList.add('preload-finish')
}, "8000")


//-----------------------------------------------------------------//

//-------------------------------------------------------- GOFULLSCREEN----------------------------//
function toggleFullscreen(elem) {
  elem = elem || document.documentElement;

  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

document.getElementById('togglefullscreen').addEventListener('click', function() {
  toggleFullscreen();
});