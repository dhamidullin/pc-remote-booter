import PcControl from "@/app/RootPageContent"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NetControl Dashboard',
  description: 'Manage and control your PC remotely with NetControl.',
}

export default function Page() {
  return (
    <PcControl />
  )
}
