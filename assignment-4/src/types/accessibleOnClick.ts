import { MouseEvent } from 'react'

export function accessibleOnClick(
  handler: (newValue: MouseEvent<HTMLDivElement>) => void,
) {
  return {
    role: 'button',
    onClick: handler,
  }
}
