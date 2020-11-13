<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
</script>

<svelte:head>
  
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26565851-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-26565851-1');
  </script>

	<script defer async
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8-xbB3JwmaKWL6DaibuwsPh0oX9cBkEk&callback=initMap">
  </script>

</svelte:head>
 
<Router {routes} />