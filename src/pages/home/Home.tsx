import { alpha, Box, Button, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TbArrowRight,
  TbBolt,
  TbMap2,
  TbReceiptRupee,
  TbWorld,
} from 'react-icons/tb'
import { DoorstepCourierScene, RollingVanScene } from '../../components/branding/AnimatedCourierScene'
import AccountSetup from '../../components/home/AccountSetup'
import CarrierLogos from '../../components/home/CarrierLogos'
import CourierDistribution from '../../components/home/CourierDistribution'
import FeatureSection from '../../components/home/FeatureSection'
import GettingStarted from '../../components/home/GettingStarted'
import TopDestinations from '../../components/home/TopDestinations'
import UpcomingPickupsHome from '../../components/home/UpcomingPickupsHome'
import SectionHeading from '../../components/UI/SectionHeading'
import { useRealtimeHomeDashboard } from '../../hooks/home/useRealtimeHomeDashboard'

const SKY = '#171310'
const SKY_DARK = '#0D0A08'
const ORANGE = '#D97943'
const SAND = '#DEC4A6'
const TEXT_PRIMARY = '#171310'
const TEXT_SECONDARY = '#74685D'

const heroStats = [
  { value: '24/7', label: 'tracking pulse', icon: <TbWorld size={18} /> },
  { value: '1', label: 'clean ops desk', icon: <TbBolt size={18} /> },
  { value: 'Fast', label: 'rate decisions', icon: <TbReceiptRupee size={18} /> },
]

const quickBoards = [
  {
    title: 'Pickup pulse',
    note: 'Monitor dispatch, pickup calls, and new handoffs from one feed.',
  },
  {
    title: 'Coverage lens',
    note: 'Compare serviceability and partner reach before every promise.',
  },
  {
    title: 'Courier cost view',
    note: 'Scan freight, COD, and billing movement without jumping screens.',
  },
]

const cardShell = {
  borderRadius: 4,
  p: { xs: 2, md: 2.75 },
  bgcolor: '#fffdf8',
  border: `1px solid ${alpha(SKY, 0.08)}`,
  boxShadow: `0 16px 32px ${alpha(TEXT_PRIMARY, 0.05)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: `0 24px 48px ${alpha(TEXT_PRIMARY, 0.08)}`,
    borderColor: alpha(SKY, 0.16),
    transform: 'translateY(-4px)',
  },
}

const Home = () => {
  const navigate = useNavigate()
  const { incomingPickupsState, courierDistributionState, topDestinationsState } =
    useRealtimeHomeDashboard()

  return (
    <Stack spacing={{ xs: 3, md: 4.4 }} sx={{ pb: 5.5 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', xl: '1.35fr 0.92fr' },
          gap: 2.6,
          alignItems: 'stretch',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Box
            sx={{
              p: { xs: 2.6, md: 4 },
              minHeight: { md: 420 },
              borderRadius: 5,
              background: `
                radial-gradient(circle at 12% 10%, ${alpha(SAND, 0.34)} 0%, transparent 34%),
                radial-gradient(circle at 88% 12%, ${alpha(ORANGE, 0.12)} 0%, transparent 28%),
                linear-gradient(135deg, #fffdf8 0%, #f6efe5 100%)
              `,
              position: 'relative',
              color: TEXT_PRIMARY,
              border: `1px solid ${alpha(SKY, 0.12)}`,
              boxShadow: `0 22px 52px ${alpha(TEXT_PRIMARY, 0.08)}`,
              overflow: 'hidden',
            }}
          >
            <Stack spacing={2.6} sx={{ position: 'relative', zIndex: 1 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1.8}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.4} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                  <Box
                    component="img"
                    src="/logo/skyrush-logo.png"
                    alt="SkyRush Express Courier"
                    sx={{ width: { xs: 176, md: 214 }, height: 'auto', flexShrink: 0 }}
                  />
                  <Stack spacing={0.45} sx={{ maxWidth: 320 }}>
                    <Typography
                      sx={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: SKY,
                      }}
                    >
                      Brand-led command desk
                    </Typography>
                    <Typography sx={{ fontSize: '0.82rem', color: TEXT_SECONDARY }}>
                      Editorial layout, lighter blocks, faster operational scanning.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', md: '1.08rem' },
                        fontWeight: 800,
                        color: ORANGE,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Har parcel tezi se manzil tak
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {['Fast bookings', 'Pickup visibility', 'Courier comparisons'].map((chip) => (
                    <Box
                      key={chip}
                      sx={{
                        px: 1.5,
                        py: 0.95,
                        borderRadius: 1.5,
                        border: `1px solid ${alpha(SKY, 0.1)}`,
                        bgcolor: alpha('#ffffff', 0.72),
                        color: TEXT_PRIMARY,
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        boxShadow: `0 8px 18px ${alpha(TEXT_PRIMARY, 0.04)}`,
                      }}
                    >
                      {chip}
                    </Box>
                  ))}
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.1rem', md: '3.75rem' },
                    fontWeight: 800,
                    lineHeight: 0.98,
                    letterSpacing: '-0.05em',
                    maxWidth: 700,
                  }}
                >
                  Book quicker.
                  <br />
                  Run courier ops from a cleaner, lighter control board.
                </Typography>

                <Typography
                  sx={{
                    fontSize: '1rem',
                    color: TEXT_SECONDARY,
                    maxWidth: 610,
                    lineHeight: 1.7,
                  }}
                >
                  This surface is rebuilt with stronger hierarchy, calmer spacing, and cleaner
                  sectioning so rates, pickups, tracking, and billing feel like one designed flow.
                </Typography>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.4}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<TbArrowRight size={18} />}
                  onClick={() => navigate('/orders/create')}
                  sx={{
                    bgcolor: SKY,
                    color: '#ffffff',
                    fontWeight: 700,
                    px: 3.2,
                    '&:hover': { bgcolor: SKY_DARK, transform: 'translateY(-2px)' },
                    transition: 'all 0.2s',
                  }}
                >
                  Create order
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/tools/rate_calculator')}
                  sx={{
                    borderColor: alpha(ORANGE, 0.32),
                    color: TEXT_PRIMARY,
                    fontWeight: 700,
                    px: 3.2,
                    bgcolor: alpha('#ffffff', 0.56),
                    '&:hover': { borderColor: ORANGE, bgcolor: alpha('#ffffff', 0.86) },
                  }}
                >
                  Open rate calculator
                </Button>
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                  gap: 1.4,
                  mt: 'auto',
                }}
              >
                {heroStats.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: `1px solid ${alpha(SKY, 0.08)}`,
                      background: alpha('#ffffff', 0.76),
                      boxShadow: `0 10px 22px ${alpha(TEXT_PRIMARY, 0.04)}`,
                    }}
                  >
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 2,
                          bgcolor: alpha(ORANGE, 0.12),
                          color: ORANGE,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: SKY }}>
                          {item.value}
                        </Typography>
                        <Typography sx={{ fontSize: '0.82rem', color: TEXT_SECONDARY }}>
                          {item.label}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Box>
        </motion.div>

        <Stack spacing={2.4}>
          <RollingVanScene />
          <Box
            sx={{
              ...cardShell,
              p: 2.4,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1.05fr 0.95fr' },
              gap: 2,
              alignItems: 'stretch',
            }}
          >
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    bgcolor: alpha(SKY, 0.08),
                    color: SKY,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TbMap2 size={18} />
                </Box>
                <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: TEXT_PRIMARY }}>
                  Ops board highlights
                </Typography>
              </Stack>

              {quickBoards.map((board) => (
                <Box
                  key={board.title}
                  sx={{
                    p: 1.6,
                    borderRadius: 2.5,
                    border: `1px solid ${alpha(SKY, 0.08)}`,
                    bgcolor: alpha('#fff8ef', 0.86),
                  }}
                >
                  <Typography sx={{ fontWeight: 800, color: TEXT_PRIMARY, mb: 0.4 }}>
                    {board.title}
                  </Typography>
                  <Typography sx={{ color: TEXT_SECONDARY, fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {board.note}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <DoorstepCourierScene compact />
          </Box>
        </Stack>
      </Box>

      <Box>
        <SectionHeading
          title="Dispatch command center"
          subtitle="Primary setup, funding, and readiness blocks styled as calmer product panels."
          icon={<TbBolt size={22} />}
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Box sx={cardShell}>
              <GettingStarted />
            </Box>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Box sx={cardShell}>
              <AccountSetup />
            </Box>
          </motion.div>
        </Box>
      </Box>

      <Box>
        <SectionHeading
          title="Courier intelligence"
          subtitle="Performance signals for lanes, partners, and top shipment zones with a clearer two-panel split."
          icon={<TbBolt size={22} />}
          color={ORANGE}
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.35fr 0.95fr' },
            gap: 3,
          }}
        >
          <Box sx={cardShell}>
            <TopDestinations
              data={topDestinationsState.data}
              isLoading={topDestinationsState.isLoading}
              error={topDestinationsState.error}
            />
          </Box>
          <Box sx={cardShell}>
            <CourierDistribution
              data={courierDistributionState.data}
              isLoading={courierDistributionState.isLoading}
              error={courierDistributionState.error}
            />
          </Box>
        </Box>
      </Box>

      <FeatureSection />
      <CarrierLogos />

      <Box>
        <SectionHeading
          title="Active dispatch queue"
          subtitle="Upcoming parcel work that still needs your attention."
          icon={<TbBolt size={22} />}
        />
        <Box sx={cardShell}>
          <UpcomingPickupsHome
            data={incomingPickupsState.data}
            isLoading={incomingPickupsState.isLoading}
            error={incomingPickupsState.error}
          />
        </Box>
      </Box>
    </Stack>
  )
}

export default Home
