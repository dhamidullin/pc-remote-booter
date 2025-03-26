import { useState } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

const StyledButton = styled.button`
  background-color: #3B82F6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background-color: #2563EB;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

interface LoginFormProps {
  onSubmit: (password: string) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.onSubmit(password)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormGroup>
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
      </FormGroup>

      <StyledButton type="submit">Login</StyledButton>
    </StyledForm>
  )
}
