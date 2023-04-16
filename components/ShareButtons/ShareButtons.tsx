import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// @ts-ignore: Implicity has an any type
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import getConfig from 'next/config'
import { useIntl } from 'react-intl'
import {
  LinkedinShareButton,
  PocketShareButton,
  TwitterShareButton,
} from 'react-share'

import OutboundLink from '@components/OutboundLink'

interface Props {
  url: string
  title: string
  description: string
  tags: string[]
}

const ShareButtons: React.FC<Props> = ({ url, title, description, tags }) => {
  const intl = useIntl()
  const {
    publicRuntimeConfig: {
      seo: { siteUrl, person, twitter },
    },
  } = getConfig()
  const rssFeedUrl = `${siteUrl}/rss.xml`

  return (
    <div className="flex flex-col md:flex-row md:space-x-3">
      <div className="w-full flex flex-col items-center border border-gray-100 rounded p-6 dark:border-gray-900 bg-white dark:bg-gray-700">
        <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          {intl.formatMessage({
            id: 'share.buttons.share',
            defaultMessage: 'Share this post',
          })}
        </span>

        <div className="mt-4 flex items-center justify-center space-x-1">
          <TwitterShareButton
            className="plausible-event-name=clickShare+twitter"
            url={url}
            title={title}
            via={twitter.handle_simple}
            hashtags={tags}
            related={[twitter.handle_simple]}
          >
            <span className="bg-blue-300 px-4 py-2 font-semibold text-white text-xl inline-flex items-center rounded">
              <FontAwesomeIcon icon={brands('twitter')} />
            </span>
          </TwitterShareButton>

          <LinkedinShareButton
            className="plausible-event-name=clickShare+linkedin"
            url={url}
            title={title}
            summary={description}
            source={person.name}
          >
            <span className="bg-blue-500 px-4 py-2 font-semibold text-white text-xl inline-flex items-center rounded">
              <FontAwesomeIcon icon={brands('linkedin')} />
            </span>
          </LinkedinShareButton>

          <OutboundLink
            className="plausible-event-name=clickShare+hacker_news"
            href={`https://news.ycombinator.com/submitlink?u=${url}`}
          >
            <span className="bg-orange-500 px-4 py-2 font-semibold text-white text-xl inline-flex items-center rounded">
              <FontAwesomeIcon icon={brands('hacker-news')} />
            </span>
          </OutboundLink>

          <PocketShareButton
            className="plausible-event-name=clickShare+pocket"
            url={url}
            title={title}
          >
            <span className="bg-red-400 px-4 py-2 font-semibold text-white text-xl inline-flex items-center rounded">
              <FontAwesomeIcon icon={brands('get-pocket')} />
            </span>
          </PocketShareButton>
        </div>
      </div>

      <div className="w-full flex flex-col items-center border border-gray-100 rounded p-6 dark:border-gray-900 bg-white dark:bg-gray-700">
        <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          {intl.formatMessage({
            id: 'share.buttons.follow_rss_feed',
            defaultMessage: 'Follow the RSS feed',
          })}
        </span>

        <OutboundLink
          className="mt-4 plausible-event-name=rssFollow"
          href={`https://feedly.com/i/subscription/feed/${encodeURIComponent(
            rssFeedUrl
          )}`}
        >
          <span className="bg-orange-400 px-4 py-2 font-semibold text-white text-lg rounded">
            <FontAwesomeIcon icon={solid('rss')} />
          </span>
        </OutboundLink>
      </div>
    </div>
  )
}

export default ShareButtons
