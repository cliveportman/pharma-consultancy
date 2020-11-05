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
    <ul>
      {#each block.bullets as bullet}
        <li class="clearfix"><span class="triangle"></span><span class="text">{bullet.item}</span></li>
      {/each}
    </ul>
  {/each}
</div>
{/if}