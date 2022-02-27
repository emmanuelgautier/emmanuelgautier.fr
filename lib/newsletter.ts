export async function getNumberOfSubscribers() {
  const apiKey = 'mWPDJ1PD5UbT-QOyaE6VtfBlogcmrKKG'

  const response = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    method: 'GET',
    headers: {
      // Authorization: `Token ${process.env.REVUE_API_KEY}`,
      Authorization: `Token ${apiKey}`,
    },
  })
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} ${apiKey}`)
    throw new Error('Error retrieving subscribers')
  }

  const { headers } = response
  const contentType = headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error('Wrong content type retrieving subscribers')
  }

  return JSON.stringify(await response.json()).length
}
