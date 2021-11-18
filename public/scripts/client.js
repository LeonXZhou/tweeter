$(document).ready(function () {
  $.ajax({ url: '/tweets/', method: 'GET', })
    .then((results) => {
    })
    .catch((error) => {
      console.log('error:', error);
    })

  
});