export const query = `
query getSitewide {
  globalSet(handle: "sitewide") {
    id
    ...on sitewide_GlobalSet {
      navigationLinks {
        title
        uri
        url
        ...on homepage_homepage_Entry {
          linkTitle
        }
        ...on about_about_Entry {
          linkTitle
        }
        ...on caseStudiesOverview_caseStudiesOverview_Entry {
          linkTitle
        }
        ...on contact_contact_Entry {
          linkTitle
        }
        ...on servicesOverview_servicesOverview_Entry {
          linkTitle
        }
        ...on publicationsOverview_publicationsOverview_Entry {
          linkTitle
        }
        ...on team_team_Entry {
          linkTitle
        }
      }
      linkedinUrl
      testimonials {
        ...on testimonials_testimonials_Entry {
          quote
          source
        }
      }
      footerLinks {
        title
        uri
        url
        ...on homepage_homepage_Entry {
          linkTitle
        }
        ...on about_about_Entry {
          linkTitle
        }
        ...on caseStudiesOverview_caseStudiesOverview_Entry {
          linkTitle
        }
        ...on contact_contact_Entry {
          linkTitle
        }
        ...on servicesOverview_servicesOverview_Entry {
          linkTitle
        }
        ...on publicationsOverview_publicationsOverview_Entry {
          linkTitle
        }
        ...on team_team_Entry {
          linkTitle
        }
      }
    }
  }
  entry(section:"contact", limit: 1) {
     ...on contact_contact_Entry {
      address
      tel
      email
      successMessage
      metaTitle
      metaDescription
      ogImage
  	} 
  }
  entries(section:"testimonials") {
    ...on testimonials_testimonials_Entry {
      source
      quote
    }
  }
}
`