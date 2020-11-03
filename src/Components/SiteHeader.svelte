
<script>

    export let links
    let displayNav = false
</script>

<header class="sitewide">
    <h1><a href="/"><img src="/img/cogentia-logo.svg" alt="Cogentia"></a></h1>
    <nav class="{ displayNav ? 'open' : ''}">    
        {#each links as link}
            <a href="{link.uri != '__HOME__' ? link.uri : '/' }">{link.linkTitle ? link.linkTitle : link.title}</a>
        {/each}
    </nav>
    <button class="{ displayNav ? 'open' : ''}" on:click="{ () => { displayNav = !displayNav }}">
      <span></span>
      <span></span>
      <span></span>
    </button>
</header>

<style>
  header {
    display: flex; justify-content: space-between; align-items: flex-end;
    width: 100%;
    margin: 2rem 2rem 2rem;
  }
  @media (min-width: 1024px) {
    header { max-width: 1000px; margin: 2rem auto; padding: 0 2rem; }
  }
  @media (min-width: 1366px) {
    header { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }
  }
  h1 {
    width: 70%; max-width: 19.6rem;
  }
  @media (min-width: 1024px) {
  h1 {
    width: 22rem; max-width: none;
  }

  }
  nav {
    position: fixed; z-index: 1;
    display: flex; justify-content: center; flex-direction: column;
    left: 100%; right: -100%; top: 8.6rem; bottom: 0;
    background: white;
    transition: left 0.2s;
  }
  nav.open {
    left: 0; right: 0;
  }
    nav a {
      display: block;
      text-align: center; color: #1D1D1D;
      text-transform: uppercase;
      font-size: 2rem; line-height: 2.5em;
      text-decoration: none; font-weight: 700;
    }
    nav a:focus, nav a:hover, nav a:active {
      color: #BD1622;
    }

  @media (min-width: 768px) {
    nav {
      position: static;
      justify-content: space-between; flex-direction: row;
      width: calc(100% - 19.6rem);
      padding-left: 4rem;
    }
      nav a {
        display: block;
        font-size: 1.5rem; line-height: 2.5em;
        text-decoration: none; font-weight: 700;
      }

  }

  @media (min-width: 1024px) {
    nav {
      width: calc(100% - 22rem);
      padding-left: 10rem;
    }
      nav a {
        font-size: 1.8rem; line-height: 2.5em;
        text-decoration: none; font-weight: 700;
      }

  }

  @media (min-width: 1024px) {
    nav {
      padding-left: 15rem;
    }
      nav a {
        font-size: 2rem;
      }

  }

  button {
    position: relative;
    display: flex; justify-content: space-between; flex-direction: column;
    width: 4.4rem; height: 4.4rem;
    padding: 1rem 0.5rem 1rem; margin: 0;
    background: none; border: none; -webkit-appearance: none;
    outline: none;
  }
  button span {
    display: block; width: 100%; height: 0.2rem;
    background: black;
    transition: all 0.2s;
  }
  button.open span:first-child {
    position: relative; top: 1.1rem; right: 0.3rem;
    width: 120%;
    transform: rotate(45deg);
    
  }
  button.open span:nth-child(2) {
    position: relative; bottom: 1.1rem; right: 0.3rem;
    width: 120%;
    transform: rotate(-45deg);
    
  }
  button.open span:last-child {
    display: none;
  }
  @media (min-width: 768px) {
    button {
      display: none;
    }
  }
</style>