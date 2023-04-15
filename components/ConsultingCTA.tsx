import { useIntl } from 'react-intl'
import { usePlausible } from 'next-plausible'

import { CTACard } from './CTACard'
import OutboundLink from './OutboundLink'

interface Props {}

export const ConsultingCTA: React.FC<Props> = () => {
  const plausible = usePlausible()
  const intl = useIntl()

  const _handleSubscribe = () => {
    plausible('bookACall')
  }

  return (
    <CTACard
      title={intl.formatMessage({
        id: 'book-call.cta.title',
        defaultMessage: 'Consulting',
      })}
      description={intl.formatMessage({
        id: 'book-call.cta.description',
        defaultMessage:
          `If you're seeking solutions to a problem or need expert advice, I'm here to help! Don't hesitate to book a call with me for a consulting session. Let's discuss your situation and find the best solution together.`,
      })}
      button={(
        <OutboundLink href="https://l.emmanuelgautier.com/book-a-call">
          <button
            type="button"
            className="px-6 py-2 bg-gray-900 hover:bg-gray-100 dark:bg-gray-300 text-gray-100 hover:text-gray-900 dark:text-gray-700 rounded"
            onClick={_handleSubscribe}
          >
            {intl.formatMessage({
              id: 'book-call.cta.button',
              defaultMessage: 'Book a call',
            })}
          </button>
        </OutboundLink>
      )}
    />
  )
}
