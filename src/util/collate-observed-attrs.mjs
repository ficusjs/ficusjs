import { toKebabCase } from './to-kebab-case.mjs'

export function collateObservedAttrs (props) {
  if (!props) return []
  const oa = []
  const opk = Object.keys(props)
  opk.forEach(k => {
    if (props[k].observed != null && !props[k].observed) return
    oa.push(toKebabCase(k))
  })
  return oa
}
