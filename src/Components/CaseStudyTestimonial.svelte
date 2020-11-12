<script>
  export let caseStudy
</script>

<div>
  <img src="/img/icons/quotes.svg" alt="" class="icon">
</div>

{#if caseStudy.quote}
<h4>Testimonial</h4>
<div class="testimonial">
  <div class="arrow">{caseStudy.arrowText}</div>
  <blockquote>
    <p><span>“</span> {caseStudy.quote} <span>”</span></p>
  </blockquote>
</div>
{/if}

<style>

.arrow {
  display: none;
}

@media (min-width: 768px) {
.testimonial {
  margin: 0 -13%;
  display: flex; justify-content: space-between; align-self: flex-start;
}
  .arrow {
    position: relative;
    display: block; height: 10rem; width: 35%;
    padding: 1rem  1rem 5rem;
    background: #E74A1E;
    color: white; font-size: 1.6rem;
  }
  .arrow:after {
    position: absolute; right: -3rem; top: 0;
    content: "";
    display: block; width: 0; height: 0; 
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
  
    border-left: 30px solid #E74A1E;
  }
  blockquote {
    width: 55%;
    margin-left: 6rem;
    padding: 0 0 2rem 0;
  }
}


  blockquote {
    display: block;
    padding: 2rem 0;
  }
  @media (min-width: 768px) {
  blockquote {
    
    margin-left: 6rem;
    padding: 0 0 2rem 0;
  }
  }
  blockquote p {
    font-weight: 500; font-style: italic; line-height: 1.4em;
    font-size: 1.6rem;
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