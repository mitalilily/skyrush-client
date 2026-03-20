import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, alpha } from '@mui/material'
import React from 'react'
import { FiX } from 'react-icons/fi'

const NAVY = '#0C3B80'
const ORANGE = '#F57C00'
const TEXT = '#241A1B'

interface CustomDialogProps {
  open: boolean
  onClose: () => void
  title?: string | React.ReactElement
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  borderRadius?: number
  footer?: React.ReactNode
  width?: string
  fullScreen?: boolean
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  footer,
  fullScreen,
  width,
}) => {
  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={onClose}
      fullWidth
      maxWidth={width ? false : maxWidth}
      PaperProps={{
        sx: {
          borderRadius: 6,
          p: 0,
          background: `
            radial-gradient(460px 180px at 0% 0%, rgba(44, 143, 255, 0.09) 0%, transparent 70%),
            radial-gradient(460px 180px at 100% 0%, rgba(245, 124, 0, 0.10) 0%, transparent 72%),
            #fffdf8
          `,
          border: '1px solid rgba(12, 59, 128, 0.16)',
          color: TEXT,
          boxShadow: '0 26px 60px rgba(36, 26, 27, 0.16)',
          minWidth: { xs: 'unset', sm: 360 },
          mx: { xs: 1, sm: 0 },
          width: width || 'auto',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: `linear-gradient(90deg, ${NAVY} 0%, ${ORANGE} 100%)`,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          pt: { xs: 2.6, sm: 3 },
          pb: { xs: 1.4, sm: 1.6 },
          px: { xs: 2, sm: 2.8 },
          fontWeight: 800,
          fontSize: { xs: '1.04rem', sm: '1.18rem' },
          color: NAVY,
          borderBottom: `1px solid ${alpha(NAVY, 0.12)}`,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: { xs: 8, sm: 12 },
            top: { xs: 9, sm: 11 },
            color: NAVY,
            bgcolor: alpha(NAVY, 0.06),
            width: { xs: 32, sm: 36 },
            height: { xs: 32, sm: 36 },
            '&:hover': {
              bgcolor: alpha(ORANGE, 0.12),
              color: ORANGE,
              transform: 'rotate(90deg)',
            },
            transition: 'all 0.3s ease',
          }}
          aria-label="Close dialog"
        >
          <FiX size={20} />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          px: { xs: 2, sm: 2.8 },
          py: { xs: 1.8, sm: 2.2 },
          borderBottom: footer ? `1px solid ${alpha(NAVY, 0.08)}` : 'none',
        }}
      >
        {children}
      </DialogContent>
      {footer && (
        <DialogActions sx={{ p: { xs: 1.6, sm: 2 }, borderTop: 'none', bgcolor: alpha(NAVY, 0.015) }}>
          {footer}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default CustomDialog
