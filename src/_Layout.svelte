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
    console.log(json.data)

  })
  .catch(console.error);
  
  import { fade, slide } from 'svelte/transition'
  
  import SiteHeader from './Components/SiteHeader.svelte';
  import SiteFooter from './Components/SiteFooter.svelte';

</script>



{#if $sitewideData}
  <div class="page" in:fade="{{delay: 1000, duration: 300}}">
    <SiteHeader
      links="{$sitewideData.globalSet.navigationLinks}"
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
  <div class="loader" out:fade="{{delay: 1000, duration: 300}}">
    <img src="/img/cogentia-logo.svg" alt="Cogentia" class="loader-logo">
    <img src="/img/loading.svg" alt="Loading" class="loader-icon">
  </div>
{/if}

<style>
  .loader {
    position: fixed;
    width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center; flex-direction: column;
  }
  .loader .loader-logo {
    width: 16rem;
    margin-bottom: 2rem;
  }
  .loader .loader-icon {
    width: 4.4rem; height: 4.4rem;
  }

  .page {    
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
</style>