export const query = `
query getTeam {
  
  entry(section:"team", limit: 1) {
     ...on team_team_Entry {
      introduction
      metaTitle
      metaDescription
      ogImage
  	} 
  }
  entries(section:"people") {
    ...on people_people_Entry {
      firstName
      lastName
      title1
      title2
      bio
      portrait {
        ...on images_Asset {
          url
        }
      }
      team {
        slug
      }
    }
  }
  categories(groupId: 1) {
    title
    slug
  }
}
`