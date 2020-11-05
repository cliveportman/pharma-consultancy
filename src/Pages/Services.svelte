<script>
  import { onMount } from 'svelte'
  import {slide} from 'svelte/transition'
  import { url, options, servicesData as pageData } from '../stores/global-store'
  import { query } from '../stores/graphql-queries/services-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import AOS from 'aos'

  let visibleService

  fetch(url, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

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
        <div class="service">
          <div class="service-toggle" on:click="{ () => toggleVisibleService(index) }">
            <button style="background: {service.colour}">{visibleService == index ? '−' : '+'}</button>
            <h2 style="color: {service.colour}">{splitTitle(service.title)[0].toUpperCase()} {splitTitle(service.title)[1]}</h2>
          </div>
          {#if visibleService == index}
            <div class="service-detail" transition:slide>
              <div class="objective-holder">
                <div class="objective" style="background: {service.colour}">
                  <div class="objective-text">
                    <h3>Objective:</h3>
                    {@html service.objective}
                  </div>
                </div>
              </div>
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

  .service-toggle {
    display: flex; justify-content: flex-start; align-items: center;
    padding: 0 2rem;
  }
  .service-toggle button {
    display: block; width: 4.4rem; height: 4.4rem;
    margin-right: 1rem; margin-bottom: -0.5rem;
    color: white; font-size: 4rem; line-height: 4.4rem; font-weight: 100;
    border-radius: 50%; border: none;
    mix-blend-mode: multiply;
  }
  .service-toggle h2 {
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
    padding: 2rem 0 0;
    width: 100%;
  }

    .objective-holder {
      position: relative;
      width: 100%; height: 40rem; overflow: hidden;

    }
  .objective {
    position: absolute; left: 50%;
    transform: translateX(-50%);
    display: flex; width: 40rem; height: 40rem;
    border-radius: 50%;
    display: flex; flex-direction: column; justify-content: center;
  }
  .objective-text {
    max-width: calc(100vw - 4rem);
    margin: 0 auto;
    
    
  }
  
.objective h3 {
  margin-bottom: 2rem;
  font-size: 1.2rem;
  color: #fff;

}
:global(.objective p) {
  color: #fff; font-size: 1.8rem;
}


</style>