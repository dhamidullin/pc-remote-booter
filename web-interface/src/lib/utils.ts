import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import ms from "ms"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sleep = (time: number | ms.StringValue): Promise<void> => {
  const millis = typeof time === 'number'
    ? time
    : ms(time)

  return new Promise((resolve) => setTimeout(resolve, millis))
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
}

export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
}

export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
}
