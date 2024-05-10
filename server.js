const { Board, Led, Servo, Proximity, Motor } = require("johnny-five");
const board = new Board();
const opn = require("opn");

const port = 5500;
const startUrl = `http://localhost:${port}`;
const boardPort = "COM6";

//pin setup
const pwmFront = 9;
const cdirFrontRightMotor = 22;
const dirFrontRightMotor = 24;
const dirFrontLeftMotor = 26;
const cdirFrontLeftMotor = 28;

// opn(`${startUrl}`);

board.on("ready", () => {
  const servo = new Servo({ pin: 13, startAt: 90, range: [45, 135], fps: 6 });
  const flMotor = new Motor({
    pins: {
      pwm: pwmFront,
      dir: dirFrontRightMotor,
      cdir: cdirFrontRightMotor,
    },
  });
  //   const proximity = new Proximity({
  //     controller: "HCSR04",
  //     pin: 30,
  //   });

  board.repl.inject({
    // servo,
    flMotor,
  });

  //   proximity.on("change", () => {
  //     const { centimeters, inches } = proximity;
  //     console.log("Proximity: ");
  //     console.log("  cm  : ", centimeters);
  //     console.log("  in  : ", inches);
  //     console.log("-----------------");
  //   });
  flMotor.forward(255);
  setTimeout(() => {
    flMotor.stop();
  }, 1000);
  //   servo.sweep();
});
