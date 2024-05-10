const { Board, Led, Servo, Proximity, Motor, Motors } = require("johnny-five");
const express = require("express");
const cors = require("cors");

const board = new Board();
const opn = require("opn");
const app = express();

const port = 3000;
const startUrl = `http://localhost:${port}`;
const boardPort = "COM6";

//pin setup
const pwmFrontR = 9;
const cdirFrontRightMotor = 22;
const dirFrontRightMotor = 24;
const cdirFrontLeftMotor = 26;
const dirFrontLeftMotor = 28;
const pwmFrontL = 10;

const pwmBackR = 11;
const cdirBackRightMotor = 5;
const dirBackRightMotor = 6;
const cdirBackLeftMotor = 7;
const dirBackLeftMotor = 8;
const pwmBackL = 12;

// opn(`${startUrl}`);
app.use(cors());

board.on("ready", () => {
  console.log("board is ready....");
  //   const servo = new Servo({ pin: 13, startAt: 90, range: [45, 135], fps: 6 });
  const motorsF = new Motors([
    {
      //right motor
      pins: {
        pwm: pwmFrontR,
        dir: dirFrontRightMotor,
        cdir: cdirFrontRightMotor,
      },
      invertPWM: false,
    },
    {
      //left motor
      pins: {
        pwm: pwmFrontL,
        dir: dirFrontLeftMotor,
        cdir: cdirFrontLeftMotor,
      },
      invertPWM: false,
    },
  ]);
  const motorsB = new Motors([
    {
      pins: {
        pwm: pwmBackR,
        dir: dirBackRightMotor,
        cdir: cdirBackRightMotor,
      },
      invertPWM: false,
    },
    {
      pins: { pwm: pwmBackL, dir: dirBackLeftMotor, cdir: cdirBackLeftMotor },
      invertPWM: false,
    },
  ]);
  //   const frMotor = new Motor({
  //     pins: {
  //       pwm: pwmFront,
  //       dir: dirFrontRightMotor,
  //       cdir: cdirFrontRightMotor,
  //     },
  //   });
  //   const flMotor = new Motor({
  //     pins: {
  //       pwm: pwmFront,
  //       dir: dirFrontLeftMotor,
  //       cdir: cdirFrontLeftMotor,
  //     },
  //   });
  //   const proximity = new Proximity({
  //     controller: "HCSR04",
  //     pin: 30,
  //   });

  board.repl.inject({
    // servo,
    // frMotor,
    // flMotor,
    motorsF,
    motorsB,
  });

  app.get("/leftFrontOn", (req, res) => {
    res.send("LEFT MOTOR ON!");
    motorsF[1].forward(200);
    res.sendStatus(200);
  });

  app.get("/leftFrontStop", (req, res) => {
    res.send("LEFT MOTOR STOP!");
    motorsF[1].stop();
    res.sendStatus(200);
  });

  app.get("/rightFrontOn", (req, res) => {
    res.send("RIGHT MOTOR ON!");
    motorsF[0].forward(200);
    res.sendStatus(200);
  });

  app.get("/rightFrontStop", (req, res) => {
    res.send("RIGHT MOTOR STOP!");
    motorsF[0].stop();
    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  //   proximity.on("change", () => {
  //     const { centimeters, inches } = proximity;
  //     console.log("Proximity: ");
  //     console.log("  cm  : ", centimeters);
  //     console.log("  in  : ", inches);
  //     console.log("-----------------");
  //   });
  console.log("AGV starts to move");
  //   motorsF.forward(255);
  //   motorsB.forward(255);
  //   servo.sweep();
  //   //   frMotor.forward(255);
  //   setTimeout(() => {
  //     // motorsF.stop();
  //     motorsB.stop();
  //     // frMotor.stop();
  //   }, 4000);
  //   setTimeout(() => {
  //     servo.center(1000);
  //     servo.stop;
  //   });
});
