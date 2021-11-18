$(document).ready(function () {
  $.ajax({ url: '/tweets/', method: 'GET', })
    .then((results) => {
      console.log(results)
    })
    .catch((error) => {
      console.log('error:', error);
    })

  
});