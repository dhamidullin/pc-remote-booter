import axios from 'axios'

const esp32BooterBaseUrl = process.env.ESP32_BOOTER_BASE_URL as string
const targetPcPingUrl = process.env.TARGET_PC_PING_URL as string

if (!esp32BooterBaseUrl) {
  throw new Error('ESP32_BOOTER_BASE_URL is not set')
}

if (!targetPcPingUrl) {
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
    console.log('Pinging PC at:', targetPcPingUrl)
    const res = await axios.get(targetPcPingUrl)
    const isOnline = res.data === 'pong'
    console.log('PC ping result:', isOnline)
    return isOnline
  } catch (err) {
    // @ts-ignore
    console.log('PC ping failed:', err?.response?.data || err?.message)
    return false
  }
}

export async function pingEsp32Booter() {
  const pingUrl = `${esp32BooterBaseUrl}/ping`
  console.log('Pinging ESP32 at:', pingUrl)

  try {
    const res = await axios.get(pingUrl)
    const isOnline = res.data === 'pong'
    console.log('ESP32 ping result:', isOnline)
    return isOnline
  } catch (err) {
    // @ts-ignore
    console.log('ESP32 ping failed:', err?.response?.data || err?.message)
    return false
  }
} 