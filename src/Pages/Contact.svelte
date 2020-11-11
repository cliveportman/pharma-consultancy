<script>
  import { sitewideData } from '../stores/global-store'

  
  const url = '/.netlify/functions/sendgrid';
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      message: "Testing, testing..."
    })
  };

fetch(url, options)
  .then(response => {
    console.log(response.status);
  });


</script>