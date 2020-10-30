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
    ...on services_services_Entry {
      title
      colour
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
              bullets {
                item
              }
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
          source
        }
        
      }
      metaTitle
      metaDescription
      ogImage
    }
  }
}
`