<script>
  export let caseStudy
</script>

<div>
  <img src="/img/icons/quotes.svg" alt="" class="icon">
</div>

{#if caseStudy.solutionDetails}
  <h4>Testimonial</h4>
  <div class="arrow">{caseStudy.arrowText}</div>
  <blockquote>
    <p><span>“</span> {caseStudy.quote} <span>”</span></p>
    <cite>{caseStudy.source}</cite>
  </blockquote>
{/if}

<style>
  blockquote {
    display: block;
    padding: 2rem 0;
  }
  blockquote p {
    font-weight: 500; font-style: italic; line-height: 1.4em;
    margin-bottom: 2rem;
  }
  blockquote span {
    position: relative; top: 1.7rem;
    color: #E74A1E; font-size: 4rem; font-family: Georgia; line-height: 0;
  }
  cite {
    display: block;
    font-size: 1.6rem; color: #595958; font-style: normal;
  }
</style>