import { AxiosCancelExecutor, AxiosCancer, CancelSource } from '../types'
import Cancel from './Cancel'

interface PromiseResolve {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: AxiosCancelExecutor) {
    let promiseResolve: PromiseResolve
    this.promise = new Promise<Cancel>(resolve => {
      promiseResolve = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      promiseResolve(this.reason)
    })
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }
  static source(): CancelSource {
    let cancel!: AxiosCancer
    const token = new CancelToken(c => {
      cancel = c
    })
    return { cancel, token }
  }
}
