import {
  alpha,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { BiInfoCircle, BiListPlus } from 'react-icons/bi'
import { CgTrack } from 'react-icons/cg'
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { FaClipboardList as FaFileAlt, FaMoneyBill, FaToolbox } from 'react-icons/fa6'
import { HiDocumentReport } from 'react-icons/hi'
import {
  MdAccountBalanceWallet,
  MdDashboard,
  MdExpandMore,
  MdHelp,
  MdHome,
  MdKeyboardReturn,
  MdOutlineAddBusiness,
  MdOutlineRateReview,
  MdShoppingCart,
  MdSyncAlt,
  MdSyncProblem,
} from 'react-icons/md'
import { RiSettings2Fill } from 'react-icons/ri'
import { TbInvoice, TbReportAnalytics, TbTransactionRupee } from 'react-icons/tb'
import { NavLink, useLocation } from 'react-router-dom'

import type { JSX } from '@emotion/react/jsx-runtime'
import { DRAWER_WIDTH } from '../../utils/constants'
import { isActive } from '../../utils/functions'

const TEXT_SECONDARY = '#74685D'
const SKY = '#171310'
const ORANGE = '#D97943'
const SURFACE = '#FFFCF8'
const FOOTER_TINT = '#F6EFE6'

export type Role = 'customer' | 'admin'

export interface SubItem {
  text: string
  path: string
  icon?: JSX.Element
}

export interface NavItem {
  text: string
  icon: JSX.Element
  path: string
  roles: Role[]
  children?: SubItem[]
}

interface SidebarProps {
  role?: Role
  pinned: boolean
  handleDrawerToggle: () => void
  setHovered: Dispatch<SetStateAction<boolean>>
  hovered: boolean
}

export const COLLAPSED_WIDTH = 80

const STANDARD_ICON_SIZE = 19
const navItems: NavItem[] = [
  { text: 'Home', icon: <MdHome size={STANDARD_ICON_SIZE} />, path: '/home', roles: ['customer', 'admin'] },
  { text: 'Dashboard', icon: <MdDashboard size={STANDARD_ICON_SIZE} />, path: '/dashboard', roles: ['customer', 'admin'] },
  {
    text: 'Shipment Control',
    icon: <MdShoppingCart size={STANDARD_ICON_SIZE} />,
    path: '/orders',
    roles: ['customer', 'admin'],
    children: [
      { text: 'All Shipments', path: '/orders/list', icon: <FaFileAlt size={STANDARD_ICON_SIZE} /> },
      { text: 'B2C Shipments', path: '/orders/b2c/list', icon: <MdOutlineAddBusiness size={STANDARD_ICON_SIZE} /> },
      { text: 'B2B Shipments', path: '/orders/b2b/list', icon: <MdOutlineAddBusiness size={STANDARD_ICON_SIZE} /> },
      { text: 'Create Shipment', path: '/orders/create', icon: <BiListPlus size={STANDARD_ICON_SIZE} /> },
    ],
  },
  {
    text: 'Operations',
    icon: <MdSyncAlt size={STANDARD_ICON_SIZE} />,
    path: '/ops',
    roles: ['customer', 'admin'],
    children: [
      { text: 'NDR', path: '/ops/ndr', icon: <MdSyncProblem size={STANDARD_ICON_SIZE} /> },
      { text: 'RTO', path: '/ops/rto', icon: <MdKeyboardReturn size={STANDARD_ICON_SIZE} /> },
    ],
  },
  {
    text: 'Finance Desk',
    icon: <FaMoneyBill size={STANDARD_ICON_SIZE} />,
    path: '/billing',
    roles: ['customer', 'admin'],
    children: [
      { text: 'Wallet Transactions', path: '/billing/wallet_transactions', icon: <TbTransactionRupee size={STANDARD_ICON_SIZE} /> },
      { text: 'COD Remittance', path: '/cod-remittance', icon: <MdAccountBalanceWallet size={STANDARD_ICON_SIZE} /> },
      { text: 'Invoice', path: '/billing/invoice_management', icon: <TbInvoice size={STANDARD_ICON_SIZE} /> },
    ],
  },
  {
    text: 'Reconciliation',
    icon: <FaBalanceScaleLeft size={STANDARD_ICON_SIZE} />,
    path: '/reconciliation',
    roles: ['customer', 'admin'],
    children: [
      { text: 'Weight', path: '/reconciliation/weight', icon: <FaBalanceScaleLeft size={STANDARD_ICON_SIZE} /> },
      { text: 'Weight Settings', path: '/reconciliation/weight/settings', icon: <RiSettings2Fill size={STANDARD_ICON_SIZE} /> },
    ],
  },
  {
    text: 'Tools',
    icon: <FaToolbox size={STANDARD_ICON_SIZE} />,
    path: '/tools',
    roles: ['customer', 'admin'],
    children: [
      { text: 'Rate Card', path: '/tools/rate_card', icon: <MdOutlineRateReview size={STANDARD_ICON_SIZE} /> },
      { text: 'Rate Calculator', path: '/tools/rate_calculator', icon: <TbReportAnalytics size={STANDARD_ICON_SIZE} /> },
      { text: 'Order Tracking', path: '/tools/order_tracking', icon: <CgTrack size={STANDARD_ICON_SIZE} /> },
    ],
  },
  { text: 'Reports', icon: <HiDocumentReport size={STANDARD_ICON_SIZE} />, path: '/reports', roles: ['customer', 'admin'] },
  { text: 'Settings', icon: <RiSettings2Fill size={STANDARD_ICON_SIZE} />, path: '/settings', roles: ['customer', 'admin'] },
  {
    text: 'Help Center',
    icon: <MdHelp size={STANDARD_ICON_SIZE} />,
    path: '/support',
    roles: ['customer', 'admin'],
    children: [
      { text: 'Raise Ticket', path: '/support/tickets', icon: <BiListPlus size={STANDARD_ICON_SIZE} /> },
      { text: 'About Us', path: '/support/about_us', icon: <BiInfoCircle size={STANDARD_ICON_SIZE} /> },
    ],
  },
]

const navGroups = [
  { label: 'Overview', items: ['Home', 'Dashboard'] },
  { label: 'Shipments', items: ['Shipment Control', 'Operations', 'Reconciliation'] },
  { label: 'Revenue', items: ['Finance Desk', 'Tools', 'Reports'] },
  { label: 'Support', items: ['Settings', 'Help Center'] },
]

export default function Sidebar({
  role = 'customer',
  pinned,
  hovered,
  setHovered,
}: SidebarProps) {
  const location = useLocation()
  const theme = useTheme()
  const isSidebarExpanded = pinned || hovered

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!isSidebarExpanded) setExpandedItems({})
  }, [isSidebarExpanded])

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const activeItemSx = {
    bgcolor: alpha(SKY, 0.08),
    color: SKY,
    '& .MuiListItemIcon-root': { color: SKY },
    '& .MuiListItemText-primary': { fontWeight: 800 },
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '12%',
      height: '76%',
      width: '4px',
      bgcolor: ORANGE,
      borderRadius: '0 6px 6px 0',
    },
  }

  const navItemSx = {
    mx: 0,
    my: 0.4,
    borderRadius: 3,
    py: 1.05,
    px: 1.7,
    color: TEXT_SECONDARY,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      bgcolor: alpha(SKY, 0.05),
      color: SKY,
      '& .MuiListItemIcon-root': { color: SKY },
    },
  }

  const renderNavList = (items: NavItem[]) => (
    <List disablePadding>
      {items.map((item) => {
        const isSelected = isActive(location.pathname, item.path)
        const hasChildren = Boolean(item.children?.length)
        const isExpanded = expandedItems[item.text]
        const childSelected = Boolean(item.children?.some((sub) => isActive(location.pathname, sub.path)))
        const showExpanded = isSidebarExpanded && isExpanded

        return (
          <Box key={item.text}>
            <ListItemButton
              component={hasChildren ? 'div' : NavLink}
              to={hasChildren ? undefined : item.path}
              onClick={hasChildren ? () => toggleExpand(item.text) : undefined}
              sx={{
                ...navItemSx,
                justifyContent: isSidebarExpanded ? 'flex-start' : 'center',
                px: isSidebarExpanded ? 1.6 : 1.1,
                ...(isSelected && !hasChildren ? activeItemSx : {}),
                ...(hasChildren && childSelected
                  ? {
                      bgcolor: alpha(SKY, 0.06),
                      color: SKY,
                      '& .MuiListItemIcon-root': { color: SKY },
                    }
                  : {}),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: isSidebarExpanded ? 40 : 0,
                  justifyContent: 'center',
                  color: isSelected || childSelected ? SKY : 'inherit',
                  transition: 'color 0.2s',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isSidebarExpanded ? (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.88rem',
                    fontWeight: isSelected || childSelected ? 800 : 600,
                    letterSpacing: '-0.01em',
                  }}
                />
              ) : null}
              {hasChildren && isSidebarExpanded ? (
                <MdExpandMore
                  style={{
                    transform: showExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                    color: showExpanded ? SKY : 'inherit',
                  }}
                />
              ) : null}
            </ListItemButton>

            {hasChildren && isSidebarExpanded && (
              <Collapse in={showExpanded} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ ml: 4.5, mt: 0.5, mb: 1 }}>
                  {item.children?.map((sub) => {
                    const subActive = isActive(location.pathname, sub.path)
                    return (
                      <ListItemButton
                        key={sub.text}
                        component={NavLink}
                        to={sub.path}
                        sx={{
                          py: 0.7,
                          px: 1.5,
                          borderRadius: 2.5,
                          color: subActive ? SKY : TEXT_SECONDARY,
                          bgcolor: subActive ? alpha(SKY, 0.07) : 'transparent',
                          '&:hover': {
                            bgcolor: alpha(SKY, 0.04),
                            color: SKY,
                          },
                          mb: 0.4,
                        }}
                      >
                        <ListItemText
                          primary={sub.text}
                          primaryTypographyProps={{
                            fontSize: '0.82rem',
                            fontWeight: subActive ? 800 : 500,
                          }}
                        />
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>
            )}
          </Box>
        )
      })}
    </List>
  )

  return (
    <Box
      sx={{
        width: isSidebarExpanded ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        height: '100vh',
        bgcolor: SURFACE,
        borderRight: `1px solid ${alpha(SKY, 0.1)}`,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: theme.zIndex.drawer,
        position: 'fixed',
        left: 0,
        top: 0,
        overflowX: 'hidden',
        boxShadow: '10px 0 34px rgba(23, 19, 16, 0.06)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ p: 2, mb: 1.2 }}>
        <Box
          sx={{
            p: isSidebarExpanded ? 2 : 1.2,
            borderRadius: 5,
            background: `linear-gradient(180deg, ${SKY} 0%, #221C18 100%)`,
            color: '#ffffff',
            minHeight: isSidebarExpanded ? 142 : 72,
            display: 'flex',
            alignItems: isSidebarExpanded ? 'stretch' : 'center',
            justifyContent: 'center',
            flexDirection: isSidebarExpanded ? 'column' : 'row',
            boxShadow: `0 18px 34px ${alpha(SKY, 0.2)}`,
          }}
        >
          <Box
            component="img"
            src="/logo/skyrush-logo.png"
            alt="SkyRush Express Courier"
            sx={{
              width: isSidebarExpanded ? 176 : 44,
              height: 'auto',
              objectFit: 'contain',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              alignSelf: isSidebarExpanded ? 'flex-start' : 'center',
            }}
          />
          {isSidebarExpanded && (
            <Box sx={{ mt: 'auto' }}>
              <Typography sx={{ fontWeight: 900, fontSize: '1rem', lineHeight: 1.1 }}>
                SkyRush control rail
              </Typography>
              <Typography
                sx={{
                  mt: 0.7,
                  color: alpha('#ffffff', 0.68),
                  fontSize: '0.74rem',
                  lineHeight: 1.5,
                }}
              >
                Chhatri Chauraha, Nai Basti, Pilibhit 262001
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1.4 }}>
        {navGroups.map((group) => {
          const items = navItems
            .filter((item) => item.roles.includes(role || 'customer'))
            .filter((item) => group.items.includes(item.text))

          if (!items.length) return null

          return (
            <Box key={group.label} sx={{ mb: 1.8 }}>
              {isSidebarExpanded && (
                <Typography
                  variant="caption"
                  sx={{
                    px: 1.7,
                    py: 0.9,
                    display: 'block',
                    fontWeight: 800,
                    color: alpha(TEXT_SECONDARY, 0.74),
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontSize: '0.65rem',
                  }}
                >
                  {group.label}
                </Typography>
              )}
              <Box
                sx={{
                  p: isSidebarExpanded ? 0.8 : 0.2,
                  borderRadius: 4,
                  bgcolor: alpha('#ffffff', 0.62),
                  border: `1px solid ${alpha(SKY, 0.08)}`,
                }}
              >
                {renderNavList(items)}
              </Box>
            </Box>
          )
        })}
      </Box>

      <Box sx={{ p: 1.4, borderTop: `1px solid ${alpha(SKY, 0.08)}`, bgcolor: alpha(FOOTER_TINT, 0.8) }}>
        <ListItemButton
          component={NavLink}
          to="/settings"
          sx={{
            ...navItemSx,
            justifyContent: isSidebarExpanded ? 'flex-start' : 'center',
            px: isSidebarExpanded ? 1.6 : 1.1,
            ...(isActive(location.pathname, '/settings') ? activeItemSx : {}),
          }}
        >
          <ListItemIcon sx={{ minWidth: isSidebarExpanded ? 40 : 0, justifyContent: 'center' }}>
            <RiSettings2Fill size={STANDARD_ICON_SIZE} />
          </ListItemIcon>
          {isSidebarExpanded ? (
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ fontSize: '0.88rem', fontWeight: 600 }}
            />
          ) : null}
        </ListItemButton>
      </Box>
    </Box>
  )
}
