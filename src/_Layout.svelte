<script>
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  const params = {}

  
  import { url, options, sitewideData as sitewideData } from './stores/global-store'
  import {query } from './stores/graphql-queries/sitewide-query'

  fetch(url, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    sitewideData.update(() => {
      return json.data
    });
    console.log(json.data)

  })
  .catch(console.error);

</script>

<div class="app">
  <section class="section">
    <Route {currentRoute}  {params} />
  </section>
</div>


{#if $sitewideData}
  {#each $sitewideData.globalSet.navigationLinks as link}
    <a href="{link.uri}">{link.linkTitle ? link.linkTitle : link.title}</a>
  {/each}
{:else}
  <p>Loading...</p>
{/if}