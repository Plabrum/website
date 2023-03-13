import { defineField, defineType } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export default defineType({
  name: "external",
  title: "External Html",
  type: "document",
  icon: ComponentIcon,
  fields: [
    defineField({
      type: "url",
      name: "link_to_html",
      title: "Link to html",
      validation: (rule) => rule.required(),
    }),
  ],
});
