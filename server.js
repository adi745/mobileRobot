const { Board, Led, Servo, Proximity } = require("johnny-five");
const board = new Board();
// const port = 3000;
// const startUrl = `http://localhost:${port}`;
// const boardPort = "COM6";

//pin setup

board.on("ready", () => {
  const servo = new Servo({ pin: 13, center: true, range: [45, 135], fps: 6 });
  //   const proximity = new Proximity({
  //     controller: "HCSR04",
  //     pin: 30,
  //   });

  board.repl.inject({
    servo,
  });

  //   proximity.on("change", () => {
  //     const { centimeters, inches } = proximity;
  //     console.log("Proximity: ");
  //     console.log("  cm  : ", centimeters);
  //     console.log("  in  : ", inches);
  //     console.log("-----------------");
  //   });
  servo.sweep();
});
