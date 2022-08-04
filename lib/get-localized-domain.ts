import { i18n } from '../next-seo.config'

export const getDomainFromLocale = (locale: string): string => {
  const { domains } = i18n
  const localizedDomain = domains.find(
    ({ defaultLocale }) => defaultLocale === locale
  )
  if (!localizedDomain) {
    throw new Error('No localized domain found')
  }

  return localizedDomain.domain
}

export const getLocale = () => process.env.LOCALE || 'en'
