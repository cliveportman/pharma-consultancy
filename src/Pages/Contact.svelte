<script>
  import { sitewideData } from '../stores/global-store'
  import LoadingIcon from '../Components/LoadingIcon.svelte';
  import {slide} from 'svelte/transition'
  import TestimonialsCarousel from '../Components/TestimonialsCarousel.svelte'

  let firstName
  let lastName
  let email
  let tel
  let message

  let formSubmitted = false



function submitForm() {

  let emailBody = `First name: ${firstName}<br/>Last name: ${lastName}<br/>Email: ${email}<br/>Tel: ${tel}<br/>Message: ${message}<br/>`

  const url = "https://cogentia.co.uk/.netlify/functions/sendgrid"
  const data = {
    message: emailBody,
  }
  let dataString = JSON.stringify(data)

  let options = {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    mode: "cors",
    body: dataString
  }
  fetch(url, options)
  .then( (resp) => resp.json() )
  .then(function(json) {

    console.log(json)
    formSubmitted = true

  })
  .catch(console.error);


}

import { onMount } from 'svelte'
import AOS from 'aos'

  
  import { mapStyles } from '../Components/map-styles';
	let container;
	let map;
	let zoom = 14;
  let center = {lat: 52.201780, lng: 0.124703} 
    
    
	onMount(async () => {
		map = new google.maps.Map(container, {
            zoom,
			center,
			styles: mapStyles // optional
    });
    let image = '/img/map-icon.png';
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(52.201780, 0.124703),
            map: map,
            title: "Cogentia",
      icon: image
        });

    const hash = window.location.hash.substr(1)
    if (hash.length) {
      const element = document.getElementById(hash);
      element.scrollIntoView()
    }

    
  AOS.init();



	});

  export let currentRoute
  gtag('config', 'UA-26565851-1', {
    'page_title' : 'contact',
    'page_path': currentRoute.path
  });

</script>

<svelte:head>
  <title>Contact / Cogentia</title>
</svelte:head>


{#if $sitewideData}

  <h1>Contact</h1>

  <div class="container ">

    <div class="contacts">
      <p data-aos="fade-up">{@html $sitewideData.entry.address.replace(/\n/g, "<br />")}</p>
      <p data-aos="fade-up">{$sitewideData.entry.tel}<br><a href="mailto:">{$sitewideData.entry.email}</a></p>
    </div>


  
    
    <div class="sendmessage {formSubmitted ? 'sent' : ''}" data-aos="fade-up">
      <h2>Send a message</h2>
      <form>
        <input type="text" placeholder="FIRST NAME*" bind:value={firstName} required>
        <input type="text" placeholder="LAST NAME*" bind:value={lastName} required>
        <input type="email" placeholder="EMAIL*" bind:value={email} required>
        <input type="text" placeholder="PHONE" bind:value={tel} required>
        <textarea rows="10" placeholder="MESSAGE*" bind:value={message} required></textarea>
        <button on:click|preventDefault="{ () => { submitForm() }}" disabled='{formSubmitted}'>Send</button>
      </form>
    </div>
    
  

    {#if formSubmitted}
      <div class="successmessage" in:slide="{{ duration: 300 }}">
        {@html $sitewideData.entry.successMessage}
      </div>
    {/if}

  </div>

  <div class="container" id="googlemap" data-aos="fade-up">

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
      padding: 4rem 8.3333% 4rem;
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