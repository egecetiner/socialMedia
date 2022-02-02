$(document).ready(() => {
  var userId = localStorage.getItem('userId');
  if (userId == null) {
    $('.container').html(
      '<div class="d-flex align-items-center justify-content-center"><h1>Unauthorized User!</h1></div>',
    );
    $('.container').css('display', 'flex');
    $('.container').css('justify-content', 'center');
  } else {
    $('#signout').click((event) => {
      localStorage.removeItem('userId');
    });
    $('button').click(async (event) => {
      event.preventDefault();
      var username = $('#username').val();
      var password = $('#password').val();
      if (username && password) {
        await $.ajax({
          url: `http://localhost:8080/user/${userId}`,
          type: 'put',
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
              alert('Profile is updated successfully');
              window.location.href = '../Profile/Profile.html';
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
  }
});
