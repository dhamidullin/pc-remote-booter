"use client"

import styled from "styled-components"

const StyledBody = styled.body`
  min-height: 100vh;
  margin: 0;
  padding: 0;
`

export function StyledBodyWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <StyledBody className={className}>
      {children}
    </StyledBody>
  )
} 