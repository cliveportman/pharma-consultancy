import Layout from './_Layout.svelte'
import Homepage from './Pages/Homepage.svelte'
import About from './Pages/About.svelte'
import Services from './Pages/Services.svelte'
import CaseStudies from './Pages/CaseStudies.svelte'
import Team from './Pages/Team.svelte'
import Publications from './Pages/Publications.svelte'
import Contact from './Pages/Contact.svelte'
import Page from './Pages/_Page.svelte'
 
const routes = [

  { name: '/', layout: Layout, component: Homepage },
  { name: 'about', layout: Layout, component: About },

  { 
    name: 'services', 
    layout: Layout, 
    component: Services,
    nestedRoutes: [
      {
        name: ':slug',
      }
    ]
  },

  { name: 'case-studies', layout: Layout, component: CaseStudies },
  { name: 'team', layout: Layout, component: Team },
  { name: 'publications', layout: Layout, component: Publications },
  { name: 'contact', layout: Layout, component: Contact },
  { name: 'p/:slug', layout: Layout, component: Page },
  

]
 
export { routes }