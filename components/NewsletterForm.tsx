import { useIntl } from 'react-intl'
import { usePlausible } from 'next-plausible'

import { CTACard } from './CTACard'
import OutboundLink from './OutboundLink'

interface Props { }

const NewsletterForm: React.FC<Props> = () => {
  const plausible = usePlausible()
  const intl = useIntl()

  const _handleSubscribe = () => {
    plausible('subscribeNewsletter')
  }

  return (
    <CTACard
      title={intl.formatMessage({
        id: 'newsletter.form.title',
        defaultMessage: 'Subscribe to the newsletter',
      })}
      description={intl.formatMessage({
        id: 'newsletter.form.description',
        defaultMessage:
          'Get the latest news about tech new articles and projects.',
      })}
      button={(
        <OutboundLink href="https://l.emmanuelgautier.com/newsletter">
          <button
            type="button"
            className="px-6 py-2 bg-gray-900 hover:bg-gray-100 dark:bg-gray-300 text-gray-100 hover:text-gray-900 dark:text-gray-700 rounded"
            onClick={_handleSubscribe}
          >
            {intl.formatMessage({
              id: 'newsletter.form.button',
              defaultMessage: 'Subscribe',
            })}
          </button>
        </OutboundLink>
      )}
    />
  )
}

export default NewsletterForm
