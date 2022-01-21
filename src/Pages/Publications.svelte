<script>
  import { url, options, publicationsData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/publications-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  export let currentRoute  
  let token = currentRoute.queryParams.token
  let queryUrl
  if (token) queryUrl = url + '?token=' + token
  else queryUrl = url

  fetch(queryUrl, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {
    console.log(json.data)

    pageData.update(() => {
      return json.data
    });

   })
  .catch(console.error);

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

    <div class="publications">
      {#each $pageData.entries as publication}
      {#if publication.pdf[0]}
        <div class="publication" data-aos="fade-up">
          <header>
            <h6>Publication</h6>
            <h3>{publication.title}</h3>
          </header>
          <div class="summary">
            {@html publication.summary}
            <a href="{publication.pdf[0].url}" class="download">Download PDF</a>
          </div>
        </div>
        {/if}
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
