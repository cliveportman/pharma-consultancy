<script>
  import { onMount } from 'svelte'
  import { url, options, aboutData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/about-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte';
  import AOS from 'aos'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  fetch(url, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    pageData.update(() => {
      // consider appending data-aos="fade-up" to all paragraph tags in the json
      return json.data
    });

   })
  .catch(console.error);

  const layers = [0, 1, 2, 3];

  let y;

  // onMount(() => {
  //   AOS.init();
  // });

</script>

<svelte:window bind:scrollY={y}/>

{#if $pageData}

  <h1>About</h1>

  <div class="parallax-container">
    {#each layers as layer}
      <img
        style="transform: translate( 0, {(-y/7.5) * layer / (layers.length - 1)}px)"
        src="/img/cambridge/cambridge{layer}.png"
        alt="parallax layer {layer}"
      >
    {/each}
  </div>

  <div class="container">
    <div class="copy" data-aos="fade-up">
      {@html $pageData.entry.copy}
    </div>    
  </div>

  <div class="container">
    <TestimonialsCarousel/>
  </div>

{:else}
  <LoadingIcon/>  
{/if}

<style>
	.parallax-container {
		position: relative;
		width: 120%;
    height: 45vw;
    margin-top: 2rem;
		left: 50%;
		transform: translate(-50%,0);
	}

	.parallax-container img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		will-change: transform;
	}

	.parallax-container img:last-child::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgb(45,10,13);
  }

  .copy {
    margin-bottom: 4rem;
  }

@media (min-width: 768px) {
	.parallax-container {
		position: relative;
		width: 1024px;
    height: 308px;
    margin-top: 10rem;
		left: 50%;
		transform: translate(-50%,0);
	}

  .copy {
    width: 66.6666%; margin: 0 auto 6rem;
  }
}

@media (min-width: 1024px) {
	.parallax-container {
		width: 964px;
	}
}

@media (min-width: 1367px) {
	.parallax-container {
		width: 1140px;
    margin-bottom: 4rem;
	}
}
  
  </style>
