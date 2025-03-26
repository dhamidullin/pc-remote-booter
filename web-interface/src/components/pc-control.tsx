"use client"
import { Card, CardContent } from "@/components/ui/card"
import { FancyButton } from "@/components/ui-custom/fancy-button"
import { forceShutOffPC, turnOnPC, pingTargetPC, pingEsp32 } from "@/lib/api"
import { startTransition, useActionState, useEffect } from "react"

export default function PcControl() {
  const [_turnOnState, handleTurnOn, isTurnOnPending] = useActionState(async () => {
    await turnOnPC()
  }, null)

  const [_forceTurnOffState, handleForceTurnOff, isForceTurnOffPending] = useActionState(async () => {
    await forceShutOffPC()
  }, null)

  const [pingState, fetchPing, isPending] = useActionState(async () => {
    const res = await pingTargetPC()
    return res.online
  }, null)

  const [pingStateEsp32, fetchPingEsp32, isPendingEsp32] = useActionState(async () => {
    const res = await pingEsp32()
    return res.online
  }, null)

  const actions = {
    handleTurnOn: () => startTransition(() => handleTurnOn()),
    handleForceTurnOff: () => startTransition(() => handleForceTurnOff()),
    fetchPing: () => startTransition(() => fetchPing()),
    fetchPingEsp32: () => startTransition(() => fetchPingEsp32()),
  }

  useEffect(() => {
    actions.fetchPing()
    actions.fetchPingEsp32()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <Card className="w-96 text-center shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold whitespace-nowrap">
            PC Status:
            {
              (isPending || pingState == null)
                ? "Loading..."
                : pingState
                  ? <span className="text-green-500">🟢 Online</span>
                  : <span className="text-green-500">🔴 Offline</span>
            }

            <FancyButton className="outline-0" onClick={actions.fetchPing} disabled={isPending}>
              🔄
            </FancyButton>
          </h2>
        </CardContent>
      </Card>

      <Card className="w-96 text-center shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold whitespace-nowrap">
            Booter ESP32 status:
            {
              (isPendingEsp32 || pingEsp32 == null)
                ? "Loading..."
                : pingStateEsp32
                  ? <span className="text-green-500">🟢 Online</span>
                  : <span className="text-green-500">🔴 Offline</span>
            }

            <FancyButton className="outline-0" onClick={actions.fetchPingEsp32} disabled={isPendingEsp32}>
              🔄
            </FancyButton>
          </h2>
        </CardContent>
      </Card>

      <div className="flex gap-4 flex-wrap justify-center">
        <FancyButton onClick={actions.handleTurnOn} disabled={isTurnOnPending}>
          {isTurnOnPending ? "Loading..." : "Turn On"}
        </FancyButton>

        <FancyButton onClick={actions.handleForceTurnOff} variant="destructive" disabled={isForceTurnOffPending}>
          {isForceTurnOffPending ? "Loading..." : "Force Turn Off"}
        </FancyButton>
      </div>
    </div>
  )
}
