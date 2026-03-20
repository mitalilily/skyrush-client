import { alpha, Box, Stack, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import { TbSparkles } from 'react-icons/tb'

interface PageHeadingProps {
  title: string | React.ReactNode
  subtitle?: string
  center?: boolean
  fontSize?: string | number
  icon?: React.ReactNode
}

const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  subtitle,
  center = false,
  fontSize,
  icon = <TbSparkles size={20} />,
}) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 6,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        background: `
          radial-gradient(circle at top left, ${alpha(theme.palette.primary.light, 0.18)} 0%, transparent 26%),
          radial-gradient(circle at top right, ${alpha(theme.palette.secondary.main, 0.18)} 0%, transparent 22%),
          linear-gradient(180deg, rgba(255, 251, 245, 0.96) 0%, rgba(255, 246, 236, 0.94) 100%)
        `,
        px: { xs: 2.2, sm: 3 },
        py: { xs: 2, sm: 2.5 },
        boxShadow: `0 24px 44px ${alpha(theme.palette.text.primary, 0.08)}`,
      }}
    >
      <Stack spacing={1.2} textAlign={center ? 'center' : 'left'} position="relative" zIndex={1}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            justifyContent: center ? 'center' : 'flex-start',
          }}
        >
          <motion.div
            initial={{ rotate: -18, scale: 0.82, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            whileHover={{ rotate: 12, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <Box
              sx={{
                p: 1.2,
                borderRadius: '22px',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.22)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
                color: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                boxShadow: `0 14px 28px ${alpha(theme.palette.text.primary, 0.08)}`,
              }}
            >
              {icon}
            </Box>
          </motion.div>
          <Stack spacing={0.4}>
            <Typography
              sx={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: theme.palette.text.secondary,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
              }}
            >
              Operations canvas
            </Typography>
            <Typography
              fontSize={fontSize ?? { xs: '1.45rem', md: '1.95rem' }}
              fontWeight={800}
              lineHeight={1.08}
              sx={{
                color: theme.palette.text.primary,
                letterSpacing: '-0.03em',
              }}
            >
              {title}
            </Typography>
          </Stack>
        </Stack>

        {subtitle && (
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '0.92rem', md: '0.98rem' },
              maxWidth: center ? 820 : 760,
              mx: center ? 'auto' : 0,
              lineHeight: 1.6,
              fontWeight: 500,
              pl: center ? 0 : { xs: 0, sm: 7.4 },
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}

export default PageHeading
