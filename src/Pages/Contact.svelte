<script>
  import { sitewideData } from '../stores/global-store'

  



  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  }


  fetch("https://silly-leavitt-9429a2.netlify.app/.netlify/functions/hello", options)
  .then(function(resp) {

    console.log(resp)

   })
  .catch(console.error);


</script>