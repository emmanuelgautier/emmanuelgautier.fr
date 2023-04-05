import React from 'react'

interface Props {}

class CarbonAds extends React.Component<Props> {
  componentDidMount() {
    const script = document.createElement('script')
    script.src = '//cdn.carbonads.com/carbon.js?serve=CWYDV27W&placement=wwwemmanuelgautiercom'
    script.id = '_carbonads_js'
    script.async = true

    document.querySelectorAll('#carbon-container')[0].appendChild(script)
  }

  render() {
    return (
      <div id='carbon-container'></div>
    )
  }
}

export default CarbonAds
