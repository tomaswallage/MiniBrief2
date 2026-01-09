// This sketch uses a helper class to make the MPR121 easier to use
// The helper is in the MPR121_Helper.h tab - you don't need to modify it
// Just use the simple commands like touch.isNewTouch(0)

#include <Wire.h>
#include "Adafruit_MPR121.h"
#include "MPR121_Helper.h"

// Create the sensor
Adafruit_MPR121 capA = Adafruit_MPR121();
Adafruit_MPR121 capB = Adafruit_MPR121();
// Create the touch helper object
MPR121_Helper touchA(&capA);
MPR121_Helper touchB(&capB);

// constant variable for number of electrodes
const int NUM_ELECTRODES = 24;

int sensValsA[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
int sensValsB[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    delay(10);
  }

  Serial.println("MPR121 Touch Sensor Example");

  //is the sensor detected?
  if (!(capA.begin(0x5A) && (capB.begin(0x5B)))) {
    Serial.println("MPR121 A or B not found, check wiring?");
    while (1);

  }

  capA.setAutoconfig(true);
  
  capB.setAutoconfig(true);

  Serial.println("MPR121 found!");
}

void loop() {
  // Update touch data once per loop
  touchA.updateTouchData();

  // Check each of the 12 sensors
  for (uint8_t i = 0; i < NUM_ELECTRODES; i++) {

    //is an electrode touched
    if (touchA.isNewTouch(i)) {
      sensValsA[i] = 1;
    }

    //is an electrode released
    if (touchA.isNewRelease(i)) {
      sensValsA[i] = 0;
    }

  }

//  Serial.print("A: ");
  for (int j = 0; j < 12; j++) {
    Serial.print(sensValsA[j]);
    Serial.print(",");
  }
  //  Serial.println(sensVals[11]);

  // Update touch data once per loop
  touchB.updateTouchData();

  // Check each of the 12 sensors
  for (uint8_t i = 0; i < NUM_ELECTRODES; i++) {

    //is an electrode touched
    if (touchB.isNewTouch(i)) {
      sensValsB[i] = 1;
    }

    //is an electrode released
    if (touchB.isNewRelease(i)) {
      sensValsB[i] = 0;
    }

  }

//  Serial.print(" | B: ");
  for (int j = 0; j < 12; j++) {
    Serial.print(sensValsB[j]);
    Serial.print(",");
  }
  Serial.println("");
  //  Serial.println(sensVals[11]);
  delay(100);
}

//is an electrode touched
//    if (touchA.isNewTouch(i)) {
//      Serial.print("Sensor ");
//      Serial.print(i);
//      Serial.println(" touched");
//    }
//
//    //is an electrode released
//    if (touchA.isNewRelease(i)) {
//      Serial.print("Sensor ");
//      Serial.print(i);
//      Serial.println(" released");
//    }
