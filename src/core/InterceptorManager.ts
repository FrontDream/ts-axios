import { ResolvedFn, RejectFn } from '../types'


interface Interceptors<T>{
  resolved: ResolvedFn<T>,
  rejected?: RejectFn
}

export default class InterceptorManager<T>{
  private interceptors: Array<Interceptors<T>|null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?:RejectFn){
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length-1
  }
  forEach(fn:(interceptor: Interceptors<T>)=>void){
    this.interceptors.forEach(interceptor=>{
      if(interceptor!==null){
        fn(interceptor)
      }
    })
  }
  eject(id:number):void{
    if(this.interceptors[id]){
      this.interceptors[id] = null
    }
  }
}
