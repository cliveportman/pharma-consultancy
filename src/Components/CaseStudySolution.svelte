<script>
  export let caseStudy
</script>

{#if caseStudy.solutionDetails}
<div>
  <img src="/img/icons/stats.svg" alt="" class="icon">
</div>

<div class="blue">
  <h4>Solution</h4>
  {#each caseStudy.solutionDetails as block}
    <h5>{block.heading}</h5>
    {@html block.copy}
  {/each}
</div>
{/if}