import type { Portal } from '~~/types/portal'

// Generated from /api/portals?portal=cbd-portals (2026-11-13).

export const portal1: Portal = {
  title: 'Central Portal of the Clearing-House Mechanism',
  url: 'https://chm.cbd.int/',
  position: -50,
  icon: 'portals/chm.png',
  children: []
}

export const portal2: Portal = {
  title: 'Biosafety Clearing-House',
  url: 'https://bch.cbd.int/',
  position: -49,
  icon: 'portals/bch.png',
  children: []
}

export const portal3: Portal = {
  title: 'Access and Benefit Sharing Clearing-House',
  url: 'https://absch.cbd.int/',
  position: 0,
  icon: 'portals/abs.png',
  children: []
}

export const portals: Portal[] = [portal1, portal2, portal3]
