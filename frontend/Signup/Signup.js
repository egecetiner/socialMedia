$(document).ready(() => {
  $('button').click(async (event) => {
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();

    if (username && password) {
      await $.ajax({
        url: 'http://localhost:8080/signup',
        type: 'post',
        data: JSON.stringify({
          username,
          password,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        dataType: 'string',
        error: (data) => {
          console.log(data.status);
          if (data.status == 200) {
            $('#username').val('');
            $('#password').val('');
            $('#success').css('display', 'block');
          } else {
            $('#username').val('');
            $('#password').val('');
            $('#error').css('display', 'block');
          }
        },
      });
    } else {
      alert('Username and password can not be blank!');
    }
  });
});
