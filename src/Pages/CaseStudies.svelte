<script>
  import { url, options, caseStudiesData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/casestudies-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  export let currentRoute  
  let token = currentRoute.queryParams.token

  fetch(url + '?token='+token, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    console.log(json.data)

    pageData.update(() => {
      return json.data
    });

   })
  .catch(console.error);

</script>


{#if $pageData}
  <h1>Case Studies</h1>

  <div class="container">

    <div class="casestudies">
      {#each $pageData.entries as caseStudy}
        <div class="casestudy">
          <header>
            <h6>Case study</h6>
            <h3>{caseStudy.title}</h3>
          </header>
          <div class="summary">
            {@html caseStudy.summary}
            <a href="{caseStudy.pdf[0].url}" class="download">Download PDF</a>
          </div>
        </div>
      {/each}
    </div>
    <TestimonialsCarousel/>
  </div>
{:else}
  <LoadingIcon/> 
{/if}

<style>


@media (min-width: 768px) {
  
.casestudies {
  width: 83.3333%; margin: 0 auto 6rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}
}
  .casestudy{
    margin-bottom: 2rem;
  }
  header {
    padding: 1.5rem 2rem;
    background: #383E64;
  }
    h6 {
      display: block;
      margin: 0 0 0.5rem;
      font-size: 1.2rem; line-height: 1.2em;;
      text-transform: uppercase; color: #B0B8D6;
    }
    h3 {
      margin: 0;
      font-size: 1.6rem;
      color: #fff;
    }
    .casestudy .summary{
      padding: 2rem 2rem;
      background: linear-gradient(#F3F2ED, #ffffff);      
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
