import { useEffect } from 'react';
import { useIntl } from 'react-intl'
import { getLocale } from '@lib/get-localized-domain.mjs'

import Text from './Text';
import { useTheme } from 'next-themes';
import getConfig from 'next/config';

declare global {
  interface Window {
    REMARK42: any
    remark_config: any
  }
}

interface Config {
  siteId: string
  url: string
  theme?: string
  pageTitle: string
}

const insertScript = (host: string, id: string, parentElement: HTMLElement, { siteId, url, theme = 'light', pageTitle }: Config) => {
  const script = window.document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.id = id
  script.innerHTML = `
    var remark_config = {
      host: "${host}",
      site_id: "${siteId}",
      url: "${url}",
      theme: "${theme}",
      components: ["embed", "last-comments"],
      page_title: "${pageTitle}",
      show_rss_subscription: false,
      no_footer: true
    };
    !function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`
  parentElement.appendChild(script)
}

const removeScript = (id: string, parentElement: HTMLElement) => {
  const script = window.document.getElementById(id);
  if (script) {
    parentElement.removeChild(script);
  }
}

// This function will be provided to useEffect and will insert the script
// when the component is mounted and remove it when it unmounts
const manageScript = (domain: string, config: Config) => {
  if (!window) {
    return () => {};
  }
  const { document } = window
  if (document.getElementById('remark42')) {
    insertScript(`https://${domain}`, 'comments-script', document.body, config)
  }
  return () => removeScript('comments-script', document.body)
}

const recreateRemark42Instance = () => {
  if (!window) {
    return
  }
  const remark42 = window.REMARK42
  if (remark42) {
    remark42.destroy()
    remark42.createInstance(window.remark_config)
  }
}

type CommentsProps = {
  url: string
  title: string
}

const CommentsWidget: React.FC<CommentsProps & { commentsDomain: string }> = ({ url, title, commentsDomain }) => {
  const intl = useIntl()
  const { theme } = useTheme()
  const locale = getLocale()
  useEffect(() => manageScript(commentsDomain, {
    siteId: `emmanuelgautier-${locale}`,
    url,
    theme,
    pageTitle: title,
  }), [commentsDomain, url, title, locale, theme])
  useEffect(recreateRemark42Instance, [commentsDomain, url, title, locale, theme])

  return (
    <>
      <Text variant="sectionHeading">
        {intl.formatMessage({ defaultMessage: 'Comments' })}
      </Text>
      <div id="remark42" />
    </>
  )
}

export const Comments: React.FC<CommentsProps> = (props) => {
  const {
    publicRuntimeConfig: {
      seo: { commentsDomain },
    },
  } = getConfig()
  if (!commentsDomain) {
    return (
      <></>
    )
  }

  return (
    <CommentsWidget {...props} commentsDomain={commentsDomain} />
  )
}
