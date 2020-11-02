
<script>
    export let links
    console.log(links)
</script>

<header class="sitewide">
    <h1><a href="/"><img src="/img/cogentia-logo.svg" alt="Cogentia"></a></h1>
    <nav>    
        {#each links as link}
            <a href="{link.uri}">{link.linkTitle ? link.linkTitle : link.title}</a>
        {/each}
    </nav>
</header>