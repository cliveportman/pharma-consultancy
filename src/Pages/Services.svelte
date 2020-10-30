<script>
  import { url, options, servicesData as pageData } from '../stores/global-store'
  import { query } from '../stores/graphql-queries/services-query'

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
  {$pageData.entry.paragraph1}
{:else}
  <p>Loading...</p>
{/if}
