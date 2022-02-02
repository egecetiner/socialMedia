$(document).ready(() => {
  $('button').click(async (event) => {
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();

    if (username && password) {
      await $.ajax({
        url: 'http://localhost:8080/signin',
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
          if (data.status == 200) {
            localStorage.setItem(
              'userId',
              JSON.stringify(data.responseText).slice(22, 46),
            );
            window.location.href = '../MainPage/MainPage.html';
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
