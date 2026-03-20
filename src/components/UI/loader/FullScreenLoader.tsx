import { Box } from '@mui/material'
import React from 'react'
import './loader.css'
// Replace this with your actual logo path or import
import Logo from '/logo/skyrush-logo.png'

type Props = {
  night?: boolean
}

const FullScreenLoader: React.FC<Props> = ({ night = false }) => {
  return (
    <Box className={`loader-overlay ${night ? 'night' : ''}`}>
      <Box className="loader-content">
        <div className="logo-container">
          <img src={Logo} alt="SkyRush Express Courier Logo" className="loader-logo" />
        </div>
        <div style={{ color: '#0A4EA3', fontWeight: 900, letterSpacing: 1.2, fontSize: '0.76rem' }}>
          SKYRUSH EXPRESS COURIER
        </div>
      </Box>
    </Box>
  )
}

export default FullScreenLoader
