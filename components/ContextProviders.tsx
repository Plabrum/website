'use client';

import { ThemeProvider } from 'next-themes';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import '../styles/globals.css';
import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const recaptcha_key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  return (
    <ThemeProvider>
      <GoogleReCaptchaProvider
        reCaptchaKey={recaptcha_key}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        {children}
      </GoogleReCaptchaProvider>
    </ThemeProvider>
  );
}
