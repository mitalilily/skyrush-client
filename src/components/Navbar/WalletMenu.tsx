import { alpha, Box, Button, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FaWallet } from 'react-icons/fa'
import { useAuth } from '../../context/auth/AuthContext'
import { useWalletBalance } from '../../hooks/useWalletBalance'
import AddMoneyDialog from '../AddMoneyDialog'

const NAVY = '#0C3B80'
const ORANGE = '#F57C00'
const TEXT_PRIMARY = '#241A1B'

const WalletMenu = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const { walletBalance, setWalletBalance } = useAuth()

  const { data, isLoading } = useWalletBalance(true)

  useEffect(() => {
    const balance = Number((data as any)?.data?.balance ?? data)
    if (!isNaN(balance)) {
      setWalletBalance(balance)
    } else {
      setWalletBalance(0)
    }
  }, [data, setWalletBalance])

  return (
    <>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
          px: { xs: 1.5, sm: 2 },
          py: { xs: 0.8, sm: 1 },
          borderRadius: 3,
          bgcolor: alpha(NAVY, 0.05),
          border: `1px solid ${alpha(NAVY, 0.12)}`,
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: alpha(NAVY, 0.08),
            borderColor: alpha(NAVY, 0.3),
            transform: 'translateY(-1px)',
            boxShadow: `0 8px 24px ${alpha(NAVY, 0.1)}`,
          },
        }}
        onClick={() => setDialogOpen(true)}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(ORANGE, 0.12),
            color: ORANGE,
          }}
        >
          <FaWallet size={15} />
        </Box>

        <Typography
          variant="body2"
          fontWeight={800}
          sx={{
            minWidth: 50,
            color: TEXT_PRIMARY,
            fontSize: { xs: '13px', sm: '14px' },
            letterSpacing: -0.2,
          }}
        >
          {isLoading || walletBalance === null ? (
            <Skeleton variant="text" width={40} height={20} sx={{ bgcolor: alpha(NAVY, 0.1) }} />
          ) : (
            `INR ${walletBalance?.toLocaleString('en-IN')}`
          )}
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={{
            ml: { xs: 0.5, sm: 1 },
            fontSize: '11px',
            bgcolor: ORANGE,
            color: '#FFFFFF',
            textTransform: 'none',
            letterSpacing: 0.3,
            borderRadius: 999,
            px: { xs: 1, sm: 1.5 },
            py: 0.5,
            fontWeight: 800,
            boxShadow: `0 4px 12px ${alpha(ORANGE, 0.2)}`,
            '&:hover': {
              bgcolor: '#CC5E00',
              boxShadow: `0 6px 16px ${alpha(ORANGE, 0.3)}`,
            },
          }}
          onClick={(e) => {
            e.stopPropagation()
            setDialogOpen(true)
          }}
        >
          Recharge
        </Button>
      </Box>

      <AddMoneyDialog
        currentBalance={walletBalance ?? 0}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </>
  )
}

export default WalletMenu
