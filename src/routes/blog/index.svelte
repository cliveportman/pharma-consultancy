<script context="module">

  import { pageList, url, options } from '../../stores/blog-store.js';

	export function preload() {

    console.log(pageList)

    if (!pageList.length) {
      console.log("Fetching via blog preload...")

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
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>
