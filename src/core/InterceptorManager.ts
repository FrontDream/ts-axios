import { ResolvedFn, RejectFn } from '../types'

interface Interceptors<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptors<T> | null>

  constructor() {
    this.interceptors = []
  }

  // 添加拦截器，返回拦截器数组的长度，用于取消
  use(resolved: ResolvedFn<T>, rejected?: RejectFn) {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }
  // 传递进一个函数，将每一个拦截器返回出去
  forEach(fn: (interceptor: Interceptors<T>) => void) {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
  // 根据ID，也就是该拦截器在interceptors中的位置取消拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
