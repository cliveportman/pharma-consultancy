
<script>
    export let links
    export let tel
    export let email
    export let address
</script>


<footer>
<div class="container">
    <div class="footer-top">
        <div class="contacts">
            <a href="tel:{tel}" class="tel"><img src="/img/icons/tel-red.svg" alt="">{tel}</a>
            <a href="mailto:{email}" class="email"><img src="/img/icons/email-red.svg" alt="">{email}</a>
            <a href="https://www.linkedin.com/company/cogentia-healthcare-consulting" target="_blank" class="linkedin"><img src="/img/icons/linkedin.svg" alt="LinkedIn"></a>
            <a href="/" class="homelink">cogentia.co.uk</a>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="col">
            <p>{@html address.replace(/\n/g, "<br />")}</p>
        </div>
        <div class="col">
        </div>
        <div class="col">
            <nav>
              <a href="/contact#googlemap" class="">Find us</a>
                {#each links as link}
                    <a href="/{link.uri}">{link.linkTitle ? link.linkTitle : link.title}</a>
                {/each}
            </nav>
        </div>
        <div class="col credits">
            <p class="credits">
                © Cogentia 2020	–	All rights reserved.<br>
                <a href="https://www.specialdesignstudio.co.uk">Site by Special Design Studio</a>
            </p>

        </div>
    </div> 
</div>  
</footer>

<style>
footer {
    background: #F3F2ED;
}
    .container {
        padding: 2rem;
    }
        .contacts {
            position: relative;
            border-bottom: 1px solid #BD1622; padding-bottom: 1rem; margin-bottom: 2.4rem;
        }

        @media (min-width: 768px) {
            .contacts {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              column-gap: 2rem;
            }
        }

        @media (min-width: 1024px) {
            .contacts {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              column-gap: 2rem;
            }
        }

        .contacts a {
            width: 100%; height: 4.4rem;
            display: flex; justify-content: flex-start; align-items: center;
            line-height: 4.4rem; font-size: 1.6rem; text-decoration: none;
        }
        @media (min-width: 1367px) {
          .contacts a {
            font-size: 1.8rem;
          }
        }
            .contacts a.tel img {
                display: block; height: 2.4rem;
                margin-right: 1rem; margin-left: 0.5rem; 
            }
            .contacts a.email img {
                display: block; height: 1.6rem; 
                margin-right: 1rem;      
            }
        .contacts a.linkedin {
            position: absolute; right: 0; bottom: -7rem;
            width: auto;
        }
            .contacts a.linkedin img {
                display: block; height: 3.1rem;
            }

        .homelink {
            display: none;
        }
        @media (min-width: 768px) {
            .contacts a {
                width: auto;
            }
            .contacts a.linkedin {
                position: static; right: auto; bottom: auto;
            }

            .contacts .homelink {
                position: absolute; right: 0;
                display: block;
                margin-right: 0;
                line-height: 4.4rem; font-size: 1.6rem; text-decoration: none;
                
            }
        }
        @media (min-width: 1367px) {
          .contacts .homelink {
            font-size: 1.8rem;
          }
        }

    p, nav a {
        display: block;
        font-size: 1.2rem; line-height: 1.8em;
    }

    .maplink {
        display: flex; justify-content: flex-start; align-items: center;
        margin: 2rem 0;
        text-decoration: none; font-size: 1.6rem;
        text-transform: uppercase;
    }
        .maplink img {
                display: block; height: 2.4rem;
                margin-right: 1rem; 

        }
        nav {
            margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
            .footer-bottom {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              column-gap: 2rem;
            }

            p, nav a {
                font-size: 1.3rem;
            }
            .maplink { 
                margin: 0;
            }
            p.credits {
                text-align: right;
            }
            div.credits {
              grid-column: 1/4;
            }
        }

@media (min-width: 1024px) {
    .footer-bottom {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 2rem;
    }
            div.credits {
              grid-column: 4/4;
            }
  }
</style>