let bridge;
let sensorValues = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
let allData = [];
let currentReading = {};
let isConnected = false;
let connectionStatus = "disconnected";
let img;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  img = await loadImage("assets/boardDesign.jpg");

  bridge = new SerialBridge();

  bridge.onData("arduino_1", (data) => {
    // SERIAL DATA INPUT
    // console.log("Received:", data);

    let values = data.split(",");

    // Loop through and convert all values to numbers
    for (let i = 0; i < values.length; i++) {
      sensorValues[i] = parseInt(values[i]);
    }

    //sensors[i]=sensorValues[i]
    currentReading = {
      // timestamp: millis(),
      //sensors:sensorValues;
      frame: frameCount,
      timestampS: millis() / 1000,
      timestampMS: millis(),
      sensors: [
        sensorValues[0],
        sensorValues[1],
        sensorValues[2],
        sensorValues[3],
        sensorValues[4],
        sensorValues[5],
        sensorValues[6],
        sensorValues[7],
        sensorValues[8],
        sensorValues[9],
        sensorValues[10],
        sensorValues[11],
        sensorValues[12],
        sensorValues[13],
        sensorValues[14],
        sensorValues[15],
        sensorValues[16],
      ],
    };

    // Add this reading to our collection
    allData.push(currentReading);

    // Console log the JSON object
    console.log("JSON reading:", currentReading);
    console.log("Total readings collected:", allData.length);
  });

  // Listen for connection status changes
  bridge.onStatus("arduino_1", (status, port) => {
    connectionStatus = status;
    isConnected = status === "connected";
    console.log(`Arduino status: ${status} on ${port}`);
  });

  console.log("P5.js sketch initialized");
  console.log("Waiting for Arduino data...");
}

function draw() {
  background(255);

  imageMode(CENTER);
  image(img, windowWidth / 2, windowHeight / 2, 700, 700);

  noStroke();
  textAlign(CENTER, CENTER);

  // for (let i = 0; i < 24; i++) {
  //   for (let j = 0; j < 12; j++) {
  //     if (sensorValues[i] == 1) {
  //       ellipse(25 + i * 50, 50 * j, 50, 50);
  //     } else if (sensorValues[i] == 0) {
  //     }
  //   }
  // }

  push();
  translate(windowWidth / 2, windowHeight / 2);
  translate(-280, -280);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      index = j * 4 + i;
      fill(255, 50, 0);
      if (sensorValues[index] == 1) {
        ellipse(i * 186.2, j * 186.2, 70, 70);
      } else {
      }
      fill(0);
      // text(sensorValues[index], i * 100, j * 100);
    }
  }
  pop();
  // Display JSON data on screen
  //   fill(0);
  //   textAlign(LEFT, TOP);
  //   textSize(12);
  //   if (allData) {
  //     text("JSON Object:", 10, 10);
  //     text(
  //       `{ timestamp: ${currentReading.timestamp},
  //       sensors: {
  //       sensor0: ${currentReading.sensors?.sensor0},
  //       sensor1: ${currentReading.sensors?.sensor1},
  //       sensor2: ${currentReading.sensors?.sensor2},
  //       sensor0: ${currentReading.sensors?.sensor3},
  //       sensor1: ${currentReading.sensors?.sensor4},
  //       sensor2: ${currentReading.sensors?.sensor5},
  //       sensor0: ${currentReading.sensors?.sensor6},
  //       sensor1: ${currentReading.sensors?.sensor7},
  //       sensor2: ${currentReading.sensors?.sensor8},
  //       sensor0: ${currentReading.sensors?.sensor9},
  //       sensor1: ${currentReading.sensors?.sensor10},
  //       sensor2: ${currentReading.sensors?.sensor11},
  //       sensor0: ${currentReading.sensors?.sensor12},
  //       sensor1: ${currentReading.sensors?.sensor13},
  //       sensor2: ${currentReading.sensors?.sensor14}  } }`,
  //       10,
  //       25
  //     );

  //     // text(sensorValues[1], 10, 120);

  //     // Display collection info
  //     //     text(`Readings collected: ${allData.length}`, 10, 130);
  //     //     text(`Press 's' to save all data`, 10, 150);
  //     //   } else {
  //     //     text("Waiting for data...", 10, 30);
  //   }

  textAlign(LEFT, LEFT);
  text(millis(), 10, 10);
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveJSON(allData, "multi-sensor-data.json");
    console.log(`Saved ${allData.length} readings to file!`);
  }
}

function connectionDisplay() {
  // Connection status indicator
  let statusColor = isConnected ? color(16, 185, 129) : color(239, 68, 68);
  fill(statusColor);
  circle(width / 2, height - 55, 12);

  textAlign(CENTER, CENTER);
  textSize(12);
  fill(150);
  text(connectionStatus.toUpperCase(), width / 2, height - 30);
}
