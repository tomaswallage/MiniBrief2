#ifndef MPR121_HELPER_H
#define MPR121_HELPER_H

#include "Adafruit_MPR121.h"

// Beginner-friendly wrapper for Adafruit MPR121 to align with the old Bare Conductive library 
// Hides the need to show Bit manipulation to beginners. 
class MPR121_Helper {
private:
  Adafruit_MPR121* sensor;
  uint16_t currentTouchData;
  uint16_t lastTouchData;
  
public:
  MPR121_Helper(Adafruit_MPR121* cap) {
    sensor = cap;
    currentTouchData = 0;
    lastTouchData = 0;
  }
  
  // Update touch data from the sensor. Call this once per loop
  void updateTouchData() {
    lastTouchData = currentTouchData;
    currentTouchData = sensor->touched();
  }
  
  // Check if a specific sensor is currently touched
  bool isTouched(uint8_t electrode) {
    if (electrode > 11) return false;
    return (currentTouchData & (1 << electrode)) != 0;
  }
  
  // Check if a sensor was touched in the last reading
  bool wasTouched(uint8_t electrode) {
    if (electrode > 11) return false;
    return (lastTouchData & (1 << electrode)) != 0;
  }
  
  // Check if there is a new touch event 
  bool isNewTouch(uint8_t electrode) {
    return isTouched(electrode) && !wasTouched(electrode);
  }
  
  // Check if there was a new release event
  bool isNewRelease(uint8_t electrode) {
    return !isTouched(electrode) && wasTouched(electrode);
  }
  
  // Get the total number of sensors currently touched
  uint8_t getNumTouches() {
    uint8_t count = 0;
    for (uint8_t i = 0; i < 12; i++) {
      if (isTouched(i)) count++;
    }
    return count;
  }
};

#endif
