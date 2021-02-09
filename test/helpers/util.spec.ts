import { isDate, isPlainObject, isFormData, isURLSearchParams } from '../../src/helpers/util'

describe('helpers:util', () => {
  describe('isXXX', () => {
    test('should validate date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })
    test('should validate plain object', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })
    test('should validate formData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })
    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams({})).toBeFalsy()
    })
  })
})
