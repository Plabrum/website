'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { sendContactMessage, type ContactState } from 'app/actions'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Textarea } from 'components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(1, 'Message is required'),
  website: z.string().max(0).optional(),
})

type ContactValues = z.infer<typeof contactSchema>

const fieldInputClass =
  'border-0 border-b border-rule rounded-none px-0 py-2 h-auto text-[17px] font-serif bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-accent placeholder:italic placeholder:text-muted/60'
const fieldTextareaClass = `${fieldInputClass} min-h-[140px] leading-[1.6] resize-none`
const labelClass =
  'font-sans text-[11px] uppercase tracking-[0.12em] text-muted font-medium'

export default function ContactForm() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', message: '', website: '' },
  })
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [status, setStatus] = useState<ContactState>(null)
  const [isPending, startTransition] = useTransition()

  const onSubmit = (data: ContactValues) => {
    setStatus(null)
    startTransition(async () => {
      let token = ''
      if (executeRecaptcha) {
        try {
          token = await executeRecaptcha('contact')
        } catch {
          token = ''
        }
      }
      const result = await sendContactMessage({
        name: data.name,
        email: data.email,
        message: data.message,
        website: data.website || '',
        token,
      })
      setStatus(result)
      if (result?.ok) form.reset()
    })
  }

  const disabled = isPending || form.formState.isSubmitting

  return (
    <Form {...form}>
      <form className="flex flex-col gap-7" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClass}>Name</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="name" placeholder="Your name" className={fieldInputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClass}>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" placeholder="you@somewhere.com" className={fieldInputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClass}>Message</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="What's on your mind?" className={fieldTextareaClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input type="text" tabIndex={-1} autoComplete="off" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-5 mt-3 flex-wrap">
          <p className="font-sans text-[11px] text-muted max-w-[360px] leading-[1.5]">
            Protected by reCAPTCHA · Google&apos;s{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted border-b border-rule hover:text-accent hover:border-accent"
            >
              privacy
            </a>
            {' and '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted border-b border-rule hover:text-accent hover:border-accent"
            >
              terms
            </a>
            {' apply.'}
          </p>
          <Button
            type="submit"
            variant="outline"
            disabled={disabled}
            className="border-accent text-accent uppercase tracking-[0.14em] text-[13px] font-semibold px-[22px] py-3 h-auto hover:bg-accent hover:text-bg rounded-none"
          >
            {isPending ? 'Sending…' : 'Send →'}
          </Button>
        </div>

        {status?.ok === true && (
          <p className="mt-3 font-sans text-[13px] text-accent">Sent — I&apos;ll get back to you.</p>
        )}
        {status?.ok === false && (
          <p className="mt-3 font-sans text-[13px] text-destructive">{status.error}</p>
        )}
      </form>
    </Form>
  )
}
