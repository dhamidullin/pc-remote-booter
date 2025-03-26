import axios from 'axios'

const esp32BooterBaseUrl = process.env.ESP32_BOOTER_BASE_URL as string
const wallPcPingUrl = process.env.TARGET_PC_PING_URL as string

if (!esp32BooterBaseUrl) {
  throw new Error('ESP32_BOOTER_BASE_URL is not set')
}

if (!wallPcPingUrl) {
  throw new Error('TARGET_PC_PING_URL is not set')
}

export async function boot() {
  await axios.post(`${esp32BooterBaseUrl}/boot`)
}

export async function forceShutOff() {
  await axios.post(`${esp32BooterBaseUrl}/force-shut-off`)
}

export async function getHello() {
  const res = await axios.get(`${esp32BooterBaseUrl}/`)
  return res.data
}

export async function pingPc() {
  try {
    const res = await axios.get(wallPcPingUrl)
    return res.data === 'pong'
  } catch (err) {
    return false
  }
}

export async function pingEsp32Booter() {
  try {
    const res = await axios.get(`${esp32BooterBaseUrl}/ping`)
    return res.data === 'pong'
  } catch (err) {
    return false
  }
} 