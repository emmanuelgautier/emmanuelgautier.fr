type Locale = 'en' | 'fr'

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'nav.home.text': 'Home',
    'nav.blog.text': 'Blog',
    snippets: 'Snippets',
    posts: 'Posts',
    pYjtjn: 'Featured Posts',
    KGtd2k: 'Related Posts',
    UxTJRa: 'Projects',
    tv5FG3: 'Blog',
    wCgTu5: 'Comments',
    ejEGdx: 'Home',
    mmPYWx: 'Newsletter',
    'book-call.cta.title': 'Consulting',
    'book-call.cta.description':
      "If you're seeking solutions to a problem or need expert advice, I'm here to help! Don't hesitate to book a call with me for a consulting session. Let's discuss your situation and find the best solution together.",
    'book-call.cta.button': 'Book a call',
    'newsletter.form.title': 'Subscribe to the newsletter',
    'newsletter.form.description':
      'Get the latest news about tech new articles and projects.',
    'newsletter.form.button': 'Subscribe',
    'share.buttons.share': 'Share this post',
    'share.buttons.follow_rss_feed': 'Follow the RSS feed',
  },
  fr: {
    'nav.home.text': 'Accueil',
    'nav.blog.text': 'Blog',
    snippets: 'Snippets',
    posts: 'Posts',
    pYjtjn: 'Articles mis en avant',
    KGtd2k: 'Articles sur le même sujet',
    UxTJRa: 'Projets',
    tv5FG3: 'Blog',
    wCgTu5: 'Commentaires',
    ejEGdx: 'Accueil',
    mmPYWx: 'Newsletter',
    'book-call.cta.title': 'Consulting',
    'book-call.cta.description':
      "Si vous recherchez des solutions à un problème ou avez besoin de conseils, je suis là pour vous aider ! N'hésitez pas à réserver un call avec moi pour une session de consulting personnalisée. Discutons de votre situation et trouvons ensemble la meilleure solution à implémenter.",
    'book-call.cta.button': 'Réserver un call',
    'newsletter.form.title': 'Inscrivez-vous à la Newsletter',
    'newsletter.form.description':
      'Rejoignez nous en vous abonnant à ma newsletter !',
    'newsletter.form.button': "S'inscrire",
    'share.buttons.share': 'Partager cet article',
    'share.buttons.follow_rss_feed': 'Suivre le flux RSS',
  },
}

export function t(key: string, locale: Locale = 'en'): string {
  const msgs = translations[locale] ?? translations.en
  return msgs[key] ?? key
}
