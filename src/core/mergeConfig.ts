import { AxiosRequestConfig } from '../types'
import { deepMerge } from '../helpers/util'

function stratDefault(val1: string, val2: string) {
  return typeof val2 === 'undefined' ? val1 : val2
}

function stratFromVal2(val1: string, val2: string) {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const keyMap = Object.create(null)

const keyStratFronVal2 = ['url', 'params', 'data']

keyStratFronVal2.forEach(key => {
  keyMap[key] = stratFromVal2
})

const keyStratDeepMerge = ['headers', 'auth']

keyStratDeepMerge.forEach(key => {
  keyMap[key] = deepMerge
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
): AxiosRequestConfig {
  const config = Object.create(null)
  if (!config2) {
    config2 = {}
  }
  for (let key in config2) {
    merge(key)
  }

  for (let key in config1) {
    if (!config[key]) {
      merge(key)
    }
  }

  function merge(key: string) {
    const strat = keyMap[key] || stratDefault
    config[key] = strat(config1[key], config2[key])
  }
  return config
}
