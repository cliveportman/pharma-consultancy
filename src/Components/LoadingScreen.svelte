<script>
  import { fade } from 'svelte/transition'
</script>

  <div class="loader" out:fade="{{delay: 500, duration: 300}}">
    <img src="/img/cogentia-logo.svg" alt="Cogentia" class="loader-logo">
    <img src="/img/loading.svg" alt="Loading" class="loader-icon">
  </div>

  
<style>
  .loader {
    position: fixed;
    width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center; flex-direction: column;
  }
  .loader .loader-logo {
    width: 16rem;
    margin-bottom: 2rem;
  }
  .loader .loader-icon {
    width: 4.4rem; height: 4.4rem;
  }
</style>