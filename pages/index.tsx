import Link from 'next/link'

import Layout from '../components/Layout'

import { attributes, html } from '../content/_pages/home.md'

export default function Home() {
  return (
    <Layout>
      <div className="container w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col justify-center items-center text-center mt-12 md:mt-20 pb-12 mx-40 border-b border-gray-300">
          <div className="h-40 w-40 m-5">
            <picture>
              <source
                srcSet={require('../public/images/profile.png?webp')}
                type="image/webp"
              />
              <source
                srcSet={require('../public/images/profile.png')}
                type="image/png"
              />
              <img
                className="object-cover rounded-full"
                src={require('../public/images/profile.png')}
                alt={attributes.title}
                title={attributes.title}
              />
            </picture>
          </div>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            {attributes.title}
          </h1>
          <div
            className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <div className="flex flex-col my-8">
          <h3 className="text-lg tracking-tight md:text-3xl">Blog</h3>

          <div className="py-6 px-2 prose">
            <ul>
              <li>
                <Link href="https://blog.emmanuelgautier.fr/git-sensibilite-casse/">
                  <a target="_blank">Git et la sensibilité à la casse</a>
                </Link>
              </li>
              <li>
                <Link href="https://blog.emmanuelgautier.fr/utilisateurs-et-privileges-sous-mysql/">
                  <a target="_blank">Utilisateurs et privilèges sous MySQL</a>
                </Link>
              </li>
              <li>
                <Link href="https://blog.emmanuelgautier.fr/installer-et-configurer-un-serveur-dns-avec-bind9-sous-linux/">
                  <a target="_blank">
                    Installer et configurer un serveur DNS avec Bind9 sous Linux
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col my-8">
          <h3 className="text-lg tracking-tight md:text-3xl">Projets</h3>

          <div className="py-6 px-2 prose">
            <ul>
              <li>
                <Link href="https://www.data-show.com/">
                  <a target="_blank">Data Show</a>
                </Link>
              </li>

              <li>
                <Link href="https://www.planete-durable.fr/">
                  <a target="_blank">Planète Durable</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
