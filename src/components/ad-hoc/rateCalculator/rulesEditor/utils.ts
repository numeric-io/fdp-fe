import { APIRule } from '@numeric-io/fdp-api'

export const RULE_HEADER_HEIGHT = 68

export const sortRules = (rules: APIRule[]) => {
  return rules.sort((a, b) => a.priority - b.priority)
}
