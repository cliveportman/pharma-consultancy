
<script>
  export let service
</script>



<div class="objective-holder">
  <div class="objective-circle">
    <div class="objective-text">
      <h3>Objective:</h3>
      {@html service.objective}
    </div>
  </div>
</div>

<style>
.objective-holder {
  position: relative;
  width: 100%; height: calc(100vw + 4rem); overflow: hidden;
  margin: 2rem 0 4rem;

}
.objective-circle {
  position: absolute; left: 50%;
  transform: translateX(-50%);
  display: flex; width: calc(100vw + 4rem); height: calc(100vw + 4rem);
  border-radius: 50%;
  display: flex; flex-direction: column; justify-content: center;
  background: var(--colour1);
}
.objective-text {
  max-width: calc(100vw - 8rem);
  margin: 0 auto;
}

.objective-circle h3 {
margin-bottom: 2rem;
font-size: 1.4rem;
color: var(--colour2);

}
:global(.objective-circle p) {
  font-size: 1.8rem;
color: var(--colour2);
}

@media (min-width: 768px) {
  .objective-holder {
    height: auto;
  }
  .objective-circle {
    position: static; left: auto;
    transform: translateX(0);
    width: 38rem; height: 38rem;
    margin: 0 auto;
    mix-blend-mode: multiply;
  }
  .objective-text {
    max-width: 66.6666%;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .objective-circle {
    width: 48rem; height: 48rem;
  }
  .objective-text {
    max-width: 66.6666%;
    margin: 0 auto;
  }
}

</style>