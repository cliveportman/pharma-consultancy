
<script>
    export let links
    export let tel
    export let email
    export let address
</script>


<footer class="sitewide">
    <div class="footer-top">
        <div class="contacts">
            <a href="tel:{tel}"><img src="/img/icons/tel-red.svg" alt="">{tel}</a>
            <a href="mailto:{email}"><img src="/img/icons/email-red.svg" alt="">{email}</a>
            <a href="https://www.linkedin.com/company/cogentia-healthcare-consulting" target="_blank"><img src="/img/icons/linkedin.svg" alt="LinkedIn"></a>
        </div>
        <a href="/">cogentia.co.uk</a>
    </div>
    <div class="footer-bottom">
        <div class="row">
            <div class="col-sm-3">
                <p>{@html address.replace(/\n/g, "<br />")}</p>
            </div>
            <div class="col-sm-5">
                <a href="/contact" class="maplink"><img src="/img/icons/map-red.svg" alt="">Map - find us</a>
            </div>
            <div class="col-sm-4">
                <p>
                    © Cogentia 2020	–	All rights reserved.<br>
                    <a href="https://www.specialdesignstudio.co.uk">Site by Special Design Studio</a>
                </p>
                <nav>  
                    {#each links as link}
                        <a href="{link.uri}">{link.linkTitle ? link.linkTitle : link.title}</a>
                    {/each}
                </nav>

            </div>
        </div>
    </div> 
    
</footer>