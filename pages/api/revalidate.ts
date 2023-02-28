import { NextApiRequest, NextApiResponse } from "next";
import { isValidRequest, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { isValidSignature } from "@sanity/webhook";

const secret = process.env.REVALIDATION_TOKEN || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    console.error("Must be a POST request");
    return res.status(401).json({ message: "Must be a POST request" });
  }
  // Check for secret to confirm this is a valid request
  if (!isValidRequest(req, secret)) {
    return res.status(401).json({ message: "Invalid signature" });
  }

  try {
    const {
      body: { type, slug },
    } = req;
    // in some cases there may be multiple paths to revalidate
    var pathToRevalidate = "/";
    switch (type) {
      case "project": {
        pathToRevalidate = slug;
      }
      case "tech": {
        pathToRevalidate = "/";
      }
      case "about": {
        pathToRevalidate = "/";
      }
      case "experience": {
        pathToRevalidate = "/";
      }
      default: {
        pathToRevalidate = "/";
      }
    }

    await res.revalidate(pathToRevalidate);

    return res.json({ revalidated: true });
  } catch (err) {
    // Could not revalidate. The stale page will continue to be shown until
    // this issue is fixed.
    return res.status(500).send("Error while revalidating");
  }
}

const sanity_revalidate_groq_query = `{
    "type":_type,
    "slug": slug.current,
    "tech_slugs": *[_type=="project"&& name in technologies[]->name]{"slug":slug.current}


    "tech_slugs":*[references(^._id)&&_type=="project"].slug.current
}`;
