<script>
  import { url, options, pagesData } from '../stores/global-store'
  import { query } from '../stores/graphql-queries/pages-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte';
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  export let currentRoute
  $: slug = currentRoute.namedParams.slug
  let token = currentRoute.queryParams.token
  let queryUrl
  if (token) queryUrl = url + '?token=' + token
  else queryUrl = url

  fetch(queryUrl, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    

    pagesData.update(() => {
      // consider appending data-aos="fade-up" to all paragraph tags in the json
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
    'page_title' : 'page',
    'page_path': currentRoute.path
  });



</script>

<svelte:head>
  <title>Cogentia</title>
</svelte:head>

{#if $pagesData}
  {#each $pagesData.entries as page}
  {#if page.slug == slug}


    <div class="container">

      <div class="header">
        <h1 class="show">{page.title}</h1>
      </div>


      <div class="copy" data-aos="fade-up">
        {@html page.copy}
      </div>    
    </div>
    
  {/if}
  {/each}
{:else}
  <LoadingIcon/>  
{/if}

<style>
@media (min-width: 768px) {
  .header {
    padding-left: 8.3333%; padding-right: 8.3333%;
  padding-top: 4rem;
  }
  .copy {
    padding-left: 16.6666%; padding-right: 16.6666%;
  }
}
  :global(.copy ul) {
    margin-bottom: 2rem;
  }
  :global(.copy ul li) {
    position: relative;
    margin-bottom: 1rem;
    padding-left: 2rem;
    list-style-type: none;
    font-size: 1.6rem; line-height: 1.2em;
  }
  :global(.copy ul li:before) {
    content: "";
    position: absolute; left: 0; top: 0.25rem;
    display: block; width: 0; height: 0;
    margin: 0.2rem 0.5rem 0 0;
    border-top: 5px solid transparent; border-bottom: 5px solid transparent;  
    
  }
  :global(.copy ul li:before) {
    border-left: 10px solid #BD1622;
  }:global(.copy li li:before) {
  content: "-";
  position: absolute; left: 0; top: 0;
  display: block; width: 0; height: 0;
  margin: 0rem 0.5rem 0 0;
  border: none;
  
}
  </style>
