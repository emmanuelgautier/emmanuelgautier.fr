import config from '../next-seo.config.js'

export const getDomainFromLocale = (locale) => {
  const { domains } = config.i18n
  const localizedDomain = domains.find(
    ({ defaultLocale }) => defaultLocale === locale
  )
  if (!localizedDomain) {
    throw new Error('No localized domain found')
  }

  return localizedDomain.domain
}

export const getLocale = () => process.env.NEXT_LOCALE || 'en'
