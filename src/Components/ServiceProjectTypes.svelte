
<script>
  export let service
</script>




<div class="project-types container">
  <h3 data-aos="fade-left">Project types:</h3>
  <ul>
    {#each service.projectTypes as bullet, index}
      <li data-aos="fade-left" data-aos-delay="{(index +1) * 150}"><span class="border"><span class="triangle"></span><span class="text">{bullet.item}</span></span></li>
    {/each}
  </ul>
</div>

<style>

  h3 {
    color: var(--colour1);
  }
  .project-types {
    margin-bottom: 4rem;
  }
.project-types ul {
  list-style-type: none;
  margin: 0; padding: 0;

}

.project-types li .border {
  display: inline-block;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--colour2);
}
.project-types span.triangle {
  content: "";
  float: left;
  display: block; width: 0; height: 0;
  margin: 0.2rem .5rem 0 0;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent;  
  border-left: 10px solid var(--colour1);
}
.project-types span.text {
  float: left;
  max-width: calc(100% - 3rem);
}

@media (min-width: 768px) {
  .project-types h3 {
    width: 38rem;
    margin-left: auto; margin-right: auto;
  }
  .project-types ul {
    width: 38rem;
    margin: 0 auto;
  }
  .project-types li .border {
  }
}
</style>