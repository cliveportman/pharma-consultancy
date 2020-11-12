<script>
  export let caseStudy
</script>

{#if caseStudy.challengeDetails}
<div>
  <img src="/img/icons/signposts.svg" alt="" class="icon">
</div>


<div class="blue">
  <h4>Challenge</h4>
  {#each caseStudy.challengeDetails as block}
    <h5>{block.heading}</h5>
    {@html block.copy}
  {/each}
</div>
{/if}