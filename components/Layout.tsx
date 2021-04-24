import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import { useAmp } from 'next/amp'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { GTM_ID } from '../lib/gtm'
import SEO from '../next-seo.config'

import Footer from './Footer'
import HeaderAmp from './Header.amp'
import Header from './Header'

type Props = {
  title: string
  description: string
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({
  title,
  description,
  children,
}) => {
  const router = useRouter()
  const { basePath, asPath } = router
  const isAmp = useAmp()

  return (
    <>
      <Head>
        {/* Global site tag (gtag.js) - Google Analytics */}
        {!isAmp ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GTM_ID}');`,
              }}
            />
          </>
        ) : (
            <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
          )}

        {isAmp && (
          <>
            <style amp-custom="true">{`
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-display: optional;
              src: url(/assets/fonts/inter/inter-latin-variable-full-normal.woff2) format('woff2');
            }

            /*! tailwindcss v2.1.1 | MIT License | https://tailwindcss.com*/
            /*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{font-family:"Inter",system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji;margin:0}hr{color:inherit;height:0}button{font-family:inherit;font-size:100%;line-height:1.15;margin:0;text-transform:none}[type=button],button{-webkit-appearance:button}summary{display:list-item}dd,h1,h2,h3,h4,hr,p{margin:0}button{background-color:transparent;background-image:none}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}body{font-family:inherit;line-height:inherit}*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}hr{border-top-width:1px}img{border-style:solid}button{cursor:pointer}h1,h2,h3,h4{font-size:inherit;font-weight:inherit}a{text-decoration:inherit}a,button{color:inherit}button{line-height:inherit;padding:0}img,svg{display:block;vertical-align:middle}img{height:auto;max-width:100%}.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.prose{color:#374151;max-width:65ch}.prose [class~=lead]{color:#4b5563;font-size:1.25em;line-height:1.6;margin-bottom:1.2em;margin-top:1.2em}.prose a{color:#3b82f6;font-weight:500;text-decoration:underline}.prose a:hover{color:#1d4ed8}.prose hr{border-color:#e5e7eb;border-top-width:1px;margin-bottom:3em;margin-top:3em}.prose h1{color:#111827;font-size:2.25em;font-weight:800;line-height:1.1111111;margin-bottom:.8888889em;margin-top:0}.prose h2{color:#111827;font-size:1.5em;font-weight:700;line-height:1.3333333;margin-bottom:1em;margin-top:2em}.prose h3{font-size:1.25em;line-height:1.6;margin-bottom:.6em;margin-top:1.6em}.prose h3,.prose h4{color:#111827;font-weight:600}.prose h4{line-height:1.5;margin-bottom:.5em;margin-top:1.5em}.prose{font-size:1rem;line-height:1.75}.prose p{margin-bottom:1.25em;margin-top:1.25em}.prose img{margin-bottom:2em;margin-top:2em}.prose>:first-child,.prose h2+*,.prose h3+*,.prose h4+*,.prose hr+*{margin-top:0}.prose>:last-child{margin-bottom:0}.prose h2,.prose h3,.prose h4{scroll-margin-top:8rem}.dark .dark:prose-dark{color:#d1d5db}.dark .dark:prose-dark a{color:#60a5fa}.dark .dark:prose-dark a:hover{color:#2563eb}.dark .dark:prose-dark h2,.dark .dark:prose-dark h3,.dark .dark:prose-dark h4{scroll-margin-top:8rem;color:#f3f4f6}.dark .dark:prose-dark hr{border-color:#374151}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(1rem*var(--tw-space-y-reverse));margin-top:calc(1rem*(1 - var(--tw-space-y-reverse)))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgba(229,231,235,var(--tw-bg-opacity))}.bg-gray-700{--tw-bg-opacity:1;background-color:rgba(55,65,81,var(--tw-bg-opacity))}.hover:bg-white:hover{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.dark .dark:bg-black{--tw-bg-opacity:1;background-color:rgba(0,0,0,var(--tw-bg-opacity))}.dark .dark:bg-gray-300{--tw-bg-opacity:1;background-color:rgba(209,213,219,var(--tw-bg-opacity))}.dark .dark:bg-gray-800{--tw-bg-opacity:1;background-color:rgba(31,41,55,var(--tw-bg-opacity))}.bg-opacity-60{--tw-bg-opacity:0.6}.border-gray-200{--tw-border-opacity:1;border-color:rgba(229,231,235,var(--tw-border-opacity))}.hover:border-gray-900:hover{--tw-border-opacity:1;border-color:rgba(17,24,39,var(--tw-border-opacity))}.dark .dark:border-gray-800{--tw-border-opacity:1;border-color:rgba(31,41,55,var(--tw-border-opacity))}.rounded{border-radius:.25rem}.rounded-lg{border-radius:.5rem}.rounded-full{border-radius:9999px}.border-solid{border-style:solid}.border{border-width:1px}.border-b{border-bottom-width:1px}.cursor-pointer{cursor:pointer}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-self-end{justify-self:end}.font-medium{font-weight:500}.font-bold{font-weight:700}.h-4{height:1rem}.h-6{height:1.5rem}.h-10{height:2.5rem}.h-40{height:10rem}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem}.text-lg,.text-xl{line-height:1.75rem}.text-xl{font-size:1.25rem}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.leading-5{line-height:1.25rem}.my-0{margin-bottom:0;margin-top:0}.my-2{margin-bottom:.5rem;margin-top:.5rem}.mx-auto{margin-left:auto;margin-right:auto}.mr-1{margin-right:.25rem}.mr-2{margin-right:.5rem}.mb-2{margin-bottom:.5rem}.ml-2{margin-left:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mb-4{margin-bottom:1rem}.mt-8{margin-top:2rem}.mb-8{margin-bottom:2rem}.mt-12{margin-top:3rem}.mb-16{margin-bottom:4rem}.max-w-none{max-width:none}.max-w-2xl{max-width:42rem}.max-w-4xl{max-width:56rem}.max-w-prose{max-width:65ch}.object-cover{-o-object-fit:cover;object-fit:cover}.p-1{padding:.25rem}.p-3{padding:.75rem}.p-4{padding:1rem}.p-8{padding:2rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.px-4{padding-left:1rem;padding-right:1rem}.px-8{padding-left:2rem;padding-right:2rem}.pt-2{padding-top:.5rem}.pb-4{padding-bottom:1rem}.pb-16{padding-bottom:4rem}*{--tw-shadow:0 0 transparent}.hover:shadow:hover{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:0 0 transparent,0 0 transparent,var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}*{--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,0.5);--tw-ring-offset-shadow:0 0 transparent;--tw-ring-shadow:0 0 transparent}.text-left{text-align:left}.text-center{text-align:center}.text-black{--tw-text-opacity:1;color:rgba(0,0,0,var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.text-gray-300{--tw-text-opacity:1;color:rgba(209,213,219,var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity:1;color:rgba(107,114,128,var(--tw-text-opacity))}.text-gray-600{--tw-text-opacity:1;color:rgba(75,85,99,var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgba(55,65,81,var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity:1;color:rgba(31,41,55,var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgba(17,24,39,var(--tw-text-opacity))}.hover:text-gray-600:hover{--tw-text-opacity:1;color:rgba(75,85,99,var(--tw-text-opacity))}.hover:text-gray-900:hover{--tw-text-opacity:1;color:rgba(17,24,39,var(--tw-text-opacity))}.dark .dark:text-black{--tw-text-opacity:1;color:rgba(0,0,0,var(--tw-text-opacity))}.dark .dark:text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.dark .dark:text-gray-100{--tw-text-opacity:1;color:rgba(243,244,246,var(--tw-text-opacity))}.dark .dark:text-gray-200{--tw-text-opacity:1;color:rgba(229,231,235,var(--tw-text-opacity))}.dark .dark:text-gray-300{--tw-text-opacity:1;color:rgba(209,213,219,var(--tw-text-opacity))}.dark .dark:text-gray-400{--tw-text-opacity:1;color:rgba(156,163,175,var(--tw-text-opacity))}.dark .dark:text-gray-700{--tw-text-opacity:1;color:rgba(55,65,81,var(--tw-text-opacity))}.capitalize{text-transform:capitalize}.tracking-tight{letter-spacing:-.025em}.w-4{width:1rem}.w-6{width:1.5rem}.w-10{width:2.5rem}.w-40{width:10rem}.w-full{width:100%}.gap-4{grid-gap:1rem;gap:1rem}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}@-webkit-keyframes ping{75%,to{opacity:0;transform:scale(2)}}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}@-webkit-keyframes pulse{50%{opacity:.5}}@keyframes pulse{50%{opacity:.5}}@-webkit-keyframes bounce{0%,to{-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}@keyframes bounce{0%,to{-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}@font-face{font-display:optional;font-family:Inter;font-style:normal;src:url(/assets/fonts/inter-latin-variable-full-normal.woff2) format("woff2")}@media (min-width:640px){.sm:text-lg{font-size:1.125rem;line-height:1.75rem}.sm:p-4{padding:1rem}.sm:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:768px){.md:flex-row{flex-direction:row}.md:items-center{align-items:center}.md:text-xl{font-size:1.25rem;line-height:1.75rem}.md:text-3xl{font-size:1.875rem;line-height:2.25rem}.md:text-4xl{font-size:2.25rem;line-height:2.5rem}.md:text-5xl{font-size:3rem;line-height:1}.md:my-8{margin-bottom:2rem;margin-top:2rem}}@media (min-width:1280px){.xl:max-w-4xl{max-width:56rem}.xl:px-0{padding-left:0;padding-right:0}}
          `}</style>
          </>
        )}

        {!isAmp && (
          <link
            rel="amphtml"
            href={`${basePath}${asPath === '/' ? '/index' : asPath.substr(0, asPath.length - 1)}.amp/`}
          />
        )}
      </Head>

      {isAmp && (
        <amp-analytics type="gtag" data-credentials="include">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: `{ "vars" : { "gtag_id": "${GTM_ID}", "config" : { "${GTM_ID}": {"groups": "default" } } } }`,
            }}
          />
        </amp-analytics>
      )}

      <NextSeo
        title={title}
        description={description}
        canonical={`${SEO.siteUrl}${basePath}${asPath}`}
      />

      <SocialProfileJsonLd
        type="Person"
        name={SEO.person.name}
        url={`${SEO.siteUrl}/`}
        sameAs={Object.values(SEO.socials)}
      />

      {isAmp ? (
        <HeaderAmp />
      ) : (
          <Header />
        )}

      <main className="flex flex-col justify-center bg-white dark:bg-black px-8">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
