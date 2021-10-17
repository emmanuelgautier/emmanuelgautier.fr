import type React from 'react'

import AmpIncludeCustomElement from './AmpIncludeCustomElement'

interface Props {
  type: string
  script?: Record<string, unknown>
}

const AmpAnalytics: React.FC<Props> = ({ type, script }) => (
  <>
    <AmpIncludeCustomElement name="amp-analytics" version="0.1" />
    <amp-analytics type={type}>
      {script && (
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(script),
          }}
        />
      )}
    </amp-analytics>
  </>
)

export default AmpAnalytics
