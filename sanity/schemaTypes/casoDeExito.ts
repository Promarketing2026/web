import { defineField, defineType } from "sanity";

export const casoDeExito = defineType({
  name: "casoDeExito",
  title: "Caso de exito",
  type: "document",
  fields: [
    defineField({
      name: "cliente",
      title: "Cliente",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "situacion",
      title: "Situacion",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intervencion",
      title: "Intervencion",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resultado",
      title: "Resultado",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cifraDestacada",
      title: "Cifra destacada",
      type: "string",
      description: "Ejemplo: +38% en oportunidades trazables",
    }),
  ],
});
