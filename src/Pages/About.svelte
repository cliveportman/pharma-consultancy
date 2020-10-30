<script>
  import { url, options, aboutData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/about-query'

  fetch(url, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    pageData.update(() => {
      return json.data
    });

   })
  .catch(console.error);

</script>


{#if $pageData}
  <h1>About</h1>
{:else}
  <p>Loading...</p>
{/if}
