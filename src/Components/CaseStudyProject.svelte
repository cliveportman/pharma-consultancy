<script>
  export let caseStudy
</script>

<div class="icons">
  <img src="/img/icons/globe.svg" alt="" class="icon">
  {#each caseStudy.projectDetailsFlags as flag}
    <img src="{flag.url}" alt="{flag.title}" class="flag">
  {/each}
</div>

{#if caseStudy.projectDetails}
<div class="blue">
  <h4>Project</h4>
  {#each caseStudy.projectDetails as block}
    <h5>{block.heading}</h5>
    {@html block.copy}
  {/each}
</div>
{/if}

<style>
  .icons {
    display: flex; justify-content: flex-start; align-items: center;
  }
  img {
    margin-right: 1rem;
  }
  .flag {
    height: 3rem;
  }
</style>