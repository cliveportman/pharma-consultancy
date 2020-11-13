export const query = `
query getCaseStudies {
  
  entry(section:"caseStudiesOverview", limit: 1) {
     ...on caseStudiesOverview_caseStudiesOverview_Entry {
      metaTitle
      metaDescription
      ogImage
  	} 
  }
  entries(section:"caseStudies") {
    slug
    ...on caseStudies_short_Entry {
      service {
        slug
      }
      title
      caseStudySummary
      pdf {
        ...on downloads_Asset {
          url
        }
      }
    }
    ... on caseStudies_long_Entry {
      service {
        slug
      }
      title
      caseStudySummary
      pdf {
        ...on downloads_Asset {
          url
        }
      }
    }
  }
}
`