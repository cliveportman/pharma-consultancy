export const query = `
query getPublications {
  
  entry(section:"publicationsOverview", limit: 1) {
     ...on publicationsOverview_publicationsOverview_Entry {
      metaTitle
      metaDescription
      ogImage
  	} 
  }
  publications: entries(section:"publications") {
    slug
    ...on publications_publication_Entry {
      service {
        slug
      }
      title
      summary
      pdf {
        ...on downloads_Asset {
          url
        }
      }
      projectType {
        slug
        title
      }
      publicationType {
        slug
        title
      }
    }
  }
}
`