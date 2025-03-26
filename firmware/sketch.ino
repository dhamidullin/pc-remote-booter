// this sketch is for ESP32 C3 mini board
// it will be accessible as http://booter-esp32-c3:3344

#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>

#define LED_BUILTIN 8
#define BUTTON_PIN 6
#define MOSFET_PIN 5

WebServer server(3344);

const char* ssid = "WIFI_SSID";
const char* password = "WIFI_PASSWORD";

IPAddress local_IP(192, 168, 1, 225);
IPAddress gateway(192, 168, 50, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress dns(8, 8, 8, 8);

void pressMosfet(int duration) {
  digitalWrite(MOSFET_PIN, HIGH);
  delay(duration);
  digitalWrite(MOSFET_PIN, LOW);
}

void handleBoot() {
  pressMosfet(500);
  server.send(200, "application/json", "{\"status\": \"Boot triggered\"}");
}

void handleForceShutOff() {
  pressMosfet(6000);
  server.send(200, "application/json", "{\"status\": \"Force shut-off triggered\"}");
}

void handlePing() {
  server.send(200, "text/plain", "pong");
}

void handleRoot() {
  server.send(200, "text/plain", "Hello");
}

void blink(int n) {
  for (int i = 0; i < n; i++) {
    digitalWrite(LED_BUILTIN, LOW);
    delay(100);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(150);
  }
  delay(300);
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(MOSFET_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  digitalWrite(MOSFET_PIN, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  MDNS.begin("booter-esp32-c3");

  server.on("/", HTTP_GET, handleRoot);
  server.on("/ping", HTTP_GET, handlePing);
  server.on("/boot", HTTP_POST, handleBoot);
  server.on("/force-shut-off", HTTP_POST, handleForceShutOff);

  server.begin();
}

void loop() {
  server.handleClient();

  // Зеркалирование кнопки на MOSFET
  digitalWrite(MOSFET_PIN, digitalRead(BUTTON_PIN) == LOW ? HIGH : LOW);
}
