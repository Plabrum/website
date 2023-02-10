import { defineField, defineType } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export default defineType({
  name: "company",
  title: "Company",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Company Name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "string",
      name: "description",
      title: "Description",
    }),
    defineField({
      name: "logo_image",
      title: "Logo Image",
      type: "image",
      description: "This image will be used as the company logo image.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "company_page",
      title: "URL to company Homepage",
      type: "url",
    }),
  ],
});
