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
    console.log(json.data)

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

    {#each $pageData.categories as category}
      <div class="category">
        <h2 data-aos="fade-up">{ category.title}</h2>
        <div class="people">
          {#each $pageData.entries as person}
          {#if person.team[0].slug == category.slug}
            <div class="person" data-aos="fade-up">
              <header>
                <img src="{person.portrait[0].url}" alt="{person.title}">
                <div class="titles">
                  <h3>
                    <span class="caps">{person.firstName}</span> {person.lastName}
                  </h3>
                  <p>{person.title1}</p>
                  <p>{person.title2}</p>
                </div>
              </header>
              <div class="text">
                {@html person.bio}
              </div>
            </div>
          {/if}
          {/each}
        </div>
      </div>
    {/each}

  </div>
{:else}
  <LoadingIcon/> 
{/if}

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
      column-gap: 0;
    }

    .person:nth-child(2n-1) {
      margin-right: 4rem;

    }

    .person:nth-child(2n) {
      padding-left: 4rem;
      border-left: 1px solid #ccc;

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
</style>