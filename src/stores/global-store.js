import { writable } from 'svelte/store'

export const url = "https://8819e3f9e6413ededb6aceec8a489abe-17531.sites.k-hosting.co.uk/api"

export function options(query) {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  }
}

export const sitewideData = writable();
export const homepageData = writable();
export const aboutData = writable();
export const servicesData = writable();
export const caseStudiesData = writable();
export const publicationsData = writable();
export const teamData = writable();
export const careersData = writable();
export const contactData = writable();
export const pagesData = writable();
export const activeFilters = writable();

