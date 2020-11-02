<script>
  import { url, options, homepageData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/homepage-query'

  fetch(url, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    pageData.update(() => {
      return json.data
    });

   })
  .catch(console.error);

  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

</script>


{#if $pageData}

  <h1>Homepage</h1>
  <TestimonialsCarousel/>
  
{:else}
  <img src="/img/loading.svg" alt="Loading...">

{/if}