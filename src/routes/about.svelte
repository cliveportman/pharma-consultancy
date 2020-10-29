<script context="module">

  import { pageList, url, options } from '../stores/blog-store.js';

	export function preload() {

    if (!pageList.length) {
    console.log("Fetching via about preload...")

      return this.fetch(url, options)
      .then( (resp) => resp.json() )
      .then(function(json) {

        pageList.update(() => {
          var pages = json.data.pages;
          return pages;
        });

      })
      .catch(console.error); 
    }   

	}
</script>

<script>
  $: console.log($pageList)
	
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>