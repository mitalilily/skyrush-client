import type { JSX } from '@emotion/react/jsx-runtime'
import {
  alpha,
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import CustomCheckbox from '../inputs/CustomCheckbox'

export interface Column<T> {
  id: keyof T
  label_desc?: string
  label: JSX.Element | string
  align?: 'right' | 'left' | 'center'
  render?: (value: unknown, row: T) => React.ReactNode
  minWidth?: number
  hiddenOnMobile?: boolean
  truncate?: boolean
}

export interface DataTableProps<T extends { id: string | number }> {
  rows: T[]
  columns: Column<T>[]
  title?: string
  subTitle?: string
  maxHeight?: number
  pagination?: boolean
  selectable?: boolean
  onSelectRows?: (ids: Array<T['id']>) => void
  selectedRowIds?: Array<T['id']>
  rowsPerPageOptions?: number[]
  defaultRowsPerPage?: number
  bgOverlayImg?: string
  renderExpandedRow?: (row: T) => React.ReactNode
  expandable?: boolean
  currentPage?: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
  totalCount?: number
  onRowClick?: (row: T) => void
  selectionResetToken?: number | string
}

export default function DataTable<T extends { id: string | number }>(props: DataTableProps<T>) {
  const {
    rows,
    columns,
    title,
    subTitle,
    maxHeight = 500,
    pagination = false,
    selectable = false,
    onSelectRows,
    selectedRowIds,
    rowsPerPageOptions = [5, 10, 25],
    defaultRowsPerPage = 10,
    bgOverlayImg,
    renderExpandedRow,
    expandable,
    currentPage,
    onPageChange,
    onRowsPerPageChange,
    totalCount,
    onRowClick,
    selectionResetToken,
  } = props

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const primary = theme.palette.primary.main
  const primaryLight = theme.palette.primary.light
  const secondary = theme.palette.secondary.main
  const textPrimary = theme.palette.text.primary
  const textSecondary = theme.palette.text.secondary

  const [localPage, setLocalPage] = React.useState(0)
  const [localRowsPerPage, setLocalRowsPerPage] = React.useState(defaultRowsPerPage)
  const [selectedIds, setSelectedIds] = React.useState<Array<T['id']>>([])
  const [expandedRowId, setExpandedRowId] = React.useState<T['id'] | null>(null)

  const expandedRef = useRef<HTMLDivElement | null>(null)

  const page = currentPage ?? localPage
  const rowsPerPage = localRowsPerPage

  const handleChangePage = (_: unknown, newPage: number) => {
    if (onPageChange) onPageChange(newPage)
    else setLocalPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = +event.target.value
    if (onRowsPerPageChange) onRowsPerPageChange(newRowsPerPage)
    else {
      setLocalRowsPerPage(newRowsPerPage)
      setLocalPage(0)
    }
  }

  const isAllSelected = rows.length > 0 && rows.every((r) => selectedIds.includes(r.id))

  const handleSelect = (id: T['id']) => {
    const selected = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id]
    setSelectedIds(selected)
    onSelectRows?.(selected)
  }

  const handleSelectAll = (checked: boolean) => {
    const allIds = checked ? rows.map((r) => r.id) : []
    setSelectedIds(allIds)
    onSelectRows?.(allIds)
  }

  useEffect(() => {
    if (!selectedRowIds) return
    setSelectedIds(selectedRowIds)
  }, [selectedRowIds])

  useEffect(() => {
    setSelectedIds((currentSelectedIds) => {
      const visibleIds = new Set(rows.map((row) => row.id))
      const nextSelectedIds = currentSelectedIds.filter((id) => visibleIds.has(id))
      const isSameSelection =
        nextSelectedIds.length === currentSelectedIds.length &&
        nextSelectedIds.every((id, index) => id === currentSelectedIds[index])

      if (!isSameSelection) {
        onSelectRows?.(nextSelectedIds)
        return nextSelectedIds
      }

      return currentSelectedIds
    })
  }, [rows, onSelectRows])

  useEffect(() => {
    if (selectionResetToken === undefined) return
    setSelectedIds([])
    onSelectRows?.([])
  }, [selectionResetToken, onSelectRows])

  const toggleExpand = (id: T['id']) => {
    const isExpanding = id !== expandedRowId
    setExpandedRowId(isExpanding ? id : null)
    if (isExpanding && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 160)
    }
  }

  return (
    <CardContent
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 6,
        border: `1px solid ${alpha(primary, 0.12)}`,
        background: `
          radial-gradient(circle at top left, ${alpha(primaryLight, 0.18)} 0%, transparent 28%),
          radial-gradient(circle at top right, ${alpha(secondary, 0.18)} 0%, transparent 26%),
          linear-gradient(180deg, rgba(255, 251, 245, 0.96) 0%, rgba(255, 247, 238, 0.92) 100%)
        `,
        boxShadow: `0 30px 60px ${alpha(textPrimary, 0.08)}`,
        p: 0,
      }}
    >
      {bgOverlayImg && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bgOverlayImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0.05,
            zIndex: 1,
          }}
        />
      )}

      <Box sx={{ position: 'relative', zIndex: 2, p: { xs: 2, sm: 2.5 } }}>
        {(title || subTitle || pagination) && (
          <Stack
            mb={2.5}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Stack spacing={0.8}>
              {title && (
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: textPrimary,
                  }}
                >
                  {title}
                </Typography>
              )}
              {subTitle && (
                <Typography
                  sx={{
                    fontSize: '0.82rem',
                    color: textSecondary,
                    maxWidth: 640,
                  }}
                >
                  {subTitle}
                </Typography>
              )}
            </Stack>

            {pagination && totalCount !== undefined && (
              <TablePagination
                component="div"
                count={totalCount}
                page={page - 1}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  borderRadius: 999,
                  px: 1.2,
                  backgroundColor: alpha('#ffffff', 0.75),
                  border: `1px solid ${alpha(primary, 0.12)}`,
                  boxShadow: `0 10px 24px ${alpha(textPrimary, 0.05)}`,
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    fontSize: '12px',
                    color: textSecondary,
                    fontWeight: 600,
                  },
                  '& .MuiTablePagination-select': {
                    color: textPrimary,
                    fontWeight: 700,
                  },
                  '& .MuiTablePagination-actions button': {
                    color: primary,
                    '&:hover': {
                      backgroundColor: alpha(primary, 0.08),
                    },
                  },
                }}
              />
            )}
          </Stack>
        )}

        {rows.length === 0 ? (
          <Stack alignItems="center" justifyContent="center" spacing={1.3} sx={{ minHeight: 280, py: 5 }}>
            <Box
              component="img"
              src="/images/empty-files.png"
              alt="No data"
              sx={{ width: 260, opacity: 0.78 }}
            />
            <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 700, color: textPrimary }}>
              No records to display
            </Typography>
            <Typography variant="body2" sx={{ color: textSecondary }}>
              Once activity starts, the operations feed will appear here.
            </Typography>
          </Stack>
        ) : isMobile ? (
          <Stack spacing={1.6}>
            {selectable && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 0.5,
                  py: 0.35,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CustomCheckbox
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  <Typography fontSize="12px" fontWeight={700} sx={{ color: textPrimary }}>
                    Select all
                  </Typography>
                </Stack>
                <Typography fontSize="12px" sx={{ color: textSecondary }}>
                  {selectedIds.length} selected
                </Typography>
              </Stack>
            )}
            {rows.map((row) => {
              const isExpanded = expandedRowId === row.id
              return (
                <Card
                  key={row.id}
                  variant="outlined"
                  sx={{
                    borderRadius: 5,
                    border: `1px solid ${alpha(primary, 0.1)}`,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,248,240,0.94) 100%)',
                    boxShadow: `0 18px 34px ${alpha(textPrimary, 0.06)}`,
                  }}
                >
                  <CardContent sx={{ px: 2, py: 1.7 }}>
                    <Stack spacing={1.35}>
                      {selectable && (
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <CustomCheckbox
                              checked={selectedIds.includes(row.id)}
                              onChange={() => handleSelect(row.id)}
                            />
                            <Typography fontSize="12px" fontWeight={700} sx={{ color: textPrimary }}>
                              Select entry
                            </Typography>
                          </Stack>
                        </Stack>
                      )}
                      {columns.map((col) => {
                        if (col.hiddenOnMobile) return null
                        const value = col.render ? col.render(row[col.id], row) : row[col.id]
                        return (
                          <Box key={col.id as string}>
                            <Typography
                              fontSize="11px"
                              fontWeight={800}
                              sx={{ color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em' }}
                            >
                              {col.label}
                            </Typography>
                            {col.label_desc ? (
                              <Typography fontSize="10px" fontWeight={600} sx={{ color: textSecondary, opacity: 0.85 }}>
                                {col.label_desc}
                              </Typography>
                            ) : null}
                            <Typography fontSize="13px" sx={{ color: textPrimary, mt: 0.45 }}>
                              {React.isValidElement(value)
                                ? value
                                : typeof value === 'object'
                                  ? JSON.stringify(value)
                                  : String(value)}
                            </Typography>
                            <Divider sx={{ mt: 1, borderColor: alpha(primary, 0.08) }} />
                          </Box>
                        )
                      })}
                    </Stack>

                    {renderExpandedRow && (
                      <IconButton
                        size="small"
                        onClick={() => toggleExpand(row.id)}
                        sx={{
                          mt: 1,
                          color: primary,
                          bgcolor: alpha(primary, 0.06),
                          '&:hover': { backgroundColor: alpha(primary, 0.12) },
                        }}
                      >
                        {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                      </IconButton>
                    )}

                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box ref={expandedRef} mt={1.2}>
                        {renderExpandedRow?.(row)}
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              )
            })}
          </Stack>
        ) : (
          <Box sx={{ overflowX: 'auto', borderRadius: 5 }}>
            <TableContainer
              component={Paper}
              sx={{
                background: alpha('#ffffff', 0.82),
                border: `1px solid ${alpha(primary, 0.12)}`,
                minWidth: '100%',
                maxHeight,
                boxShadow: `0 20px 40px ${alpha(textPrimary, 0.06)}`,
                borderRadius: 5,
                backdropFilter: 'blur(18px)',
              }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    {selectable && (
                      <TableCell
                        padding="checkbox"
                        sx={{
                          position: 'sticky',
                          top: 0,
                          background: alpha('#fff8f1', 0.96),
                          borderBottom: `1px solid ${alpha(primary, 0.14)}`,
                          zIndex: theme.zIndex.appBar + 1,
                        }}
                      >
                        <CustomCheckbox
                          checked={isAllSelected}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          color="primary"
                        />
                      </TableCell>
                    )}

                    {columns.map((col) =>
                      col.hiddenOnMobile && isMobile ? null : (
                        <TableCell
                          key={col.id as string}
                          align={col.align ?? 'left'}
                          sx={{
                            position: 'sticky',
                            top: 0,
                            background: alpha('#fff8f1', 0.96),
                            color: textPrimary,
                            minWidth: col.minWidth || 100,
                            fontWeight: 800,
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            zIndex: theme.zIndex.appBar + 1,
                            borderBottom: `1px solid ${alpha(primary, 0.14)}`,
                          }}
                        >
                          {col.label}
                          {col.label_desc ? (
                            <Typography fontSize="10px" fontWeight={600} sx={{ color: textSecondary, mt: 0.35 }}>
                              {col.label_desc}
                            </Typography>
                          ) : null}
                        </TableCell>
                      ),
                    )}

                    {expandable && renderExpandedRow && (
                      <TableCell
                        sx={{
                          position: 'sticky',
                          top: 0,
                          background: alpha('#fff8f1', 0.96),
                          borderBottom: `1px solid ${alpha(primary, 0.14)}`,
                          width: 40,
                          zIndex: theme.zIndex.appBar + 1,
                        }}
                      />
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => {
                    const isExpanded = expandedRowId === row.id
                    return (
                      <React.Fragment key={row.id}>
                        <TableRow
                          hover={!!onRowClick}
                          onClick={onRowClick ? () => onRowClick(row) : undefined}
                          sx={{
                            borderBottom: `1px solid ${alpha(primary, 0.06)}`,
                            transition: 'background-color .18s ease',
                            '&:hover': onRowClick
                              ? {
                                  backgroundColor: alpha(primaryLight, 0.06),
                                  cursor: 'pointer',
                                }
                              : {
                                  backgroundColor: alpha(primaryLight, 0.03),
                                },
                          }}
                        >
                          {selectable && (
                            <TableCell padding="checkbox">
                              <CustomCheckbox
                                checked={selectedIds.includes(row.id)}
                                onChange={() => handleSelect(row.id)}
                                sx={{ color: primary }}
                              />
                            </TableCell>
                          )}

                          {columns.map((col) => {
                            if (col.hiddenOnMobile && isMobile) return null
                            const value = row[col.id]
                            const cellContent = col.render ? col.render(value, row) : (value as React.ReactNode)
                            const shouldTruncate = col.truncate !== false

                            let tooltipTitle: string | undefined
                            if (shouldTruncate && !React.isValidElement(cellContent)) {
                              if (value !== null && value !== undefined && typeof value !== 'object') {
                                tooltipTitle = String(value)
                              }
                            }

                            return (
                              <TableCell
                                key={col.id as string}
                                align={col.align ?? 'left'}
                                sx={{
                                  color: textPrimary,
                                  fontSize: '13px',
                                  fontWeight: 500,
                                  whiteSpace: shouldTruncate ? 'nowrap' : 'normal',
                                  overflow: shouldTruncate ? 'hidden' : 'visible',
                                  textOverflow: shouldTruncate ? 'ellipsis' : 'clip',
                                  maxWidth: shouldTruncate ? 240 : 'none',
                                  py: 1.65,
                                  px: 2,
                                }}
                              >
                                {tooltipTitle ? (
                                  <Tooltip title={tooltipTitle} arrow disableInteractive>
                                    <Box component="span">{cellContent}</Box>
                                  </Tooltip>
                                ) : (
                                  <Box component="span">{cellContent}</Box>
                                )}
                              </TableCell>
                            )
                          })}

                          {expandable && renderExpandedRow && (
                            <TableCell sx={{ py: 1.5, px: 2 }}>
                              <IconButton
                                size="small"
                                onClick={() => toggleExpand(row.id)}
                                sx={{
                                  color: primary,
                                  bgcolor: alpha(primary, 0.06),
                                  '&:hover': { backgroundColor: alpha(primary, 0.12) },
                                }}
                              >
                                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                              </IconButton>
                            </TableCell>
                          )}
                        </TableRow>

                        {expandable && renderExpandedRow && (
                          <TableRow>
                            <TableCell
                              colSpan={columns.length + (selectable ? 2 : 1)}
                              sx={{
                                p: 0,
                                backgroundColor: alpha(primaryLight, 0.04),
                                borderTop: `1px solid ${alpha(primary, 0.1)}`,
                              }}
                            >
                              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                <Box
                                  ref={expandedRef}
                                  p={2.8}
                                  sx={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,248,240,0.96) 100%)',
                                  }}
                                >
                                  {renderExpandedRow(row)}
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </CardContent>
  )
}
