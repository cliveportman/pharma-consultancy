<script>
  import { url, options, homepageData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/homepage-query'

  fetch(url, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    pageData.update(() => {
      return json.data
    });

   })
  .catch(console.error);

  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  let width
  let height
  let videoUrl
  $: getVideoUrl(width, height);
  function getVideoUrl(width, height) {
    if (width > height) {
      videoUrl = 'https://s3.eu-west-1.amazonaws.com/cogentia/images/cogentia-landscape.mp4?mtime=20201103110405&focal=none'
    } else {
      videoUrl = 'https://s3.eu-west-1.amazonaws.com/cogentia/images/cogentia-portrait.mp4?mtime=20201103110409&focal=none'
    }
  }

</script>
<svelte:window bind:innerWidth="{width}" bind:innerHeight="{height}"/>


{#if $pageData}

  <!--
  <video
    autoplay
    src="{videoUrl}"
  >
  <track kind="captions">
  </video>
  -->
  <TestimonialsCarousel/>
  
{:else}
  <img src="/img/loading.svg" alt="Loading...">

{/if}