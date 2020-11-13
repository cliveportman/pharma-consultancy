<script>
  import { onMount } from 'svelte'
  import { url, options, homepageData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/homepage-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import AOS from 'aos'
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

  
  let width
  let height
  let videoUrl
  let videoElement
  let speed = 0.75
  let paused = true
  let startTime = 1.5
  let endTime = 4

  onMount(() => {
    AOS.init();
  });


  $: getVideoUrl(width, height);
  function getVideoUrl(width, height) {
    if (width > height) {
      videoUrl = 'https://s3.eu-west-1.amazonaws.com/cogentia/images/cogentia-landscape.mp4?mtime=20201103110405&focal=none'
    } else {
      videoUrl = 'https://s3.eu-west-1.amazonaws.com/cogentia/images/cogentia-portrait.mp4?mtime=20201103110409&focal=none'
    }
  }

  //$: if (videoElement) setTimeout(() => { videoElement.play() }, 1)

  $: if (videoElement) playVideo()
  function playVideo() {

    function checkTime() {
        if (videoElement.currentTime >= endTime) {
          videoElement.pause();
        } else {
          /* call checkTime every 1/10th 
              second until endTime */
          setTimeout(checkTime, 100);
        }
    }

    videoElement.currentTime = startTime;
    videoElement.play();
    checkTime();
  }


  gtag('config', 'UA-26565851-1', {
    'page_title' : 'homepage',
    'page_path': currentRoute.path
  });

  

</script>
<svelte:window bind:innerWidth="{width}" bind:innerHeight="{height}"/>

<svelte:head>
  <title>Cogentia</title>
</svelte:head>

{#if $pageData}
  <section class="splash">
    <h1>
      <div>      
          <span class="line1">
            <span data-aos="fade-right" data-aos-delay="1500">E</span><span data-aos="fade-right" data-aos-delay="1550">v</span><span data-aos="fade-right" data-aos-delay="1600">i</span><span data-aos="fade-right" data-aos-delay="1650">d</span><span data-aos="fade-right" data-aos-delay="1700">e</span><span data-aos="fade-right" data-aos-delay="1750">n</span><span data-aos="fade-right" data-aos-delay="1800">c</span><span data-aos="fade-right" data-aos-delay="1850">e</span><span data-aos="fade-right" data-aos-delay="1900"> & </span><span data-aos="fade-right" data-aos-delay="1950">A</span><span data-aos="fade-right" data-aos-delay="2000">c</span><span data-aos="fade-right" data-aos-delay="2050">c</span><span data-aos="fade-right" data-aos-delay="2100">e</span><span data-aos="fade-right" data-aos-delay="2150">s</span><span data-aos="fade-right" data-aos-delay="2200">s</span>
          </span>
          <span class="line2" data-aos="fade-right" data-aos-delay="3000">Integrated</span>
      </div>
    </h1>
    <video src="{videoUrl}" bind:playbackRate="{speed}" bind:paused="{paused}" bind:this={videoElement} allow="autoplay" muted>
      <track kind="captions">
    </video>
  </section>

  <div class="container">
    <section class="textblocks">
      {#each $pageData.entry.threeTextBlocks as block, index}
        <div class="textblock" data-aos="fade-up" data-aos-delay="{index * 300}" data-aos-offset="0">
          <h2>{block.heading}</h2>
          {@html block.text}
        </div>
      {/each}  
    </section>
    <TestimonialsCarousel/>
  </div>
  
  
{:else}
  <LoadingIcon/>  
{/if}

<style>

  .splash {
    position: relative;
    width: 100%; height: 70vh; overflow: hidden;
    margin-bottom: 4rem;
  }
  @media (min-width: 768px) {
    .splash {
      height: 80vh;
    }
  }
  @media (min-width: 1024px) {
    .splash {
      height: 70vh;
    }
  }

  h1 {
    position: absolute; left: 0; top: 0; right: 0; bottom: 0; z-index: 2;
    color: white;  text-transform: uppercase; font-size: 8vw; line-height: 1.05em;
    display: flex; justify-content: center; flex-direction: column; align-items: center;
    border: none;
  }
  @media (min-width: 1024px) {
    h1 {
      font-size: 7.6rem;
    }
  }
  
    span {
      
    }
    .line1 {
      font-weight: 600;
      display: block;
    }
    .line2 {
      font-weight: 100;
      display: block;
    }

  video {
    position: absolute; bottom: 0; top: 0; left: 0; right: 0;
    display: block; width: 100%;
    object-fit: cover; object-position: center;
  }
  @media (min-width: 1024px) {
    video {
      height: 100%;
    }
  }


  @keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}




  .textblocks {
    margin: 2rem 0 0;
  }
    .textblock {
      margin-bottom: 4rem;
    }
    @media (min-width: 768px) {
      .textblocks {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 2rem;
        margin: 6rem 0;
      padding: 0 8.3333%
      }
      .textblock {
        margin-bottom: 0;
      }
    }

</style>