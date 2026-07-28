import { describe, it, expect } from 'vitest'
import { formatPrice } from '../app/utils/formatPrice'

describe('formatPrice', () => {
  it('formats a price with a comma thousands separator regardless of runtime locale', () => {
    expect(formatPrice(675000)).toBe('€675,000')
  })

  it('handles smaller numbers without a separator', () => {
    expect(formatPrice(999)).toBe('€999')
  })
})