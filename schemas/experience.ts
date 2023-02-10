import { OkHandIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: OkHandIcon,
  fields: [
    defineField({
      name: "role",
      description: "This field is the title of your role in the experience.",
      title: "Role Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "overview",
      description:
        "Used both for the <meta> description tag for SEO, and project subheader.",
      title: "Overview",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: "Italic",
                value: "em",
              },
              {
                title: "Strong",
                value: "strong",
              },
            ],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "duration",
    }),

    defineField({
      name: "decription",
      title: "Project Description",
      type: "blockContent",
    }),

    defineField({
      name: "technologies",
      title: "Tech Used",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tech" }],
        },
      ],
    }),
  ],
});
