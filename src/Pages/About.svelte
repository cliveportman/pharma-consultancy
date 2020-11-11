<script>
  import { onMount } from 'svelte'
  import { url, options, aboutData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/about-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte';
  import AOS from 'aos'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  export let currentRoute  
  let token = currentRoute.queryParams.token

  fetch(url + '?token='+token, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {
    

    pageData.update(() => {
      // consider appending data-aos="fade-up" to all paragraph tags in the json
      return json.data
    });

   })
  .catch(console.error);

  // onMount(() => {
  //   AOS.init();
  // });

</script>

{#if $pageData}

  <h1>About</h1>

  <div class="holder">
    <img src="/img/cambridge.svg" alt="" class="cambridge">
  </div>

  <div class="container">
    <div class="copy" data-aos="fade-up">
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
