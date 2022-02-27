import getConfig from 'next/config'

type Domain = {
  [key: string]: string
}

export const getEnDomain = (): string => {
  const {
    publicRuntimeConfig: {
      seo: {
        i18n: { domains },
      },
    },
  } = getConfig()
  const enDomain = domains.filter(
    ({ defaultLocale }: Domain) => defaultLocale === 'en'
  )
  if (!enDomain) {
    throw new Error('No en domain found')
  }

  return enDomain[0].domain
}
