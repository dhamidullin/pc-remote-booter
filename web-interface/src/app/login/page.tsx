import React from 'react'
import LoginPage from './LoginPage'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - NetControl',
  description: 'Login to access the NetControl dashboard and manage your PC remotely.',
};

export default () => {
  return <LoginPage />
}
