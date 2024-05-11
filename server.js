const { Board, Led, Servo, Proximity, Motor, Motors } = require("johnny-five");
const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
// const opn = require("opn");
// const cors = require("cors");

const board = new Board();
const app = express();
const server = createServer(app);
const io = new Server(server);

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

// app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

board.on("ready", () => {
  console.log("board is ready....");
  const servo = new Servo({ pin: 13, startAt: 90, range: [45, 135] });
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

  //   const proximity = new Proximity({
  //     controller: "HCSR04",
  //     pin: 30,
  //   });

  // board.repl.inject({
  //   servo,
  //   motorsF,
  //   motorsB,
  // });

  io.on("connection", (user) => {
    console.log("a user connected");

    user.on("leftFrontOn", () => {
      motorsF[1].forward(200);
    });

    user.on("leftFrontStop", () => {
      motorsF[1].stop();
    });

    user.on("rightFrontOn", () => {
      motorsF[0].forward(200);
    });

    user.on("rightFrontStop", () => {
      motorsF[0].stop();
    });

    user.on("leftBackOn", () => {
      motorsB[1].forward(200);
    });

    user.on("leftBackStop", () => {
      motorsB[1].stop();
    });

    user.on("rightBackOn", () => {
      motorsB[0].forward(200);
    });

    user.on("rightBackStop", () => {
      motorsB[0].stop();
    });

    user.on("sliderValueChanged", (demand) => {
      console.log(`servo angle demand is: ${demand}`);
      // servo.stop;
      servo.to(demand, 10);
      // if (servo.on) {
      //   servo.stop;
      // }
      servo.on("move:complete", function () {
        user.emit("servo-position-value", this.value);
      });
      // if (servo.position > 160 || servo.position < 20) {
      //   servo.center();
      // }
    });
    user.on("move-agv", (direction) => {
      // Control the motor based on the direction received
      console.log(direction);
      switch (direction) {
        case "forward":
          motorsF.forward(200);
          motorsB.forward(200);
          break;
        case "backward":
          motorsF.reverse(200);
          motorsB.reverse(200);
          break;
        case "rightforward":
          motorsF[1].forward(150); //leftFront
          motorsF[0].forward(50); //rightFront
          motorsB[1].forward(150); //leftBack
          motorsB[0].forward(50); //rightBack
          break;
        case "leftforward":
          motorsF[1].forward(50); //leftFront
          motorsF[0].forward(150); //rightFront
          motorsB[1].forward(50); //leftBack
          motorsB[0].forward(150); //rightBack
          break;
        case "right":
          motorsF[0].reverse(50); //leftFront
          motorsF[1].forward(50); //rightFront
          motorsB[0].reverse(50); //leftBack
          motorsB[1].forward(50); //rightBack
          break;
        case "left":
          motorsF[1].reverse(50); //leftFront
          motorsF[0].forward(50); //rightFront
          motorsB[1].reverse(50); //leftBack
          motorsB[0].forward(50); //rightBack
          break;
        case "rightbackward":
          motorsF[1].reverse(150); //leftFront
          motorsF[0].reverse(50); //rightFront
          motorsB[1].reverse(150); //leftBack
          motorsB[0].reverse(50); //rightBack
          break;
        case "leftbackward":
          motorsF[1].reverse(50); //leftFront
          motorsF[0].reverse(150); //rightFront
          motorsB[1].reverse(50); //leftBack
          motorsB[0].reverse(150); //rightBack
          break;
        default:
          motorsF.stop();
          motorsB.stop();
          break;
      }
      // if (direction === "forward") {
      //   motorsF.forward(200);
      // } else if (direction === "backward") {
      //   motorsF.reverse(200);
      // } else if (direction === "rightforward") {
      //   motorsF[1].forward(200);
      //   motorsF[0].forward(50);
      // } else if (direction === "leftforward") {
      //   motorsF[1].forward(50);
      //   motorsF[0].forward(200);
      // } else if (direction === "rightbackward") {
      //   motorsF[1].reverse(200);
      //   motorsF[0].reverse(50);
      // } else if (direction === "leftbackward") {
      //   motorsF[1].reverse(50);
      //   motorsF[0].reverse(200);
      // } else {
      //   motorsF.stop();
      // }
    });
    // user.on("moveY", (moveY) => {
    //   console.log(`y mouse coordinate: ${moveY}`);
    // });
    //
    // socket.on("disconnect", () => {
    //   console.log("Client disconnected");user.on("moveX", (moveX) => {
    //   console.log(`x mouse coordinate: ${moveX}`);
    // });
    // });
  });

  server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
  });
});
