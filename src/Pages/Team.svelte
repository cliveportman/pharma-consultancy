<script>
  import { url, options, teamData as pageData } from '../stores/global-store'
  import {query } from '../stores/graphql-queries/team-query'
  import LoadingIcon from '../Components/LoadingIcon.svelte'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  export let currentRoute  
  let token = currentRoute.queryParams.token
  let queryUrl
  if (token) queryUrl = url + '?token=' + token
  else queryUrl = url

  fetch(queryUrl, options(query))
  .then( (resp) => resp.json() )
  .then(function(json) {

    pageData.update(() => {
      return json.data
    });

   })
  .catch(console.error);


  import { onMount } from 'svelte'
  import AOS from 'aos'
  onMount(() => {
    AOS.init();
  });

gtag('config', 'UA-26565851-1', {
  'page_title' : 'team',
  'page_path': currentRoute.path
});

import Modal from '../Components/PersonModal.svelte'
let personToShowInModal = null

</script>

<svelte:head>
  <title>Team / Cogentia</title>
</svelte:head>


{#if $pageData}
  <h1>Team</h1>
  <div class="container">

    <div class="introduction" data-aos="fade-up">
      {@html $pageData.entry.introduction}
    </div>

    <div class="category">
      <div class="people">
        {#each $pageData.entries as person}
          <div class="person" data-aos="fade-up">
            <header>
              <img src="{person.portrait[0].url}" alt="{person.title}">
              <div class="titles">
                <h3>
                  <span class="caps">{person.firstName}</span> {person.lastName}
                </h3>
                {#if person.title1}<p>{person.title1}</p>{/if}
                {#if person.title2}<p>{person.title2}</p>{/if}
              </div>
            </header>
            <div class="text">
              {@html person.bio}
            </div>
            <div class="footer">
              <button type="button" on:click="{ () => personToShowInModal = person }">
                <div>Read more <img src="/img/icons/show.svg" alt="" /></div>
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>

  </div>
{:else}
  <LoadingIcon/> 
{/if}

{#if personToShowInModal}<Modal bind:personToShowInModal="{personToShowInModal}" />{/if}

<style>
  .introduction {
    margin: 4rem 0;
  }
  @media (min-width: 768px) {
    .introduction {
      margin: 6rem 0;
      padding-left: 8.3333%; padding-right: 8.3333%;
    }
  }
  @media (min-width: 1024px) {
    .introduction {
      padding-left: 0; padding-right: 50%;
    }
  }

  @media (min-width: 768px) {
  .people {
      margin: 0 auto 6rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 6rem; row-gap: 6rem;
    }
  }

  h2 {
    margin-bottom: 8rem;
    text-transform: uppercase;
  }

  header {
    position: relative;
  }
  img {
    display: block; width: 45%; height: auto;
    margin-right: 4rem; margin-bottom: 2rem;;
    border-radius: 50%;
    border: 1px solid #BD1622;
  }
  @media (min-width: 768px) {  
    header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 2rem;
    }
    img {
      width: 40%;
      margin-right: 2rem;
    }
  }
  @media (min-width: 1024px) {  
    header {
      margin-bottom: 4rem;
    }
    img {
      width: 45%; 
      margin-right: 4rem;
    }
  }

.titles {
}

  .titles h3 {
    position: absolute; left: 50%; top: 0;
    font-weight: 500; font-weight: 700;
    color: #BD1622;
  }
  .titles p:first-of-type {
    position: absolute; left: 50%; top: 6rem;
  }
  .titles h3 span {
    display: block;
    text-transform: uppercase; font-weight: 700;
  }
  @media (min-width: 768px) {
    .titles h3 {
      position: static;
    }
    .titles p:first-of-type {
      position: static;
    }
  }

.titles p {
  font-weight: 700;
    color: #BD1622;
}

.text {
  max-height: 300px; overflow: hidden;
  position: relative;

}
  .text:after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 60%;
    background: linear-gradient(0deg, white 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%);
  }

.footer {
  display: flex; justify-content: flex-end;
  padding-bottom: 3rem; margin-bottom: 4rem;
}
@media (max-width: 767px) {
.person:last-of-type .footer {
  margin-bottom: 0; border-bottom: 0;
}
}
.footer button {
  display: block;
  border: none; background: none;
  font-weight: 400; text-transform: uppercase; font-size: 1.2rem;
  color: #BD1622;
  padding: 0;
}

.footer button div {
  display: flex; justify-content: flex-end; align-items: center;
}
  .footer button img {
    display: block; width: 4.5rem; height: 4.5rem;
    border: none;
    margin: 0 0 0 1rem;
  }
</style>