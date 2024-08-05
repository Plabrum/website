import { NextApiRequest, NextApiResponse } from 'next';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const secret = process.env.REVALIDATION_TOKEN || '';
// const secret = process.env.MY_WEBHOOK_SECRET

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

async function readBody(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string;
  const body = await readBody(req); // Read the body into a string
  if (!isValidSignature(body, signature, secret)) {
    return res.status(402).json({ success: false, message: 'Invalid signature' });
  }

  const jsonBody = JSON.parse(body);

  try {
    const { type, slug } = jsonBody;
    // in some cases there may be multiple paths to revalidate

    switch (type) {
      case 'project':
        {
          await res.revalidate(slug);
          await res.revalidate('/');
          await res.revalidate('/projects');
        }
        break;
      default: {
        await res.revalidate('/');
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
}
