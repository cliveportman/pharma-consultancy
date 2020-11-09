
<script>

  import CaseStudyChallenge from './CaseStudyChallenge.svelte'
  import CaseStudyProject from './CaseStudyProject.svelte'
  import CaseStudySolution from './CaseStudySolution.svelte'
  import CaseStudyOutcomes from './CaseStudyOutcomes.svelte'
  import CaseStudyTestimonial from './CaseStudyTestimonial.svelte'

  export let service
  const caseStudy = service.detailedCaseStudy[0]
  let visible = false

  function splitTitle(title) {
    return title.split(' ')
  }
</script>

<div class="casestudy">

  <header class="">
    <h6>Case study</h6>
    <h3>{caseStudy.title}</h3>
  </header>

  <div class="summary">
    {@html caseStudy.summary}
  </div>
  
  <div class="casestudy-toggle" on:click="{ () => { visible = !visible} }">    
    <div class="icons">
      <img src="/img/icons/signposts.svg" alt="">
      <img src="/img/icons/globe.svg" alt="">
      <img src="/img/icons/stats.svg" alt="">
      <img src="/img/icons/target.svg" alt="">
      <img src="/img/icons/quotes.svg" alt="">
    </div>
    <h4>Read full case study</h4>
    <button>{visible ? '−' : '+'}</button>
  </div>

  {#if visible}
  <div class="casestudy-detail">
    <CaseStudyChallenge caseStudy="{caseStudy}"/>
    <CaseStudyProject caseStudy="{caseStudy}"/>
    <CaseStudySolution caseStudy="{caseStudy}"/>
    <CaseStudyOutcomes caseStudy="{caseStudy}"/>
    <CaseStudyTestimonial caseStudy="{caseStudy}"/>
  </div>
  {/if}

  <a href="/case-studies/{service.slug}" class="morecasestudies">
    Further <span>{splitTitle(service.title)[0].toUpperCase()} {splitTitle(service.title)[1]}</span>
    <br>Case studies
  </a>
</div>

<style>

  .casestudy {
    padding: 0 2rem;
  }
  header {
    padding: 1.5rem 2rem;
    background: #383E64;
  }
    h6 {
      display: block;
      margin: 0 0 0.5rem;
      font-size: 1.2rem; line-height: 1em;;
      text-transform: uppercase; color: #B0B8D6;
    }
    h3 {
      margin: 0;
      font-size: 1.6rem;
      color: #fff;
    }

  .summary {
    padding: 2rem 0 0;
    border-bottom: 1px solid #5C6A99;
  }
  @media (min-width: 768px) {
    .summary {
      padding-left: 8.3333%; padding-right: 8.3333%;
    }
  }
  @media (min-width: 1024px) {
    .summary {
      padding-left: 8.3333%; padding-right: 50%;
    }
  }

  .casestudy-toggle {
    display: flex; justify-content: space-between; flex-wrap: wrap; align-items: center;
    padding: 1rem 0;
  }
    .icons {
      width: 100%;
      text-align: center;
      margin: 0 0 2rem;
    }
      .icons img {
        height: 4.4rem;
      }
    @media (min-width: 768px) {
      .icons {
        width: auto;
        margin: 2rem 0 2rem;
      }
    }
    .casestudy-toggle h4 {
      margin: 0;
      color: #383E64; font-size: 1.6rem; font-weight: 500; text-transform: uppercase;
    }
    .casestudy-toggle button {
      display: block; width: 4.4rem; height: 4.4rem;
      background: #fff;
      border: 1px solid #383E64; color: #383E64; border-radius: 50%;
      font-size: 4rem; line-height: 4.4rem; font-weight: 100;
      outline: none;
    }

  .morecasestudies {
    position: relative;
    display: block;
    padding: 2rem 0;
    border-top: 1px solid #5C6A99; border-bottom: 1px solid #5C6A99;
    color: #383E64; text-transform: uppercase; font-weight: 500; font-size: 1.2rem; text-decoration: none;
    text-align: center; line-height: 1.4em;
  }
    .morecasestudies span {
      font-weight: 700; text-transform: none;
    }
    .morecasestudies:after {
      content: "";
      display: block; width: 3rem; height: 3rem;
      position: absolute; right: 0; top: 2rem;
      border-top: 1px solid #5C6A99; border-right: 1px solid #5C6A99;
      transform: rotate(45deg);

    }

  @media (min-width: 768px) {
    .morecasestudies {
      padding: 2.3rem 8.3333%;
      text-align: right;
      font-size: 1.6rem;
    }
    .morecasestudies br {
      display: none;
    }

  }

    .casestudy-detail {
      padding-bottom: 2rem;
    }




:global(.casestudy-detail .icon) {
  display: block; height: 6rem;
} 
:global(.casestudy-detail h4) {
  font-size: 2rem;
  margin: 1rem 0 2rem; font-weight: 500;;
} 
:global(.casestudy-detail h5) {
  display: inline-block;
  padding: 1rem 2rem 1rem 1rem; margin: 0 0 1.5rem;;
  color: #fff; font-size: 1.6rem; line-height: 1em;
} 
:global(.casestudy-detail .blue h5) {
  background: #5C6A99;
}
:global(.casestudy-detail .red h5) {
  background: #E74A1E;
} 
:global(.casestudy-detail ul) {
  margin-bottom: 2rem;
} 
:global(.casestudy-detail li) {
  margin-bottom: 1rem;
  list-style-type: none;
  font-size: 1.6rem; line-height: 1.1em;
}   

:global(.casestudy-detail span.triangle) {
  content: "";
  float: left;
  display: block; width: 0; height: 0;
  margin: 0.2rem 0.5rem 0 0;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent;  
  
}
:global(.casestudy-detail .blue span.triangle) {
  border-left: 10px solid #5C6A99;
}
:global(.casestudy-detail .red span.triangle) {
  border-left: 10px solid #E74A1E;
}
:global(.casestudy-detail span.text) {
  float: left;
  max-width: calc(100% - 3rem);
}

@media (min-width: 768px) {
  :global(.casestudy-detail .icon) {
    padding-top: 2rem; height: 8rem;
  } 
}
</style>


