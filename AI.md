# AI Agent Guidelines

## Core Principles
1. Add `data-testid` attributes to styled components in JSX so they are easier to find and debug
2. Keep answers short and concise
3. Never implement implicit content or make assumptions ahead of provided instructions
4. Never go ahead of human's mind - wait for explicit instructions

## data-testid Naming Convention
- Use descriptive names that indicate component and feature
- Format: `component-feature`
- Example: `status-card-refresh`, `pc-control-actions`

## Code Style
- Move data-testid attributes to JSX template
- Use 2 spaces for indentation
- Add extra empty line between sibling components (same nesting level)
- No semicolons in JS/JSX
- Use single quotes for strings
