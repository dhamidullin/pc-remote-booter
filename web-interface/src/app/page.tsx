import CheckTokenBeforeRender from "@/components/auth/CheckTokenBeforeRender"
import LoginController from "@/components/auth/LoginController"
import PcControl from "@/components/pc-control"

export default function Home() {
  return (
    <>
      <CheckTokenBeforeRender>
        <LoginController>
          <PcControl />
        </LoginController>
      </CheckTokenBeforeRender>
    </>
  )
}
