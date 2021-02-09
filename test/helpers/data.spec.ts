import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers:data', () => {
  describe('transformRequest', () => {
    test('should transform data to a string if data is a plainObject', () => {
      const a = { a: 1 }
      expect(transformRequest(a)).toBe('{"a":1}')
    })
    test('should do nothing if data is not a plainObject', () => {
      const a = new URLSearchParams('a=b')
      // const a = new URLSearchParams('a=b')
      // expect(transformRequest(a)).toBe(a)
      expect(transformRequest(a)).toBe(a)
    })
  })
  describe('transformResponse', () => {
    test('should parse if data is a JSON string', () => {
      const a = '{"a": 1}'
      // const a = '{"a": 2}'
      // expect(transformResponse(a)).toEqual({ a: 2 })
      expect(transformResponse(a)).toEqual({ a: 1 })
    })
    test('should be origin if data is not a JSON string', () => {
      const a = '{a: 1}'
      expect(transformResponse(a)).toBe('{a: 1}')
    })
    test('should do nothing if data is not a string', () => {
      const a = { a: 1 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
