export function isPromise (obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}
