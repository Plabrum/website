# Portfolio Website

This project showcases all the projects that I have worked on over the past few years. Take a look at the finished [website](https://plabrum.com)!

Interested in how I built this project and selected the technologies? 

[Read the writeup at plabrum.com](https://plabrum.com/projects/portfolio_website)



### Technologies used:

* Hosting Provider: `Vercel`

* Framework: `Next.js `

* UI Library: `React`

* Primary Language: `Typescript`

* Styling: `TailwindCSS`

* Animation: Framer: `Motion`

* Content Management: `Sanity`

* Bot Protection: `ReCaptcha V3`

  

#### Technical Description

This website dynamically loads content from Sanity.io which is used as the headless content management system (CMS). You can see the components related to sanity in pages/studio/[[...index]].tsx`. 

All pages on this website are statically generated allowing for deployment on CDN, any content updates trigger a webhook that regenerates just the required pages using a serverless function. This allows the website to be incredibly efficient - running completely for free (save for the yearly domain name DNS fee), and highly scalable (in the vanishingly small event that my portfolio goes viral).

All images are using the `next/image` component and set with `priority` and `sizes` tags were necessary. The `sizes` tag triggers Next.js to generate images with only the resolution necessary for the device size, ensuring that unnecessary resolution does not hold back loading time. The `priority` tag keeps certain images from lazy loading so that any important large images will be ready for viewing by the time the user has scrolled down to them. 

Google reCaptcha V3 protects the contact form at the bottom from crawlers submitting junk mail. The reduced user friction comes at a cost - the entire website is wrapped in a `GoogleReCaptchaProvider` higher-order component significantly impacting the page load times.

The contact form at the bottom uses `nodemailer` via a next serverless function, allowing for contact requests to be made without a dedicated backend. Very fancy!

All content styling is taken care of via Tailwind CSS which is deeply integrated into Next.js, compiling only the necessary utility classes at build time, reducing bundle size, and avoiding the dreaded task of css class design.

Lastly, all animation is completed via Framer Motion, a React animation library that has very appealing syntax but rather weak documentation. There are just a few animations sprinkled about to add a bit of an ooh and ahh factor.

## Instructions for starting up a clone:

First, there are a few environment variables that must be set in a `.env.local` or equivalent on the server:

```yaml
######## For Sanity ########
# Available in your Sanity.io project
NEXT_PUBLIC_SANITY_PROJECT_ID=
# Available in your Sanity.io project
NEXT_PUBLIC_SANITY_DATASET=
# Date in the form yyyy-mm-dd
NEXT_PUBLIC_SANITY_API_VERSION=
# Token set in Sanity Webhook for ISR
REVALIDATION_TOKEN=

######## For Recaptcha ########
# e.g. http://localhost:3000
NEXT_PUBLIC_BASE_URL=
# Available in Recaptcha Console
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
# Available in Recaptcha Console
RECAPTCHA_SECRET_KEY=

######## For Nodemailer ########
# Sending Email Address
GMAIL_EMAIL_ADDRESS=
# Insecure App password from Gmail
GMAIL_APP_PASSWORD=
```

Then you should be able to install the required packages and run a development environment:

```bash
yarn add && yarn dev
```

