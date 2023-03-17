import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/schema";
import { codeInput } from "@sanity/code-input";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  name: "Personal_Website_Studio",
  title: "Personal Website Studio",

  projectId,
  dataset,
  // Previously
  // projectId: "oj0rz57b",
  // dataset: "production",
  plugins: [deskTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
});
