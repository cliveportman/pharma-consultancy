<script>
    import { sitewideData } from '../stores/global-store'
</script>

<h1>Testimonials</h1>
{#each $sitewideData.entries as testimonial}
<blockquote>
    <p>{testimonial.quote}</p>
    <cite>{testimonial.source}</cite>
</blockquote>
{/each}