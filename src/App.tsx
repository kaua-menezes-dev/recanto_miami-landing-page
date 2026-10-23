import { Navbar } from './components/layout/Navbar'
import { whatsapp } from './config/contact'
import { buildWhatsAppUrl } from './lib/whatsapp'
import { Hero } from './sections/hero/Hero'
import { Intro } from './sections/intro/Intro'
import { Spaces } from './sections/spaces/Spaces'
import { Stories } from './sections/stories/Stories'

const quoteHref = buildWhatsAppUrl(whatsapp.phone, whatsapp.messages.quote)
const visitHref = buildWhatsAppUrl(whatsapp.phone, whatsapp.messages.visit)

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="mode-evening sr-only z-50 bg-action-primary-bg px-4 py-3 text-action-primary-fg type-label focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Navbar quoteHref={quoteHref} />
      <main id="conteudo">
        <Hero quoteHref={quoteHref} />
        <Intro />
        <Spaces />
        <Stories visitHref={visitHref} />
      </main>
    </>
  )
}
