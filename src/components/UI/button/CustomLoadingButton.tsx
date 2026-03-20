import { Button, CircularProgress, Typography, alpha, type ButtonProps } from '@mui/material'
import React from 'react'

type ButtonVisualVariant = 'solid' | 'text'

interface CustomIconLoadingButtonProps
  extends Omit<ButtonProps, 'color' | 'type' | 'disabled' | 'onClick' | 'variant'> {
  text: string
  icon?: React.ReactNode
  loading?: boolean
  onClick?: () => void
  disabled?: boolean
  loadingText?: string
  type?: 'button' | 'submit' | 'reset'
  styles?: Record<string, unknown>
  variant?: ButtonVisualVariant
  textColor?: string
}

const NAVY = '#0C3B80'
const NAVY_DARK = '#082A57'
const TEXT = '#241A1B'

export default function CustomIconLoadingButton({
  text,
  icon,
  loading = false,
  onClick,
  disabled = false,
  loadingText = 'Loading...',
  type = 'button',
  styles,
  textColor,
  variant = 'solid',
  ...rest
}: CustomIconLoadingButtonProps) {
  const isDisabled = loading || disabled

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        ...styles,
        px: 3,
        py: 1.25,
        textTransform: 'none',
        fontWeight: 700,
        gap: 1,
        borderRadius: 999,
        backgroundColor: variant === 'solid' ? NAVY : 'rgba(255,255,255,0.72)',
        backgroundImage:
          variant === 'solid'
            ? `linear-gradient(135deg, ${NAVY} 0%, #14539D 100%)`
            : 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,245,233,0.92) 100%)',
        color: textColor ?? (variant === 'solid' ? '#fff' : TEXT),
        border:
          variant === 'text' ? `1px solid ${alpha(NAVY, 0.18)}` : '1px solid rgba(12,59,128,0.06)',
        boxShadow:
          variant === 'solid'
            ? `0 12px 28px ${alpha(NAVY, 0.28)}`
            : `0 10px 20px ${alpha(TEXT, 0.05)}`,
        '&:hover': {
          backgroundColor: variant === 'solid' ? NAVY_DARK : 'rgba(12,59,128,0.04)',
          backgroundImage:
            variant === 'solid'
              ? `linear-gradient(135deg, ${NAVY_DARK} 0%, #0C3B80 100%)`
              : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,245,233,1) 100%)',
        },
        '&:disabled': {
          opacity: 0.58,
          cursor: 'not-allowed',
          backgroundColor: variant === 'solid' ? NAVY : 'rgba(255,255,255,0.72)',
          color: textColor ?? (variant === 'solid' ? '#fff' : alpha(TEXT, 0.5)),
          borderColor: variant === 'text' ? alpha(NAVY, 0.1) : alpha(NAVY, 0.05),
        },
      }}
      {...rest}
    >
      {loading ? (
        <>
          <CircularProgress size={16} thickness={4} sx={{ color: 'currentColor' }} />
          <Typography variant="body2" sx={{ color: 'inherit', fontWeight: 700 }}>
            {loadingText}
          </Typography>
        </>
      ) : (
        <>
          {icon}
          <Typography variant="body2" sx={{ color: 'inherit', fontWeight: 700 }}>
            {text}
          </Typography>
        </>
      )}
    </Button>
  )
}
