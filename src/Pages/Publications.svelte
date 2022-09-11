<script>
  import { url, options, publicationsData as pageData, publicationsData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/publications-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  export let currentRoute  
  let token = currentRoute.queryParams.token
  let queryUrl
  if (token) queryUrl = url + '?token=' + token
  else queryUrl = url
  
  let publications = [], activePublications = []
  fetch(queryUrl, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    pageData.update(() => {
      publications = json.data.publications
      activePublications = publications
      prepFilter()
      return json.data
    });

   })
  .catch(console.error);

  let filterdata = {}, publicationTypes = [], projectTypes = []
  const prepFilter = () => {
    publications.forEach(publication => {
      publication.publicationType.forEach(type => {
        if (!publicationTypes.includes((type.title))) publicationTypes.push(type.title)
      })
      publication.projectType.forEach(type => {
        if (!projectTypes.includes((type.title))) projectTypes.push(type.title)
      })      
    })
    console.log('Pub types', publicationTypes)
    console.log('Proj types', projectTypes)
  }


  let activeFilters = [] 
  console.log('filter', activeFilters)
  console.log('to show', activePublications)
  const filterClick = (type) => {

    // If the type is already in the filter remove it and return
    if (activeFilters.indexOf(type) !== -1) {
      activeFilters.splice(activeFilters.indexOf(type), 1)
      console.log('filterTerms', activeFilters)
      console.log('to show', activePublications)
      filter()
      return
    }

    // The type is not in the filter, so add it
    activeFilters.push(type)
    if (publicationTypes.includes(type)) {
      //console.log('Pub type: ', type)
    }
    if (projectTypes.includes(type)) {
      //console.log('Proj type: ', type)
    }
    filter()
  }

  const filter = () => {

    // Reset the active publications
    activePublications = []

    // If the filter is empty, display them all
    if (activeFilters.length == 0) {
      activePublications = publications
      return
    }

    // The filter is not empty, so filter for publications of the right publication type
    publications.forEach(publication => {
      publication.publicationType.forEach(type => {
        if (activeFilters.includes((type.title))) {
          activePublications.push(publication)
        }
      })
    })
    // Then filter for publications of the right project type, but avoid duplicating those added already
    publications.forEach(publication => {
      publication.projectType.forEach(type => {
        if (activePublications.indexOf(publication) == -1 && activeFilters.includes((type.title))) {
          activePublications.push(publication)
        }
      })
    })
    console.log('filter', activeFilters)
    console.log('to show', activePublications)
  }

import { onMount } from 'svelte'
import AOS from 'aos'
onMount(() => {
  AOS.init();
});

gtag('config', 'UA-26565851-1', {
  'page_title' : 'publications',
  'page_path': currentRoute.path
});

</script>

<svelte:head>
  <title>Publications / Cogentia</title>
</svelte:head>


{#if $pageData}

  <div class="container">

    <div class="header">
      <h1 class="show">Publications</h1>
    </div>

    <div class ="filter">
      {#each publicationTypes as type}
        <button type="button" on:click="{ () => { filterClick(type) }}">{type}</button>
      {/each}
      <div class="advancedfilter">
        {#each projectTypes as type}
          <button type="button" on:click="{ () => { filterClick(type) }}">{type}</button>
        {/each}
      </div>
    </div>

    <div class="publications">
      {#each $pageData.publications as publication}
        <div class="publication" data-aos="fade-up">
          <header>
            <h6>Publication</h6>
            <h3>{publication.title}</h3>
          </header>
          <div class="summary">
            {@html publication.summary}
            {#if publication.pdf}<a href="{publication.pdf[0].url}" class="download">Download PDF</a>{/if}
          </div>
        </div>
      {/each}
    </div>
    <TestimonialsCarousel/>
  </div>
{:else}
  <LoadingIcon/> 
{/if}

<style>


@media (min-width: 768px) {
  
  .publications {
    margin: 0 auto 6rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
  }
@media (min-width: 1024px) {
  
.publications {
  width: 83.3333%;
}
}
  .publication{
    margin-bottom: 2rem;
  }
  header {
    padding: 1.5rem 2rem;
    background: #E0EAED;
  }
    h6 {
      display: block;
      margin: 0 0 0.5rem;
      font-size: 1.2rem; line-height: 1.2em;;
      text-transform: uppercase; color: #595958;
    }
    h3 {
      margin: 0;
      font-size: 1.6rem;
      color: #1D1D1D;
    }
    .publication .summary{
      padding: 2rem 2rem;
      background: linear-gradient(#F3F2ED, #ffffff);      
    }

    .download {
      display: block;
      margin-top: -1rem;
      color: #BD1622; font-size: 1.4rem; text-transform: uppercase; text-decoration: none;
      text-align: right; font-weight: 700;

    }
    .download:focus, .download:hover, .download:active {
      text-decoration: underline;
    }
    .download:after {
      content: "";
      display: inline-block; width: 3rem; height: 3rem;
      margin-left: 2rem;
      border-top: 1px solid #BD1622; border-right: 1px solid #BD1622;
      transform: rotate(135deg); 

    }
</style>
