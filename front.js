const leftFrontOn = document.getElementById("left-front-on");
const leftFrontStop = document.getElementById("left-front-stop");
const rightFrontOn = document.getElementById("right-front-on");
const rightFrontStop = document.getElementById("right-front-stop");
const leftBackOn = document.getElementById("left-back-on");
const leftBackStop = document.getElementById("left-back-stop");
const rightBackOn = document.getElementById("right-back-on");
const rightBackStop = document.getElementById("right-back-stop");

leftFrontOn.addEventListener("click", () => {
  fetch("http://localhost:3000/leftFrontOn");
});

leftFrontStop.addEventListener("click", () => {
  fetch("http://localhost:3000/leftFrontStop");
});

rightFrontOn.addEventListener("click", () => {
  fetch("http://localhost:3000/rightFrontOn");
});

rightFrontStop.addEventListener("click", () => {
  fetch("http://localhost:3000/rightFrontStop");
});

leftBackOn.addEventListener("click", () => {
  fetch("http://localhost:3000/leftBackOn");
});

leftBackStop.addEventListener("click", () => {
  fetch("http://localhost:3000/leftBackStop");
});

rightBackOn.addEventListener("click", () => {
  fetch("http://localhost:3000/rightBackOn");
});

rightBackStop.addEventListener("click", () => {
  fetch("http://localhost:3000/rightBackStop");
});
