export const query = `
query getHomepage {
  entry(section:"homepage", limit: 1) {
     ...on homepage_homepage_Entry {
      
      metaTitle
      metaDescription
      ogImage
      threeTextBlocks {
        ...on threeTextBlocks_block_BlockType {
          heading
          text
        }
      }
    
  	} 
  }
}
`