<script>
  import { url, options, contactData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/contact-query'

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
  <h1>Contact</h1>
{:else}
  <p>Loading...</p>
{/if}
