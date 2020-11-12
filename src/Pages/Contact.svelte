<script>
  import { sitewideData } from '../stores/global-store'
  import LoadingIcon from '../Components/LoadingIcon.svelte';
  import {slide} from 'svelte/transition'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'
  console.log($sitewideData)

  let firstName
  let lastName
  let email
  let tel
  let message

  let formSubmitted = false

  function submitForm() {
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(tel)
    console.log(message)
    formSubmitted = true

  }

  $: console.log(firstName)
  $: console.log(lastName)
  $: console.log(email)
  $: console.log(tel)
  $: console.log(message)

  
  import { mapStyles } from '../Components/map-styles';
	let container;
	let map;
	let zoom = 8;
    let center = {lat: -34.397, lng: 150.644};
    
    import { onMount } from 'svelte';
    
	onMount(async () => {
		map = new google.maps.Map(container, {
            zoom,
			center,
			styles: mapStyles // optional
    });

    const hash = window.location.hash.substr(1)
    if (hash.length) {
      const element = document.getElementById(hash);
      element.scrollIntoView()
    }
    console.log(hash)



	});

  // let options = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" }
  // }


  // fetch("https://silly-leavitt-9429a2.netlify.app/.netlify/functions/hello", options)
  // .then( (resp) => resp.json() )
  // .then(function(json) {

  //   console.log(json)

  //  })
  // .catch(console.error);


</script>


{#if $sitewideData}

  <h1>Contact</h1>

  <div class="container ">

    <div class="contacts">
      <p>{@html $sitewideData.entry.address.replace(/\n/g, "<br />")}</p>
      <p>{$sitewideData.entry.tel}<br><a href="mailto:">{$sitewideData.entry.email}</a></p>
    </div>

    <div class="sendmessage {formSubmitted ? 'sent' : ''}" out:slide="{{ duration: 300 }}">
      <h2>Send a message</h2>
      <form>
        <input type="text" placeholder="FIRST NAME*" bind:value={firstName}>
        <input type="text" placeholder="LAST NAME*" bind:value={lastName}>
        <input type="email" placeholder="EMAIL*" bind:value={email}>
        <input type="text" placeholder="PHONE" bind:value={tel}>
        <textarea rows="10" placeholder="MESSAGE" bind:value={message}></textarea>
        <button on:click|preventDefault="{ () => { submitForm() }}" disabled='{formSubmitted}'>Send</button>
      </form>
    </div>

    {#if formSubmitted}
      <div class="successmessage" in:slide="{{ duration: 300 }}">
        {@html $sitewideData.entry.successMessage}
      </div>
    {/if}

  </div>

  <div class="container" id="googlemap">

    <div class="map" bind:this={container}></div>

  </div>

  <div class="container">
    <TestimonialsCarousel/>
  </div>

{:else}
  <LoadingIcon/>  
{/if}

<style>
.contacts {
  margin-bottom: 4rem;;
}
  @media (min-width: 768px) {

    .contacts {
      padding: 0 8.3333%;
      margin-bottom: 2rem;;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 2rem;
    }
  }


  .sendmessage.sent {
    opacity: 0.2;

  }
.sendmessage h2 {
  text-transform: uppercase;
}

input {
  display: block; width: 100%;
  padding: 2rem 2rem 0.5rem; margin-bottom: 1rem;
  border: 1px solid #1d1d1d;
}
textarea {
  display: block; width: 100%;
  padding: 2rem 2rem 0.5rem; margin-bottom: 1rem;
  border: 1px solid #1d1d1d;
  font-family: 'Public Sans', sans-serif;
}

button {
  display: block; width: 100%; height: 5.5rem;
  margin-bottom: 4rem; padding: 2rem 2rem 0;
  -webkit-appearance: none;
  border: none;
  color: white; background: #A8A7A7;
  text-transform: uppercase; text-align: left; line-height: 1em;
}

@media (min-width: 768px) {

  .sendmessage {
    padding: 0 8.3333%;
  }
  button {
    width: 25%;
    margin-left: 75%;
  }
}


.successmessage {
  padding: 0 2rem 2rem;
}
:global(.successmessage p) {
  font-size: 1.6rem; margin: 0; padding-bottom: 2rem;
  color: #BD1622;
}
@media (min-width: 1024px) {

  .successmessage {
  padding: 0 8.3333% 2rem;
}
}


.container {

}

.map {
  height: 30rem;
}
@media (min-width: 768px) {
  .map {
    margin: 0 8.3333% 4rem;
  height: 30rem;
}
}
  </style>