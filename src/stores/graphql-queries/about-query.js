export const query = `
query getAbout {
  entry(section:"about", limit: 1) {
     ...on about_about_Entry {
      
      metaTitle
      metaDescription
      ogImage
      copy
    
  	} 
  }
}
`