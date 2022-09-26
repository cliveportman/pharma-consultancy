<script>
  import { url, options, publicationsData as pageData, publicationsData, activeFilters } from '../stores/global-store'
  import { fade, slide } from 'svelte/transition'
  import {query } from '../stores/graphql-queries/publications-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  export let currentRoute  
  let token = currentRoute.queryParams.token
  let queryUrl, open = true
  if (token) queryUrl = url + '?token=' + token
  else queryUrl = url
  
  let publications = [], activePublications = []
  fetch(queryUrl, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    pageData.update(() => {
      publications = json.data.publications
      publications.forEach(publication => {
        publication.categories = []
        publication.publicationType.forEach(type => {
          publication.categories.push(type.title)
        })
        publication.projectType.forEach(type => {
          publication.categories.push(type.title)
        })      
      })
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
  }


  $activeFilters = []
  const filterClick = (category) => {

    // We need to assign otherwise it's not reactive
    let tempFilters = $activeFilters

    // If the category is already in the filter remove it and return
    if ($activeFilters.indexOf(category) !== -1) {
      tempFilters.splice($activeFilters.indexOf(category), 1)
      // We need to assign otherwise it's not reactive
      $activeFilters = tempFilters
      filter()
      return
    }

    // The type is not in the filter, so add it
    tempFilters.push(category)
    // We need to assign otherwise it's not reactive
    $activeFilters = tempFilters
    filter()
  }

  const filter = () => {

    // Reset the active publications
    activePublications = []

    // If the filter is empty, display them all
    if ($activeFilters.length == 0) {
      activePublications = publications
    }
    if ($activeFilters.length > 0) {
      // The filter is not empty, so filter for publications of the right publication type
      publications.forEach(publication => {

        // Check the publication isn't already selected
        if (activePublications.indexOf(publication) == -1) { 
          // Go through the activefilters. If they are included within the publication's categories,
          // then add the count to the satisfied filters. If all filters are satisfied, bingo.         
          let satisfiedFiltersCount = 0
          $activeFilters.forEach(filter => {
            if (publication.categories.includes(filter)) satisfiedFiltersCount++
          })
          if (satisfiedFiltersCount == $activeFilters.length) activePublications.push(publication)
        }

      })
    }
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

    <div class="filter">

      <div class="filter-header">
        <h3>Publication type</h3>
        <button type="button" class="openfilter" class:filtered="{open && $activeFilters.length}" on:click="{ () => { open = !open} }">
          {#if open && $activeFilters.length}
            View {activePublications.length} results
          {/if}
          {#if open && !$activeFilters.length}
            View all {publications.length} results
          {/if}
          {#if !open}
            <span>Advanced</span> Filter
          {/if}
        </button>
      </div>

      <div class="large publicationsfilter">
        <div class="buttonholder">
          {#each publicationTypes as type}
            <button type="button" class="category" class:selected="{$activeFilters.includes(type)}" on:click="{ () => { filterClick(type) }}">
              <div>
                <span class="outerbox"><span class="innerbox"></span></span>
                <span class="label">{type}</span>
              </div>            
            </button>
          {/each}
        </div>
      </div>

      {#if open}
      <div class="large projectsfilter" transition:slide>
        <h3>Project type</h3>
        <div class="buttonholder">
          {#each projectTypes as type}
            <button type="button" class="category" class:selected="{$activeFilters.includes(type)}" on:click="{ () => { filterClick(type) }}">
              <div>
                <span class="outerbox"><span class="innerbox"></span></span>
                <span class="label">{type}</span>
              </div>            
            </button>
          {/each}
        </div>
      </div>
      {/if}

      {#if open}
        <div class="smallfilter" transition:slide>
          <h3>Publication type</h3>
          {#each publicationTypes as type}
            <button type="button" class="category" class:selected="{$activeFilters.includes(type)}" on:click="{ () => { filterClick(type) }}">
              <div>
                <span class="outerbox"><span class="innerbox"></span></span>
                <span class="label">{type}</span>
              </div>            
            </button>
          {/each}
          <hr>
          <h3>Project type</h3>
          {#each projectTypes as type}            
            <button type="button" class="category" class:selected="{$activeFilters.includes(type)}" on:click="{ () => { filterClick(type) }}">
              <div>
                <span class="outerbox"><span class="innerbox"></span></span>
                <span class="label">{type}</span>
              </div>            
            </button>
          {/each}
        </div>
      {/if}

    </div>

    <div class="publications">
      {#each activePublications as publication}
        <div 
          class="article" transition:fade
          class:publication="{publication.categories.length && publication.categories.includes('Publication')}"
          class:other="{publication.categories.length && publication.categories.includes('Other')}"
          class:whitepaper="{publication.categories.length && publication.categories.includes('White paper')}"
          class:casestudy="{publication.categories.length && publication.categories.includes('Case studies')}"
        >
          <header>
            <!-- <h6>
              {#if publication.categories.length && publication.categories.includes('White paper')}White paper
              {:else if publication.categories.length && publication.categories.includes('Case studies')}Case study
              {:else if publication.categories.length && publication.categories.includes('Other')}Other
              {:else}Publication{/if}
            </h6> -->
            <h3>{publication.title}</h3>
            <h6>
              {#if publication.publicationType?.length}
                <div>
                  <strong>Publication type: </strong>
                  {#each publication.publicationType as item, index}
                    {item.title}{index + 1 != publication.publicationType.length ? ', ' : ''}
                  {/each}
                </div>
              {/if}
              {#if publication.projectType?.length}
                <div>
                  <strong>Project type: </strong>
                  {#each publication.projectType as item, index}
                    {item.title}{index + 1 != publication.projectType.length ? ', ' : ''}
                  {/each}
                </div>
              {/if}
            </h6>
          </header>
          <div class="summary">
            {@html publication.summary}
            {#if publication.pdf.length}<a href="{publication.pdf[0].url}" class="download">Download PDF</a>{/if}
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
  .article{
    margin-bottom: 2rem;
  }

  header {
    padding: 1.5rem 2rem;
    background: #E0EAED;
  }
  @media (min-width: 1024px) {
    .header {
      padding-left: 8.3333%; padding-right: 8.3333%;
    }
  }
  
  .filter {
    padding: 1.5rem 2rem;
    /*ackground: #F3F2ED; */
    background: white;

  }
  @media (min-width: 768px) {
    .filter {
      padding: 1.5rem 2rem;
      background: linear-gradient(#F3F2ED, #ffffff);
    }
  }
  @media (min-width: 1024px) {
    .filter {
      margin-left: 8.3333%; margin-right: 8.3333%;
    }
  }

  .filter-header {
  }
  @media (min-width: 768px) {
    .filter-header {
      display: flex; justify-content: space-between; align-items: flex-start;
    }
  }

  .filter h3 {    
    text-transform: uppercase; color: #BD1622; font-size: 1.6rem;
  }
    .filter-header h3 {
      display: none;
    }
    @media (min-width: 768px) {
      .filter-header h3 {
        display: block;
      }
    }

    .filter-header button.openfilter {
      display: block;
      border: 0.1rem solid #BD1622; border-radius: 0.5rem;
      padding: 0.5rem 6rem; margin: 0 auto 0;
      background: white;
      font-size: 1.4rem; line-height: 1em; color: #BD1622; text-transform: uppercase;
    }
    .filter-header button.openfilter.filtered {
      background: #BD1622; color: white;
    }
    @media (min-width: 768px) {
      .filter-header button.openfilter {
        padding: 0.5rem 3rem; margin: 0;
      }
    }


    .filter-header button.openfilter span {
      display: none;
    }
    @media (min-width: 768px) {
      .filter-header button.openfilter span {
        display: inline;
      }
    }



    .large.publicationsfilter {
      display: none;
    }
    @media (min-width: 768px) {
      .large.publicationsfilter {
        display: block;
      }
      .large.publicationsfilter .buttonholder {
        display: flex;
      }
      .large.publicationsfilter  button.category {
        margin-right: 2rem;
      }
    }
    .large.projectsfilter {
      display: none;
    }
    @media (min-width: 768px) {
      .large.projectsfilter {
        display: block;
        padding: 1.5rem 0 0; margin: 1.5rem 0 0;
        border-top: 0.1rem solid #595958;
      }
      .large.projectsfilter .buttonholder {
        display: grid; grid-template-columns: 50% 50%;
      }
    }
    .smallfilter {
      display: block;
      margin: 0 -4rem; padding: 1.5rem 2rem;
      background: linear-gradient(#F3F2ED, #ffffff);
      border-top: 1.5rem solid white;
    }
    @media (min-width: 768px) {
      .smallfilter {
        display: none;
      }
    }




    button.category {
      display: block;
      background: none; border: none;
      margin: 0 0 0.5rem;
    }

    button.category div {
      display: flex; justify-content: flex-start; align-items: center;
    }

    button.category .outerbox {
      display: block; width: 1.5rem; height: 1.5rem;
      margin-right: 0.75rem;
      border: 0.1rem solid #595958;
    }

    button.category .innerbox {
      display: block; width: 1.3rem; height: 1.3rem;
      border: 0.1rem solid white;
      background: #F3F2ED;
    }
    button.category.selected .innerbox {
      background: #BD1622;
    }

    button.category .label {
      display: block;
      font-size: 1rem; line-height: 1.2em; text-transform: uppercase; color: #595958; text-align: left;
    }

    @media (min-width: 1366px) {
      button.category .label {
        font-size: 1.2rem;
      }
    }


    hr {
      margin: 1rem 0.5rem 2rem;
    }









    h6 {
      display: block;
      margin: 0 0 0.5rem;
      font-size: 1.2rem; line-height: 1.5em;;
      text-transform: uppercase; color: #595958;
    }
    h6 strong {
      font-weight: 700;
    }
    .article h3 {
      margin: 0 0 1rem;
      font-size: 1.6rem;
      color: #1D1D1D;
    }
    .article .summary{
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
