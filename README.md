# NetControl

This is my personal project I use to remotely boot or turn off my PC by triggering the power pins of my PC's motherboard with a ESP32 board and a simple WEB interface built with Next.js. It's deployed on my home server. I post it here as a part of my portfolio. Feel free to use it though if you find it usefull.

## Project Overview
The system consists of:
- A Next.js web interface
- An ESP32 microcontroller that interfaces with the PC's motherboard power button pins with a MOSSFET
- A ping service running on the target PC for status monitoring

![Hardware Setup](hardware.jpg)

## Project Structure
The project is split into three main components:

1. **Web Interface** (`/web-interface`)
   - Next.js-based web application for controlling the PC
   - Provides a user-friendly interface for power management
   - Handles authentication and user interactions

2. **ESP32 Firmware** (`/esp32`)
   - Microcontroller code that interfaces with the PC's power pins
   - Handles the physical control of the PC (simulates power button press with a mossfet module)
   - Communicates with the web interface

3. **Ping Service** (`/ping`)
   - Lightweight Node.js service for PC status monitoring
   - Runs on the target PC
   - Provides online/offline status to the web interface

## TODO
- Improve dashboard with better UI/UX and more features
- Implement session access and refresh tokens for better security
- Add tests

## License
I built this project for personal use and share it as part of my portfolio. Feel free to use it. It's provided "as is" without any warranty.
