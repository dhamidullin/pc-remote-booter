"use client"

import { FancyButton } from "@/components/ui-custom/fancy-button"
import { forceShutOffPC, turnOnPC, pingTargetPC, pingEsp32 } from "@/lib/api"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { StatusCard } from "./status-card"

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
`

const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/hardware.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(8px) brightness(0.6) opacity(0.7);
    z-index: -1;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;
  gap: 1rem;
  background-color: rgba(17, 24, 39, 0.95);
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
`

export default function PcControl() {
  const [pcStatus, setPcStatus] = useState<boolean | null>(null)
  const [esp32Status, setEsp32Status] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEsp32Loading, setIsEsp32Loading] = useState(false)
  const [isTurnOnLoading, setIsTurnOnLoading] = useState(false)
  const [isTurnOffLoading, setIsTurnOffLoading] = useState(false)

  const checkPcStatus = async () => {
    setIsLoading(true)
    try {
      const res = await pingTargetPC()
      setPcStatus(res.online)
    } finally {
      setIsLoading(false)
    }
  }

  const checkEsp32Status = async () => {
    setIsEsp32Loading(true)
    try {
      const res = await pingEsp32()
      setEsp32Status(res.online)
    } finally {
      setIsEsp32Loading(false)
    }
  }

  const handleTurnOn = async () => {
    setIsTurnOnLoading(true)
    try {
      await turnOnPC()
    } finally {
      setIsTurnOnLoading(false)
    }
  }

  const handleForceTurnOff = async () => {
    setIsTurnOffLoading(true)
    try {
      await forceShutOffPC()
    } finally {
      setIsTurnOffLoading(false)
    }
  }

  useEffect(() => {
    checkPcStatus()
    checkEsp32Status()
  }, [])

  return (
    <RootContainer data-testid="pc-control-root">
      <ContentContainer data-testid="pc-control-content">
        <StatusCard
          title="PC Status"
          isOnline={pcStatus}
          isLoading={isLoading}
          onRefresh={checkPcStatus}
        />

        <StatusCard
          title="Booter ESP32 status"
          isOnline={esp32Status}
          isLoading={isEsp32Loading}
          onRefresh={checkEsp32Status}
        />

        <ButtonContainer data-testid="pc-control-actions">
          <FancyButton onClick={handleTurnOn} disabled={isTurnOnLoading}>
            {isTurnOnLoading ? "Loading..." : "Turn On/Off"}
          </FancyButton>

          <FancyButton onClick={handleForceTurnOff} variant="destructive" disabled={isTurnOffLoading}>
            {isTurnOffLoading ? "Loading..." : "Force Turn Off"}
          </FancyButton>
        </ButtonContainer>
      </ContentContainer>
    </RootContainer>
  )
}
