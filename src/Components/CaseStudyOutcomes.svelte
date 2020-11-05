<script>
  export let caseStudy
</script>

<div>
  <img src="/img/icons/target.svg" alt="" class="icon">
</div>

{#if caseStudy.outcomeDetails}
<div class="red">
  <h4>Outcomes</h4>
  {#each caseStudy.outcomeDetails as block}
    <h5>{block.heading}</h5>
    <ul>
      {#each block.bullets as bullet}
        <li class="clearfix"><span class="triangle"></span><span class="text">{bullet.item}</span></li>
      {/each}
    </ul>
  {/each}
</div>
{/if}