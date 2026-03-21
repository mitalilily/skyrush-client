import {
  alpha,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from 'react-icons/tb'
import GlobalSearch from './GlobalSearch'
import QuickActions from './QuickActions'
import UserMenu from './UserMenu'
import WalletMenu from './WalletMenu'

interface NavbarProps {
  handleDrawerToggle: () => void
  pinned: boolean
  name?: string
}

const TEXT_PRIMARY = '#171310'
const TEXT_SECONDARY = '#75685D'
const SURFACE = '#FFFCF8'
const INK = '#171310'
const CLAY = '#D97943'

const sectionLinks = [
  { label: 'Overview', path: '/home' },
  { label: 'Shipments', path: '/orders/list' },
  { label: 'Finance', path: '/billing/invoice_management' },
  { label: 'Support', path: '/support/tickets' },
]

export default function Navbar({ handleDrawerToggle, pinned }: NavbarProps) {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const showWideDesktopNav = useMediaQuery('(min-width:1760px)')

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 2, md: 2.6 },
        py: { xs: 1.25, md: 1.45 },
        mb: { xs: 0.4, md: 0.7 },
        bgcolor: 'transparent',
        display: 'flex',
        alignItems: 'stretch',
        zIndex: (muiTheme) => muiTheme.zIndex.appBar,
        position: 'sticky',
        top: 0,
      }}
    >
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ width: '100%' }}
      >
        <Stack
          direction={showWideDesktopNav ? 'row' : 'column'}
          spacing={showWideDesktopNav ? 1.4 : 1.1}
          alignItems={showWideDesktopNav ? 'center' : 'stretch'}
          justifyContent="space-between"
          sx={{
            width: '100%',
            borderRadius: 8,
            border: `1px solid ${alpha(INK, 0.08)}`,
            backgroundColor: alpha(SURFACE, 0.94),
            backdropFilter: 'blur(16px)',
            boxShadow: `0 18px 34px ${alpha(TEXT_PRIMARY, 0.08)}`,
            px: { xs: 1.2, sm: 1.6, md: 2.1 },
            py: { xs: 1.1, md: 1.25 },
          }}
        >
          <Stack
            direction="row"
            spacing={1.4}
            alignItems="center"
            justifyContent="space-between"
            sx={{ minWidth: 0, width: showWideDesktopNav ? 'auto' : '100%' }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center" minWidth={0}>
              <IconButton
                size="small"
                onClick={handleDrawerToggle}
                sx={{
                  bgcolor: alpha(INK, 0.05),
                  borderRadius: 3,
                  border: `1px solid ${alpha(INK, 0.08)}`,
                  color: INK,
                  width: { xs: 38, sm: 42 },
                  height: { xs: 38, sm: 42 },
                  '&:hover': {
                    bgcolor: alpha(INK, 0.08),
                  },
                }}
              >
                {isTablet ? (
                  <TbLayoutSidebarRightCollapseFilled size={18} />
                ) : pinned ? (
                  <TbLayoutSidebarLeftCollapseFilled size={18} />
                ) : (
                  <TbLayoutSidebarRightCollapseFilled size={18} />
                )}
              </IconButton>

              <Box
                sx={{ cursor: 'pointer', minWidth: 0, flex: 1 }}
                onClick={() => navigate('/home')}
              >
                <Stack direction="row" spacing={1.3} alignItems="center" minWidth={0}>
                  <Box
                    component="img"
                    src="/logo/skyrush-logo.png"
                    alt="SkyRush Express Courier"
                    sx={{ width: { xs: 138, sm: 170 }, height: 'auto', display: 'block', flexShrink: 0 }}
                  />
                  {showWideDesktopNav && (
                    <Stack spacing={0.25} minWidth={0}>
                      <Typography
                        sx={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.18em',
                          color: TEXT_SECONDARY,
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        SkyRush express courier
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>
            </Stack>

            {showWideDesktopNav && (
              <Stack
                direction="row"
                spacing={0.6}
                alignItems="center"
                sx={{
                  p: 0.7,
                  borderRadius: 999,
                  border: `1px solid ${alpha(INK, 0.08)}`,
                  backgroundColor: alpha('#ffffff', 0.72),
                  boxShadow: `0 8px 18px ${alpha(TEXT_PRIMARY, 0.04)}`,
                }}
              >
                {sectionLinks.map((link) => {
                  const active = location.pathname.startsWith(link.path.split('?')[0])
                  return (
                    <Button
                      key={link.label}
                      onClick={() => navigate(link.path)}
                      sx={{
                        px: 1.8,
                        py: 0.9,
                        borderRadius: 999,
                        color: active ? INK : TEXT_SECONDARY,
                        backgroundColor: active ? alpha(CLAY, 0.12) : 'transparent',
                        fontWeight: active ? 800 : 700,
                        '&:hover': {
                          backgroundColor: alpha(CLAY, 0.09),
                        },
                      }}
                    >
                      {link.label}
                    </Button>
                  )
                })}
              </Stack>
            )}
          </Stack>

          <Stack
            direction="row"
            spacing={{ xs: 0.8, sm: 1.1, md: 1.2 }}
            alignItems="center"
            justifyContent={showWideDesktopNav ? 'flex-end' : 'space-between'}
            useFlexGap
            sx={{
              flex: '1 1 auto',
              minWidth: 0,
              flexWrap: 'wrap',
              rowGap: 0.85,
              width: showWideDesktopNav ? 'auto' : '100%',
            }}
          >
            {showWideDesktopNav && <GlobalSearch />}

            <Button
              variant="contained"
              onClick={() => navigate('/orders/create')}
              sx={{
                backgroundColor: INK,
                color: '#ffffff',
                minWidth: 'fit-content',
                px: 2.1,
                whiteSpace: 'nowrap',
                '&:hover': {
                  backgroundColor: '#0D0A08',
                },
              }}
            >
              Create shipment
            </Button>

            <WalletMenu />
            <QuickActions />
            <UserMenu />
          </Stack>
        </Stack>
      </motion.div>
    </Box>
  )
}
