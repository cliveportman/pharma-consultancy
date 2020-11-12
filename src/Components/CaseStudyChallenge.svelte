<script>
  export let caseStudy
</script>

<div>
  <img src="/img/icons/signposts.svg" alt="" class="icon">
</div>

{#if caseStudy.challengeDetails}
<div class="blue">
  <h4>Challenge</h4>
  {#each caseStudy.challengeDetails as block}
    <h5>{block.heading}</h5>
    {@html block.copy}
  {/each}
</div>
{/if}