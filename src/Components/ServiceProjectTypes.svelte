
<script>
  export let service
</script>




<div class="project-types"  data-aos="fade-up">
  <h3>Project types:</h3>
  <ul>
    {#each service.projectTypes as bullet, index}
      <li>{bullet.item}</li>
    {/each}
  </ul>
</div>

<style>

  h3 {
    color: var(--colour1);
  }
  .project-types {
    margin-bottom: 4rem;
    padding: 0 2rem;
  }
.project-types ul {
  list-style-type: none;
  margin: 0; padding: 0;

}
.project-types li {
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--colour2);
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
}


.project-types ul li {
    position: relative;
    margin-bottom: 1rem;
    padding-left: 2rem;
    list-style-type: none;
    font-size: 1.6rem; line-height: 1.2em;
  }
  .project-types ul li:before {
    content: "";
    position: absolute; left: 0; top: 0.25rem;
    display: block; width: 0; height: 0;
    margin: 0.2rem 0.5rem 0 0;
    border-top: 5px solid transparent; border-bottom: 5px solid transparent;  
    
  }
  .project-types ul li:before {
    border-left: 10px solid var(--colour1);
  }
</style>