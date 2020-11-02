<script>
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  export let params = {}

  
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
  
  import SiteHeader from './Components/SiteHeader.svelte';
  import SiteFooter from './Components/SiteFooter.svelte';

</script>

{#if $sitewideData}
  <SiteHeader
    links="{$sitewideData.globalSet.navigationLinks}"
  />
  <Route {currentRoute}  {params} />
  <SiteFooter
    links="{$sitewideData.globalSet.footerLinks}"
    email="{$sitewideData.entry.email}"
    tel="{$sitewideData.entry.tel}"
    address="{$sitewideData.entry.address}"
  />
{:else}
  <p>Display a loading page here...</p>
{/if}