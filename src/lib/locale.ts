import { SITE, getDomainFromLocale } from '../config/site'

export { getDomainFromLocale }

export function getLocale(): string {
  return SITE.locale
}
