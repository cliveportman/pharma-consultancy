export const query = `
query getPages {
  entries(section: "standalonePages") {
    ... on standalonePages_standalonePages_Entry {
      metaTitle
      metaDescription
      ogImage
      title
      slug
      copy
    }
  }
}
`