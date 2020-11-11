export const query = `
query getCareers {
  entry(section: "careers", limit: 1) {
    ... on careers_careers_Entry {
      metaTitle
      metaDescription
      ogImage
      introduction
      additionalCopy
      vacancies {
        ... on vacancies_vacancy_BlockType {
          jobTitle
          location
          shortSummary
          pdf {
            ... on downloads_Asset {
              url
            }
          }
        }
      }
    }
  }
}
`