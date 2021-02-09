import cookie from '../../src/helpers/cookie'

describe('helper: cookie', () => {
  test('should read cookie', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })
  test('should return null if cookie is not exist', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('baz')).toBeNull()
  })
})
