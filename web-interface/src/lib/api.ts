import axios from 'axios'
import { getAuthToken } from './utils'

const apiClient = axios.create()

apiClient.interceptors.request.use(config => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const turnOnPC = () => apiClient.post('/api/pc-control/boot')

export const forceShutOffPC = () => apiClient.post('/api/pc-control/force-shut-off')

export const pingTargetPC = async (): Promise<{ online: boolean }> => {
  const res = await apiClient.get<{ online: boolean }>('/api/pc-control/target-pc-ping')
  return res.data
}

export const pingEsp32 = async (): Promise<{ online: boolean }> => {
  const res = await apiClient.get<{ online: boolean }>('/api/pc-control/esp32-ping')
  return res.data
}

export const login = async (password: string) => {
  const res = await apiClient.post<{ access_token: string }>('/api/auth/login', { password })
  return res.data
}

export const getMe = async (): Promise<{ user: any }> => {
  const res = await apiClient.get<{ user: any }>('/api/auth/me')
  return res.data
}
