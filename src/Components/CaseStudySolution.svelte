<script>
  export let caseStudy
</script>

<div>
  <img src="/img/icons/stats.svg" alt="" class="icon">
</div>

{#if caseStudy.solutionDetails}
  <h4>Solution</h4>
  {#each caseStudy.solutionDetails as block}
    <h5>{block.heading}</h5>
    <ul>
      {#each block.bullets as bullet}
        <li class="clearfix"><span class="triangle"></span><span class="text">{bullet.item}</span></li>
      {/each}
    </ul>
  {/each}
{/if}