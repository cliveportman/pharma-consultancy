<script>
  import { url, options, careersData as pageData } from '../stores/global-store'
  import { query } from '../stores/graphql-queries/careers-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  export let currentRoute  
  let token = currentRoute.queryParams.token
  let queryUrl
  if (token) queryUrl = url + '?token=' + token
  else queryUrl = url

  fetch(queryUrl, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    pageData.update(() => {
      return json.data
    });

   })
  .catch(console.error);

import { onMount } from 'svelte'
import AOS from 'aos'
onMount(() => {
  AOS.init();
});  

  gtag('config', 'UA-26565851-1', {
    'page_title' : 'careers',
    'page_path': currentRoute.path
  });

</script>

<svelte:head>
  <title>Careers / Cogentia</title>
</svelte:head>


{#if $pageData}

  <div class="container">
      
    <div class="header">
      <h1>Careers</h1>
    </div>

    <div class="vacancies">
      <div class="introduction" data-aos="fade-up">
        {@html $pageData.entry.introduction}
      </div>
      {#each $pageData.entry.vacancies as vacancy}
        <div class="vacancy" data-aos="fade-up">
          <h2>{vacancy.jobTitle}</h2>
          <div class="copy">
            <div class="summary">
              <p>Location: {vacancy.location}</p>
                {#if vacancy.shortSummary}{@html vacancy.shortSummary}{/if}
            </div>
            <a href="{vacancy.pdf[0].url}" class="download">Download full details (PDF)</a>
          </div>
        </div>
      {/each}
      <div  data-aos="fade-up">
      {@html $pageData.entry.additionalCopy}
    </div>
    </div>
    <TestimonialsCarousel/>
  </div>
{:else}
  <LoadingIcon/> 
{/if}

<style>


@media (min-width: 768px) {


.vacancies {
  margin: 0 auto 6rem;
}
.header {
  padding-top: 4rem;
}

}
@media (min-width: 1024px) {


.vacancies {
  padding-left: 16.6666%; padding-right: 16.6666%; margin: 0 auto 6rem;
}

}

.introduction {
  margin-bottom: 4rem;;
}
  .vacancy{
    margin-bottom: 4rem;
  }
    h2 {
      margin-bottom: 1rem;
    }
    :global(.vacancy p) {   
      margin-bottom: 1rem;
    }

    .download {
      display: block;
      margin-top: -1rem;
      color: #BD1622; font-size: 1.4rem; text-transform: uppercase; text-decoration: none;
      text-align: right; font-weight: 700;

    }
    .download:focus, .download:hover, .download:active {
      text-decoration: underline;
    }
    .download:after {
      content: "";
      display: inline-block; width: 3rem; height: 3rem;
      margin-left: 2rem;
      border-top: 1px solid #5C6A99; border-right: 1px solid #5C6A99;
      transform: rotate(135deg);

    }
</style>
