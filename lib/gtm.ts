export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url?: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const newsletterSubscribe = () => {
  event({
    action: 'subscribe_newsletter',
    category: 'engagement',
    label: 'Subscribe to newsletter',
    value: 1,
  })
}

export const rssFollow = () => {
  event({
    action: 'follow_rss',
    category: 'engagement',
    label: 'Follow RSS',
    value: 1,
  })
}

export const share = (network: string) => {
  event({
    action: `share_${network}`,
    category: 'engagement',
    label: `Share on ${network}`,
    value: 1,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category?: string
  label?: string
  value: any
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
