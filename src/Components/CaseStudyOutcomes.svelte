<script>
  export let caseStudy
</script>

{#if caseStudy.outcomeDetails}
<div>
  <img src="/img/icons/target.svg" alt="" class="icon">
</div>


<div class="red">
  <h4>Outcomes</h4>
  {#each caseStudy.outcomeDetails as block}
    <h5>{block.heading}</h5>
    {@html block.copy}
  {/each}
</div>
{/if}