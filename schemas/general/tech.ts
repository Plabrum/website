import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";

export default defineType({
  name: "tech",
  title: "Technology",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Technology Name",
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
      description: "This image will be used as the technologies logo image.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "tech_page",
      title: "URL to Tech Homepage",
      type: "url",
    }),
  ],
});
