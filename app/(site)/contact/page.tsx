import ContactForm from 'components/site/ContactForm'

export const metadata = {
  title: 'Contact — Phil Labrum',
  description: 'Get in touch.'
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-measure">
      <h2 className="mb-8 mt-14 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">Contact</h2>
      <ContactForm />
    </div>
  )
}
