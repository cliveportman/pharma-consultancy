<script>
    import { sitewideData } from '../stores/global-store'
    import Carousel from '@beyonk/svelte-carousel'
</script>

<h2>What our clients say</h2>

<Carousel
    perPage="1"
    autoplay="5000"
>
    <span class="control" slot="left-control">Prev</span>

    {#each $sitewideData.entries as testimonial}
    <div class="slide-content">
        <blockquote>
            <p>"{testimonial.quote}"</p>
            <cite>{testimonial.source}</cite>
        </blockquote>
    </div>
    {/each}

    <span class="control" slot="right-control">Next</span>

</Carousel>

<style>
    h2 {
        display: block; height: 6.2rem;
        padding: 1.2rem 2rem 0;
        color: white; font-size: 1.6rem; line-height: 5rem;
        background: #BD1622;
    }

    .slide-content {
        padding: 2rem 5rem 3.2rem;
        background: #E0EAED;
        border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;
    }
        p {
            margin-bottom: 2rem;
            color: #BD1622;
            font-size: 1.6rem; font-style: italic; line-height: 1.4em;
        }
        cite {
            font-size: 1.6rem; color: #1D1D1D; line-height: 1.4em;
        }

</style>

