'use client'

import PcControl from "@/components/pc-control"
import withAuthCheck from "@/hoc/withAuthCheck"

function Dashboard() {
  return (
    <PcControl />
  )
}

export default withAuthCheck(Dashboard, true, '/login')
