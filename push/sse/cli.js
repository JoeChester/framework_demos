let axios = require('axios')

axios({
  method: 'post',
  url: 'http://localhost:4748/sse',
  data: "I AM GROOT"
});