<script>
  import { onMount } from 'svelte'
  import { url, options, aboutData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/about-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte';
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  export let currentRoute  
  let token = currentRoute.queryParams.token
  let queryUrl
  if (token) queryUrl = url + '?token=' + token
  else queryUrl = url

  fetch(queryUrl, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {
    

    pageData.update(() => {
      // consider appending data-aos="fade-up" to all paragraph tags in the json
      return json.data
    });

   })
  .catch(console.error);

  import AOS from 'aos'
  onMount(() => {
    AOS.init();
  });

gtag('config', 'UA-26565851-1', {
  'page_title' : 'about',
  'page_path': currentRoute.path
});

</script>

<svelte:head>
  <title>About / Cogentia</title>
</svelte:head>

{#if $pageData}

  <h1>About</h1>

  <div class="holder">
    <img src="/img/cambridge.svg" alt="" class="cambridge">
  </div>

  <div class="container">
    <div class="copy">
      {@html $pageData.entry.copy}
    </div>    
  </div>

  <div class="container">
    <TestimonialsCarousel/>
  </div>

{:else}
  <LoadingIcon/>  
{/if}

<style>

  .cambridge {
    width: 100vw;
    margin-bottom: 4rem;
  }

  @media (min-width: 1024px) {
    .holder {
      text-align: center;
    }
    .cambridge {
      width: 960px;
      margin: 0 auto 4rem;
    }
  }

  @media (min-width: 1367px) {
    .cambridge {
      width: 1160px;
      margin: 0 auto 4rem;
    }
  }

  .copy {
    margin-bottom: 4rem;
  }

@media (min-width: 768px) {

  .copy {
    width: 66.6666%; margin: 0 auto 6rem;
  }
}

@media (min-width: 1024px) {
}

@media (min-width: 1367px) {
}
  
  </style>
