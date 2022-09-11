<script>
  export let caseStudy
</script>

{#if caseStudy.quote}
<div>
  <img src="/img/icons/quotes.svg" alt="" class="icon">
</div>

<h4>Testimonial</h4>
<div class="testimonial">
  <div class="arrow"><p>{@html caseStudy.arrowText.replace(/\n/g, "<br />")}</p></div>
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
  margin: 0 -5%;
  display: flex; justify-content: space-between; align-self: flex-start;
}
  .arrow {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 8rem; width: 25%;
    padding: 0  1rem 0;
    background: #E74A1E;
    
  }
  .arrow p {
    display: block;
    margin-bottom: 0; padding-left: 2rem;
    line-height: 1em; color: white; font-size: 1.6rem;
  }
  .arrow:after {
    position: absolute; right: -2rem; top: 0;
    content: "";
    display: block; width: 0; height: 0; 
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
  
    border-left: 20px solid #E74A1E;
  }
  blockquote {
    width: 70%;
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
    
    margin-left: 4rem;
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