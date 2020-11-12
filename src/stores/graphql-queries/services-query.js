export const query = `
query getServices {
  entry(section:"servicesOverview", limit: 1) {
     ...on servicesOverview_servicesOverview_Entry {
      paragraph1
      paragraph2
      metaTitle
      metaDescription
      ogImage
  	} 
  }
  entries(section:"services") {
      slug
      uri
    ...on services_services_Entry {
      title
      colour1
      colour2
      objective
      projectTypes {
        item
      }
      detailedCaseStudy {
        ... on caseStudies_long_Entry {
          title
          summary
          challengeDetails {
            ... on challengeDetails_block_BlockType {
              heading
              bullets {
                item
              }
            }
          }
          projectDetailsFlags {
            ... on flags_Asset {
              url
              title
            }
          }
          projectDetails {
            ... on projectDetails_block_BlockType {
              heading
              bullets {
                item
              }
            }
          }
          solutionDetails {
            ... on solutionDetails_block_BlockType {
              heading
              copy
            }
          }
          outcomeDetails {
            ... on outcomeDetails_block_BlockType {
              heading
              bullets {
                item
              }
            }
          }
          arrowText
          quote
        }
        
      }
      metaTitle
      metaDescription
      ogImage
    }
  }
}
`