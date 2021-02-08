import { AxiosCancelExecutor, AxiosCancer } from '../types'

interface PromiseResolve {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: AxiosCancelExecutor) {
    let promiseResolve: PromiseResolve
    this.promise = new Promise<string>(resolve => {
      promiseResolve = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = message
      promiseResolve(this.reason)
    })
  }
  static source() {
    let cancel!: AxiosCancer
    const token = new CancelToken(c => {
      cancel = c
    })
    return { cancel, token }
  }
}
