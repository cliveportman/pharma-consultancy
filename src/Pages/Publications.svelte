<script>
  import { url, options, publicationsData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/publications-query'

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
  <h1>Publications</h1>
{:else}
  <p>Loading...</p>
{/if}
