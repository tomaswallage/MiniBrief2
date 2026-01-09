let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let index;
let timeIndex1 = 0;
let timeIndex2 = 0;
let timeIndex3 = 0;
let condition1;
let condition2;
let condition3;
let img;
let seconds;
let changes1 = 0;
let changes2 = 0;
let slider;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  img = await loadImage("assets/boardDesign.jpg");

  condition1 = await loadJSON("assets/multi-sensor-data-1.json");
  condition2 = await loadJSON("assets/multi-sensor-data-2.json");
  condition3 = await loadJSON("assets/multi-sensor-data-3.json");
  //print all my data
  console.log(condition1);
  console.log(condition2);
  console.log(condition3);

  // slider = createSlider(0, condition2.length, 1);
  // slider.size(400, 50);
  // slider.position(windowWidth / 2 - 200, 50);
}

function draw() {
  background(255);

  imageMode(CENTER);

  noStroke();
  textAlign(CENTER, CENTER);
  textSize(30);

  // let timeSpan = slider.value();
  // console.log(timeSpan);

  //
  //
  //
  //
  //
  //
  //first condition
  //

  push();
  translate(-windowWidth / 4, 0);
  // image(img, windowWidth / 2, windowHeight / 2, 550, 550);

  push();

  translate(windowWidth / 2, windowHeight / 2);
  translate(-220, -220);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      index = j * 4 + i;
      fill(255, 50, 0);
      if (condition1[timeIndex1].sensors[index] == 1) {
        ellipse(i * 146.3, j * 146.3, 55, 55);
      } else {
      }

      if (timeIndex1 > 0) {
        console.log("hello");
        if (
          condition1[timeIndex1].sensors[index] !==
          condition1[timeIndex1 - 1].sensors[index]
        ) {
          changes1++;
        }
      }
    }
  }
  pop();
  pop();

  fill(0);
  textAlign(LEFT, LEFT);
  seconds = nf(condition1[timeIndex1].timestampS, 0, 2);
  text(seconds + " seconds", 30, 30);

  if (frameCount % 10 == 0) {
    timeIndex1 = timeIndex1 + 1;
  }

  // if (timeIndex1 >= condition1.length) {
  //   timeIndex1 = 0;
  //   timeIndex3 = 0;
  // }

  //
  //
  //
  //
  //
  //
  //second condition
  //

  push();
  translate(windowWidth / 4, 0);

  // image(img, windowWidth / 2, windowHeight / 2, 550, 550);

  push();
  translate(windowWidth / 2, windowHeight / 2);
  translate(-220, -220);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      index = j * 4 + i;
      fill(255, 50, 0);
      if (condition3[timeIndex3].sensors[index] == 1) {
        ellipse(i * 146.3, j * 146.3, 55, 55);
      } else {
      }

      if (timeIndex3 > 0) {
        if (
          condition3[timeIndex3].sensors[index] !==
          condition3[timeIndex3 - 1].sensors[index]
        ) {
          changes2++;
        }
      }
    }
  }

  pop();
  pop();

  //
  //
  //
  //
  //
  //
  //

  fill(0);
  textAlign(LEFT, LEFT);
  seconds = nf(condition3[timeIndex3].timestampS, 0, 2);
  // text(seconds + " seconds", 30, 30);

  if (frameCount % 10 == 0) {
    timeIndex3 = timeIndex3 + 1;
  }

  // if (timeIndex3 >= condition3.length) {
  //   timeIndex3 = 0;
  //   timeIndex1 = 0;
  // }

  if (seconds >= 60) {
    timeIndex1 = 0;
    timeIndex3 = 0;
    changes1 = 0;
    changes2 = 0;
  }

  // console.log(changes1);
  // console.log(changes2);

  textAlign(CENTER, CENTER);
  textSize(20);
  text("Test 1 Playback", windowWidth / 4, 730);
  text("Test 2 Playback", (windowWidth / 4) * 3, 730);
  text("changes: " + round(changes1 / 10), windowWidth / 4, 760);
  text("changes: " + round(changes2 / 10), (windowWidth / 4) * 3, 760);
}

//spare code

//   for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 4; j++) {
//       index = j * 4 + i;
//       fill(150);
//       ellipse(i * 100, j * 100, 90, 90);
//       fill(0);
//       text(array[index], i * 100, j * 100);
//     }
//   }

// console.log(myData[frameCount].sensors[0]);
