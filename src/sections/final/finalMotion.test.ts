import { describe, expect, it } from 'vitest'
import { expansionProgress } from './finalMotion'

describe('expansionProgress', () => {
  it('is 0 while the stage is still below the viewport', () => {
    expect(expansionProgress(900, 900)).toBe(0)
    expect(expansionProgress(1400, 900)).toBe(0)
  })

  it('grows linearly as the stage top rises through the viewport', () => {
    expect(expansionProgress(450, 900)).toBe(0.5)
  })

  it('settles at 1 once the stage top reaches the top edge', () => {
    expect(expansionProgress(0, 900)).toBe(1)
    expect(expansionProgress(-300, 900)).toBe(1)
  })
})
