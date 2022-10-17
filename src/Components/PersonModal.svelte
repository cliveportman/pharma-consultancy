<script>
  export let personToShowInModal
</script>

{#if personToShowInModal}
<div class="overlay">
  <div class="content">
    <button type="button" on:click="{ () => personToShowInModal = null }">
      <div>Close <img src="/img/icons/show.svg" alt="" /></div>
    </button>
    <header>
      <img src="{personToShowInModal.portrait[0].url}" alt="{personToShowInModal.title}">
      <div class="titles">
        <h3>
          <span class="caps">{personToShowInModal.firstName}</span> {personToShowInModal.lastName}
        </h3>
        {#if personToShowInModal.title1}<p>{personToShowInModal.title1}</p>{/if}
        {#if personToShowInModal.title2}<p>{personToShowInModal.title2}</p>{/if}
      </div>
    </header>
    <div class="text">
      {@html personToShowInModal.bio}
    </div>
    {#if personToShowInModal.email || personToShowInModal.linkedinUrl}
    <div class="footer">
      {#if personToShowInModal.email}
        <a href="mailto:{personToShowInModal.email}" class="email"><img src="/img/icons/email.svg" alt="" /> {personToShowInModal.email}</a>
      {/if}
      {#if personToShowInModal.linkedinUrl}
        <a href="{personToShowInModal.linkedinUrl}" target="_blank" class="linkedin"><img src="/img/icons/linkedin-blue.svg" alt="LinkedIn" /></a>
      {/if}
    </div>
    {/if}
  </div>
</div>
{/if}

<style>
  .overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    display: flex; justify-content: center; align-items: center;
    background: rgba(0,0,0,0.8);
    
  }
    .content {
      position: relative;
      display: block; width: calc(100% - 4rem); max-width: 90rem; min-height: 50%; max-height: calc(100% - 4rem);
      background: white;
      padding: 2rem;
    }

    @media (min-width: 768px) {
      .content {
        width: calc(100% - 8rem);
        padding: 4rem;
      }
    }

    @media (min-width: 1024px) {
      .content {
        width: calc(100% - 8rem);
        padding: 6rem 10rem;
      }
    }

    button {
      position: absolute; top: 1rem; right: 1rem;
      display: block;
      padding: 0;
      border: none; background: none;
      font-weight: 400; text-transform: uppercase; font-size: 1.2rem;
      color: #BD1622;
    }
      button div {
        display: flex; justify-content: flex-end; align-items: center;
      }
        button img {
          display: block; width: 4.5rem; height: 4.5rem;
          border: none;
          margin: 0 0 0 1rem;
          transform: rotate(45deg);
        }

  header {
    display: flex; justify-content: flex-start; align-items: flex-start;
  }
  header img {
    display: block; width: 12.5rem; height: auto;    
    margin-right: 2rem; margin-bottom: 2rem;
    border-radius: 50%;
    border: 1px solid #BD1622;
  }
  @media (min-width: 768px) {  
    header {
    }
    header img {
      width: 15rem;
      margin-right: 2rem;
    }
  }

.titles {
}

  .titles h3 {
    margin-top: 3rem; margin-bottom: 1rem;
    font-weight: 700;
    color: #BD1622;
  }
  .titles h3 span {
    display: block;
    text-transform: uppercase; font-weight: 700;
  }
    .titles p:last-of-type {
      display: none;
      margin-bottom: 2rem;
    }
  @media (min-width: 768px) {
    .titles h3 {
      margin-top: 0; margin-bottom: 2rem;
    }
    .titles p:last-of-type {
      display: block; width: 30rem;
    }
  }

.titles p {
  font-weight: 700;
    color: #BD1622;
}

.text {
  max-height: 40rem;
  overflow: auto;
}


.footer {
  display: flex; justify-content: flex-start; align-items: flex-end;
  padding-bottom: 4rem;
  border-bottom: 1px solid #ccc;
}
  .footer .email {
    display: flex; justify-content: flex-start; align-items: flex-end;
    margin-right: 4rem;
    color: #1D1D1D; font-size: 1.6rem; text-decoration: none;
  }
    .footer .email img {
      display: block; width: 5rem;
      margin-right: 1rem;
    }
  .footer .linkedin {
  }
    .footer .linkedin img {
      display: block; width: 4.4rem;
    }
</style>