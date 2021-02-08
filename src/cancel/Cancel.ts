export default class Cancel {
  reason?: string
  constructor(message?: string) {
    this.reason = message
  }
}

export function isCancel(val: any): boolean {
  return val instanceof Cancel
}
