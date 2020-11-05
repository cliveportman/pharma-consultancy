<script>
  import { onMount } from 'svelte'
  import { Navigate } from 'svelte-router-spa'
  import {slide} from 'svelte/transition'
  import { url, options, servicesData as pageData, servicesData } from '../stores/global-store'
  import { query } from '../stores/graphql-queries/services-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import AOS from 'aos'

  import ServiceObjective from '../Components/ServiceObjective.svelte'
  import ServiceProjectTypes from '../Components/ServiceProjectTypes.svelte'
  import ServiceCaseStudy from '../Components/ServiceCaseStudy.svelte'

  export let currentRoute
  export let params = {}

  let visibleService

  fetch(url, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    console.log(json.data)

    pageData.update(() => {
      return json.data
    });

   })
  .catch(console.error);

  // onMount(() => {
  //   AOS.init();
  // });

  AOS.refresh();

  function splitTitle(title) {
    return title.split(' ')
  }

  function toggleVisibleService(index) {
    if (visibleService != index) visibleService = index
    else visibleService = null
  }



</script>


{#if $pageData}

  <h1>Services</h1>
    
  <div class="container">
    <div class="intro">
      <h2>Evidence & Access<br>Integrated</h2>
      {@html $pageData.entry.paragraph2}
      {@html $pageData.entry.paragraph1}
    </div>
  </div>

    <div class="services">
      {#each $pageData.entries as service, index}

        <div class="service" style="--colour1: {service.colour1}; --colour2: {service.colour2};">
          
          <Navigate to="{currentRoute.path == '/' + service.uri ? '/services' : '/' + service.uri}" styles="service-toggle">
            <button>{currentRoute.path == '/' + service.uri ? '−' : '+'}</button>
            <h2>{splitTitle(service.title)[0].toUpperCase()} {splitTitle(service.title)[1]}</h2>          
          </Navigate>

          {#if currentRoute.path == '/' + service.uri}
            <div class="service-detail" transition:slide>
              <ServiceObjective service="{service}"/>
              <ServiceProjectTypes service="{service}"/>
              <ServiceCaseStudy service="{service}"/>
            </div>
          {/if}

        </div>

      {/each}

    </div>

{:else}
  <LoadingIcon/> 
{/if}

<style>
  .intro h2 {
    color: #1d1d1d; text-transform: uppercase;
  }

  :global(.service-toggle) {
    display: flex; justify-content: flex-start; align-items: center;
    padding: 0 2rem;
    text-decoration: none;
  }
  :global(.service-toggle button) {
    display: block; width: 4.4rem; height: 4.4rem;
    margin-right: 1rem; margin-bottom: -0.5rem;
    color: white; font-size: 4rem; line-height: 4.4rem; font-weight: 100;
    border-radius: 50%; border: none;
    mix-blend-mode: multiply;
    outline: none;
    background: var(--colour1);
  }
  :global(.service-toggle h2) {
    margin: 0; padding: 0.5rem 0 0;
    line-height: 1em; font-size: 1.6rem; font-weight: 500;
  }

  .services {
    margin-bottom: 4rem;
  }
  @media (min-width: 1024px) {
    .services {
      margin-bottom: 6rem;
    }
  }

  .service-detail {
    padding-bottom: 4rem;
  }






h2 {
  color: var(--colour1);
}


</style>