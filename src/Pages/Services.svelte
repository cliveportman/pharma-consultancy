<script>
  import { onMount } from 'svelte'
  import { Navigate } from 'svelte-router-spa'
  import {slide, fade} from 'svelte/transition'
  import { url, options, servicesData as pageData, servicesData } from '../stores/global-store'
  import { query } from '../stores/graphql-queries/services-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import AOS from 'aos'

  import ServiceObjective from '../Components/ServiceObjective.svelte'
  import ServiceProjectTypes from '../Components/ServiceProjectTypes.svelte'
  import ServiceCaseStudy from '../Components/ServiceCaseStudy.svelte'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  let visibleService
  export let currentRoute  
  let token = currentRoute.queryParams.token
  let queryUrl
  if (token) queryUrl = url + '?token=' + token
  else queryUrl = url

  fetch(queryUrl, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    console.log(json.data)

    pageData.update(() => {
      return json.data
    });

   })
  .catch(console.error);

  onMount(() => {
    AOS.init();
  });

  AOS.refresh();

  function splitTitle(title) {
    return title.split(' ')
  }

  function toggleVisibleService(index) {
    if (visibleService != index) visibleService = index
    else visibleService = null
  }


  gtag('config', 'UA-26565851-1', {
    'page_title' : 'services',
    'page_path': currentRoute.path
  });


</script>



<svelte:head>
  <title>Services / Cogentia</title>
</svelte:head>


{#if $pageData}

  <h1>Services</h1>
    
  <div class="container">
    <div class="intro">
      <h2>Evidence & Access<br> — Integrated</h2>
      {@html $pageData.entry.paragraph2}
      {@html $pageData.entry.paragraph1}
    </div>
  
    <div class="services-paragraphs">
      <div class="services-paragraph1" data-aos="fade-in" data-aos-delay="1050">{@html $pageData.entry.paragraph1}</div>
      <div class="services-paragraph2" data-aos="fade-in" data-aos-delay="1200">{@html $pageData.entry.paragraph2}</div>
    </div>

  </div>

    <div class="services">
      {#each $pageData.entries as service, index}

        <div class="service" style="--colour1: {service.colour1}; --colour2: {service.colour2};" >
          
          <Navigate to="{currentRoute.path == '/' + service.uri ? '/services' : '/' + service.uri}" styles="service-toggle {currentRoute.path != '/services' && currentRoute.path != '/' + service.uri ? 'outline' : ''}">
            <button data-aos="fade-left" data-aos-delay="{index * 150}">{currentRoute.path == '/' + service.uri ? '−' : '+'}</button>
            <h2 data-aos="fade-left" data-aos-delay="{index * 150}">{splitTitle(service.title)[0].toUpperCase()} {splitTitle(service.title)[1]}</h2>          
          </Navigate>

          {#if currentRoute.path == '/' + service.uri}
            <div class="service-detail" transition:slide="{{ duration: 300 }}">
              <ServiceObjective service="{service}"/>
              <ServiceProjectTypes service="{service}"/>
              <ServiceCaseStudy service="{service}"/>
            </div>
          {/if}

        </div>

      {/each}

    </div>

    <div class="container">
      <TestimonialsCarousel/>
    </div>

{:else}
  <LoadingIcon/> 
{/if}

<style>
  .intro h2 {
    margin-bottom: 4rem;
    text-transform: uppercase;
  }
  @media (min-width: 768px) {
    .intro h2 br {
      display: none;
    }
    :global(.intro p) {
      display: none;
    }
  }
  @media (min-width: 1024px) {
    .intro {
      padding-left: 8.3333%; padding-right: 8.3333%;
    }
    .intro h2 br {
      display: none;
    }
  }

  .services-paragraphs {
    display: none;
  }

  :global(.service-toggle) {
    display: flex; justify-content: flex-start; align-items: center;
    padding: 0 2rem;
    text-decoration: none;
  }
  :global(.service-toggle button) {
    display: block; width: 4.4rem; height: 4.4rem;
    margin-right: 1rem; margin-bottom: -0.5rem; padding: 0;
    color: white; font-size: 4rem; line-height: 4.4rem; font-weight: 100;
    border-radius: 2.2rem; border: none;
    mix-blend-mode: multiply;
    outline: none;
    background: var(--colour1);
  }
  :global(.service-toggle h2) {
    width: calc(100% - 5.2rem);
    margin: 0; padding: 0.5rem 0 0;
    line-height: 1em; font-size: 1.6rem; font-weight: 500;
    color: var(--colour1);
  }

  @media (min-width: 768px) {

    .services-paragraphs {
      display: block; 
    }
    :global(.services-paragraphs p) {
        font-size: 1.4rem;

    }
      .services-paragraph1 {
        width: calc(28rem - 8.3333%);
        position: absolute; right: calc(8.3333%); top: 9rem;
      }
      .services-paragraph2 {
        width: 24rem;
        position: absolute;
        left: 6rem;
        top: 25rem;
      }

    :global(.service-toggle) {
      position: relative;
      width: 15.4rem; height: 15.4rem;
      padding: 0;
      
    }
    :global(.service-toggle button) {
      width: 15.4rem; height: 15.4rem;
      margin: 0; padding: 7rem 0 0;
      border: 1px solid var(--colour1); border-radius: 50%;
      transition: all 0.3s;
    }
    :global(.service-toggle.outline button) {
      background: none;
      color: var(--colour1);
    }
    :global(.service-toggle h2) {
      position: absolute; top: 6rem;
      width: 100%;
      padding: 0 2rem;
      text-align: center; font-weight: 300;
      color: var(--colour2);
    }
    :global(.service-toggle.outline h2) {
      color: var(--colour1);
    }
    :global(.service:nth-child(1) .service-toggle) {
      position: absolute; left: 2rem; top: 0;
    }
    :global(.service:nth-child(2) .service-toggle) {
      position: absolute; left: 16.1rem; top: 0;
    }
    :global(.service:nth-child(3) .service-toggle) {
      position: absolute; left: 30.2rem; top: 0;
    }
    :global(.service:nth-child(4) .service-toggle) {
      position: absolute; left: 30.2rem; top: 14.1rem;
    }
    :global(.service:nth-child(5) .service-toggle) {
      position: absolute; left: 44.3rem; top: 14.1rem;
    }
    :global(.service:nth-child(6) .service-toggle) {
      position: absolute; left: 58.4rem; top: 14.1rem;
    }
  }

@media (min-width: 1024px) {
  :global(.services-paragraphs p) {
      font-size: 1.6rem;

  }
    .services-paragraph1 {
      width: calc(38rem - 8.3333%);
      right: calc(8.3333%); top: 10rem;
    }
    .services-paragraph2 {
      width: 22rem;
      left: calc(16.6666%);
      top: 26.5rem;
    }

  :global(.service-toggle) {
    position: relative;
    width: 17.3rem; height: 17.3rem;
    padding: 0;
    
  }
  :global(.service-toggle button) {
    width: 17.3rem; height: 17.3rem;
    padding: 7rem 0 0;
  }
  :global(.service-toggle h2) {
    top: 7rem;
    font-size: 1.8rem;
  }
  :global(.service:nth-child(1) .service-toggle) {
    left: 2rem;
  }
  :global(.service:nth-child(2) .service-toggle) {
    left: 17.5rem;
  }
  :global(.service:nth-child(3) .service-toggle) {
    left: 33rem;
  }
  :global(.service:nth-child(4) .service-toggle) {
    left: 33rem; top: 16rem;
  }
  :global(.service:nth-child(5) .service-toggle) {
    left: 48.5rem; top: 16rem;
  }
  :global(.service:nth-child(6) .service-toggle) {
    left: 64rem; top: 16rem;
  }
}

@media (min-width: 1367px) {
  :global(.services-paragraphs p) {
      font-size: 1.6rem;

  }
    .services-paragraph1 {
      width: calc(46rem - 8.3333%);
      right: calc(8.3333%); top: 12rem;
    }
    .services-paragraph2 {
      width: calc(38rem - 8.3333%);
      left: 205px;
      top: 31.5rem; text-align: left;
    }

  :global(.service-toggle) {
    position: relative;
    width: 20.75rem; height: 20.75rem;
    padding: 0;
    
  }
  :global(.service-toggle button) {
    width: 20.75rem; height: 20.75rem;
    padding: 7rem 0 0;
  }
  :global(.service-toggle h2) {
    top: 7rem;
    font-size: 1.8rem; padding: 0 4rem;
  }
  :global(.service:nth-child(1) .service-toggle) {
    left: 2rem;
  }
  :global(.service:nth-child(2) .service-toggle) {
    left: 20.75rem;
  }
  :global(.service:nth-child(3) .service-toggle) {
    left: 39.5rem;
  }
  :global(.service:nth-child(4) .service-toggle) {
    left: 39.5rem; top: 18.75rem;
  }
  :global(.service:nth-child(5) .service-toggle) {
    left: 58.25rem; top: 18.75rem;
  }
  :global(.service:nth-child(6) .service-toggle) {
    left: 77rem; top: 18.75rem;
  }
}

  .services {
    margin-bottom: 4rem;
  }
  @media (min-width: 768px) {
    .services {
      position: relative;
      width: 760px;
      margin: 0 auto 6rem; padding: 26.5rem 2rem 0;
    }
  }
  @media (min-width: 1024px) {
    .services {
      width: 83.3333rem;
      padding: 30rem 2rem 0; margin-bottom: 8rem;
    }
  }
  @media (min-width: 1367px) {
    .services {
      width: 100rem;
      padding: 35.5rem 2rem 0;
    }
  }

  .service-detail {
    display: block; width: 100vw;
    padding-bottom: 4rem;
    overflow: hidden;
  }
  @media (min-width: 768px) {

    .service-detail {
    width: 100%;;
  }
  }








</style>