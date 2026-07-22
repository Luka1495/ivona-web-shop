// sanity/schemaTypes/product.ts

import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Proizvod",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naziv",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Slike",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "price",
      title: "Cijena (EUR)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "string",
      options: {
        list: [
          { title: "Prstenje", value: "prstenje" },
          { title: "Narukvice", value: "narukvice" },
          { title: "Naušnice", value: "nausnice" },
          { title: "Ogrlice", value: "ogrlice" },
          { title: "Setovi", value: "setovi" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "material",
      title: "Materijal",
      type: "string",
      options: {
        list: [
          { title: "Srebro 925", value: "srebro-925" },
          { title: "Pozlaćeno srebro", value: "pozlaceno-srebro" },
          { title: "Chirurgical čelik", value: "chirurgical-celik" },
          { title: "Mesing", value: "mesing" },
        ],
      },
    }),
    defineField({
      name: "sizes",
      title: "Veličine (opcionalno)",
      type: "array",
      of: [{ type: "string" }],
      description: "Npr. za prstenje: S, M, L ili brojevi",
    }),
    defineField({
      name: "inStock",
      title: "Na lageru",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Istaknut proizvod",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0",
      price: "price",
    },
    prepare(selection) {
      const { title, media, price } = selection;
      return {
        title,
        subtitle: `${price} EUR`,
        media,
      };
    },
  },
});
