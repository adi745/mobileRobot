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
    user.on("moveY", (moveY) => {
      console.log(`y mouse coordinate: ${moveY}`);
    });
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

  //   app.get("/leftFrontOn", (req, res) => {
  //     res.send("LEFT FRONT MOTOR ON!");
  //     motorsF[1].forward(200);
  //     res.sendStatus(200);
  //   });

  //   app.get("/leftFrontStop", (req, res) => {
  //     res.send("LEFT FRONT MOTOR STOP!");
  //     motorsF[1].stop();
  //     res.sendStatus(200);
  //   });

  //   app.get("/rightFrontOn", (req, res) => {
  //     res.send("RIGHT FRONT MOTOR ON!");
  //     motorsF[0].forward(200);
  //     res.sendStatus(200);
  //   });

  //   app.get("/rightFrontStop", (req, res) => {
  //     res.send("RIGHT FRONT MOTOR STOP!");
  //     motorsF[0].stop();
  //     res.sendStatus(200);
  //   });

  //   app.get("/leftBackOn", (req, res) => {
  //     res.send("LEFT BACK MOTOR ON!");
  //     motorsB[1].forward(200);
  //     res.sendStatus(200);
  //   });

  //   app.get("/leftBackStop", (req, res) => {
  //     res.send("LEFT BACK MOTOR STOP!");
  //     motorsB[1].stop();
  //     res.sendStatus(200);
  //   });

  //   app.get("/rightBackOn", (req, res) => {
  //     res.send("RIGHT BACK MOTOR ON!");
  //     motorsB[0].forward(200);
  //     res.sendStatus(200);
  //   });

  //   app.get("/rightBackStop", (req, res) => {
  //     res.send("RIGHT BACK MOTOR STOP!");
  //     motorsB[0].stop();
  //     res.sendStatus(200);
  //   });

  //   app.get("/angle", (req, res) => {
  //     // console.log(req.query.demand);
  //     const servoDemand = req.query.demand;
  //     console.log(`servo angle demand is: ${servoDemand}`);
  //     servo.stop;
  //     servo.to(servoDemand, 50);
  //     res.sendStatus(200);
  //   });
  //   app.listen(port, () => {
  //     console.log(`Example app listening on port ${port}`);
  //   });
  //   //   proximity.on("change", () => {
  //   //     const { centimeters, inches } = proximity;
  //   //     console.log("Proximity: ");
  //   //     console.log("  cm  : ", centimeters);
  //   //     console.log("  in  : ", inches);
  //   //     console.log("-----------------");
  //   //   });
  //   console.log("AGV starts to move");
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
