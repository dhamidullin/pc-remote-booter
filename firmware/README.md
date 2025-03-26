# NetControl ESP32 Firmware

ESP32-C3 firmware that controls PC power by triggering motherboard power pins. The firmware allows simultaneous control through both web interface and physical button - you can keep using your PC's power button as usual while also having remote control access.

## Upload
1. [Install ESP32 board support in Arduino IDE](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/)
2. Open `sketch.ino` in Arduino IDE
3. Set your WiFi credentials in the code
4. Select ESP32-C3 board
5. Upload to device

## Pin Configuration
- MOSFET Module: GPIO 3 (for web-based control)
- Power Button: GPIO 2 (physical button input, optional)
