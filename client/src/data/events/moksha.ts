import type { Event } from '../types'

const dzire: Event[] = []

const pixel: Event[] = []

const fineArts: Event[] = []

const dcc: Event[] = []

const mokshaEvents = Object.freeze([...dzire, ...dcc, ...pixel, ...fineArts])

export default mokshaEvents
