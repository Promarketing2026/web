import { defineField, defineType } from "sanity";

export const glosarioTermino = defineType({
  name: "glosarioTermino",
  title: "Termino de glosario",
  type: "document",
  fields: [
    defineField({
      name: "termino",
      title: "Termino",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "definicionCorta",
      title: "Definicion corta",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "definicionExtendida",
      title: "Definicion extendida",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
