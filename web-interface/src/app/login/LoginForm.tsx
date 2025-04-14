import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Georgia', serif;
  font-style: italic;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
  letter-spacing: 0.5px;
`

const StyledInput = styled.input`
  padding: 0.875rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`

const StyledButton = styled.button`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
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
    <Container>
      <Title>This is my personal project, you probably have nothing to do here<br />
        <small style={{ fontSize: '1.2rem', opacity: 0.8 }}>Source code available at: <a href="https://github.com/dhamidullin/pc-remote-booter" target="_blank" rel="noopener noreferrer" style={{ color: '#4299e1', textDecoration: 'none' }}>https://github.com/dhamidullin/pc-remote-booter</a></small>
      </Title>

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
    </Container>
  )
}
