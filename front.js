const port = 3000;
const startUrl = `http://localhost:${port}`;
// opn(`${startUrl}`);

const leftFrontOn = document.getElementById("left-front-on");
const leftFrontStop = document.getElementById("left-front-stop");
const rightFrontOn = document.getElementById("right-front-on");
const rightFrontStop = document.getElementById("right-front-stop");
const leftBackOn = document.getElementById("left-back-on");
const leftBackStop = document.getElementById("left-back-stop");
const rightBackOn = document.getElementById("right-back-on");
const rightBackStop = document.getElementById("right-back-stop");
const moveServo = document.getElementById("move-servo");
const slider = document.getElementById("slider");
const output = document.getElementById("servo-angle");

leftFrontOn.addEventListener("click", () => {
  socket.emit(`${startUrl}/leftFrontOn`);
});

leftFrontStop.addEventListener("click", () => {
  socket.emit("leftFrontStop");
});

rightFrontOn.addEventListener("click", () => {
  socket.emit("rightFrontOn");
});

rightFrontStop.addEventListener("click", () => {
  socket.emit("rightFrontStop");
});

leftBackOn.addEventListener("click", () => {
  socket.emit("leftBackOn");
});

leftBackStop.addEventListener("click", () => {
  socket.emit("leftBackStop");
});

rightBackOn.addEventListener("click", () => {
  socket.emit("rightBackOn");
});

rightBackStop.addEventListener("click", () => {
  socket.emit("rightBackStop");
});

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
};

output.innerHTML = slider.value; // Display the default slider value
const sliderValue = output.innerHTML;

slider.addEventListener("input", (event) => {
  let demand = event.slider;
  socket.emit("demand", demand);
});
