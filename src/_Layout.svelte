<script>
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  export let params = {}

  
  import { url, options, sitewideData as sitewideData } from './stores/global-store'
  import {query } from './stores/graphql-queries/sitewide-query'

  let loading = fetch(url, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    sitewideData.update(() => {
      return json.data
    });
    //console.log(json.data)

  })
  .catch(console.error);
  
  import { fade } from 'svelte/transition'
  
  import SiteHeader from './Components/SiteHeader.svelte';
  import SiteFooter from './Components/SiteFooter.svelte';
  import LoadingScreen from './Components/LoadingScreen.svelte';

</script>

{#if $sitewideData}
  <div class="page" in:fade="{{delay: 500, duration: 300}}">
    <SiteHeader
      links="{$sitewideData.globalSet.navigationLinks}"
      currentRoute="{currentRoute}"
    />
    <main>
    <Route {currentRoute}  {params} />
    </main>
    <SiteFooter
      links="{$sitewideData.globalSet.footerLinks}"
      email="{$sitewideData.entry.email}"
      tel="{$sitewideData.entry.tel}"
      address="{$sitewideData.entry.address}"
    />
  </div>
{:else}
  <LoadingScreen/>
{/if}


<style>

  .page {    
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
</style>