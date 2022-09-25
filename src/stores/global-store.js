import { writable } from 'svelte/store'

export const url = "https://cogentia.theportman.co/api"

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

