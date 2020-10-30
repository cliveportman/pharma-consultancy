export const query = `
query getContact {  
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
}
`