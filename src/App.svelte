<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
</script>

<svelte:head>
	<script defer async
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8-xbB3JwmaKWL6DaibuwsPh0oX9cBkEk&callback=initMap">
	</script>
</svelte:head>
 
<Router {routes} />