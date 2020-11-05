<script>
    import { sitewideData } from '../stores/global-store'
    import Carousel from '@beyonk/svelte-carousel'
</script>

<h2>What our clients say <img src="/img/cogentia-logo-white.svg" alt="Cogentia"></h2>

<section>
<Carousel
    perPage="1"
    autoplay="5000"
>
    <span class="control prev" slot="left-control">Prev</span>

    {#each $sitewideData.entries as testimonial}
    <div class="slide-content">
        <blockquote>
            <p>"{testimonial.quote}"</p>
            <cite>{testimonial.source}</cite>
        </blockquote>
    </div>
    {/each}

    <span class="control next" slot="right-control">Next</span>

</Carousel>
</section>
<style>
  section {
    width: 100%; overflow: hidden;
    margin-bottom: 2rem;
  }
  @media (min-width: 1024px) {
    section {
      margin-bottom: 6rem;
    }
  }
    h2 {
      position: relative;
      display: block; height: 6.2rem;
      padding: 1.2rem 2rem 0;
      color: white; font-size: 1.6rem; line-height: 5rem; text-transform: uppercase;
      background: #BD1622;
    }
      h2 img {
        display: none;
      }
    @media (min-width: 768px) {
      h2 img {
        display: block; width: 10.5rem;
        position: absolute; right: 2rem; bottom: 1.25rem;

      }
    }

    .slide-content {
        padding: 2rem 6rem 3.2rem;
        background: #E0EAED;
        border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;
    }
    @media (min-width: 768px) {
    .slide-content {
        padding: 2rem 15rem 3.2rem;
    }
    }
        p {
            margin-bottom: 2rem;
            color: #BD1622;
            font-size: 1.6rem; font-style: italic; line-height: 1.4em;
        }
        cite {
            font-size: 1.6rem; color: #1D1D1D; line-height: 1.4em;
        }
    
    .control {
      position: relative;
      display: block; width: 4rem; height: 4rem;
      border-top: 1px solid white; border-left: 1px solid white;
      text-indent: -9999px;
    }
    .control.prev {
      left: 0.5rem;
      transform: rotate(-45deg);
    }
    .control.next {
      right: 1.6rem;
      transform: rotate(135deg);
    }

</style>

