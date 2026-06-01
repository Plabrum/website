import ContactForm from 'components/site/ContactForm'

export const metadata = {
  title: 'Contact — Phil Labrum',
  description: 'Get in touch.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-measure">
      <h2 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold mt-14 mb-8">
        Contact
      </h2>
      <ContactForm />
    </div>
  )
}
