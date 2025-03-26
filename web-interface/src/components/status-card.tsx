import { Card, CardContent } from '@/components/ui/card'
import { FancyButton } from '@/components/ui-custom/fancy-button'
import styled from 'styled-components'
import { useMemo } from 'react'

interface StatusCardProps {
  title: string
  isOnline: boolean | null
  isLoading: boolean
  onRefresh: () => void
}

const StyledCard = styled(Card)`
  width: 100%;
  background-color: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 -2px 4px rgba(255, 255, 255, 0.05);
`

const StyledCardContent = styled(CardContent)`
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`

const LeftContent = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  flex-shrink: 0;
  padding-right: 1rem;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding-right: 0;
    text-align: center;
  }
`

const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    justify-content: center;
  }
`

const StatusIndicator = styled.span<{ isOnline: boolean }>`
  color: ${props => props.isOnline ? '#22c55e' : '#ef4444'};
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  min-width: 6.5rem;
  text-align: center;
  white-space: nowrap;
  box-shadow: 
    2px 2px 8px rgba(255, 255, 255, 0.1),
    -1px -1px 4px rgba(255, 255, 255, 0.05);
`

const StyledFancyButton = styled(FancyButton)`
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 
    2px 2px 8px rgba(255, 255, 255, 0.1),
    -1px -1px 4px rgba(255, 255, 255, 0.05);
  user-select: none;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

export function StatusCard({ title, isOnline, isLoading, onRefresh }: StatusCardProps) {
  const statusText = useMemo(() => {
    if (isLoading || isOnline === null)
      return 'Loading...'

    return isOnline
      ? '🟢 Online'
      : '🔴 Offline'
  }, [isLoading, isOnline])

  const statusIndicator = useMemo(() => {
    if (isOnline === null)
      return null

    return (
      <StatusIndicator isOnline={isOnline} data-testid="status-card-indicator">
        {statusText}
      </StatusIndicator>
    )
  }, [isOnline, statusText])

  return (
    <StyledCard data-testid="status-card">
      <StyledCardContent data-testid="status-card-content">
        <LeftContent data-testid="status-card-left">
          {title}:
        </LeftContent>

        <RightContent data-testid="status-card-right">
          {statusIndicator}

          <StyledFancyButton onClick={onRefresh} disabled={isLoading} data-testid="status-card-refresh">
            🔄
          </StyledFancyButton>
        </RightContent>
      </StyledCardContent>
    </StyledCard>
  )
} 