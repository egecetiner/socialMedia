$(document).ready(async () => {
  var userId = localStorage.getItem('userId');
  if (userId == null) {
    $('.container').html(
      '<div class="d-flex align-items-center justify-content-center"><h1>Unauthorized User!</h1></div>',
    );
    $('.container').css('display', 'flex');
    $('.container').css('justify-content', 'center');
  } else {
    await $.ajax({
      url: `http://localhost:8080/user/${userId}`,
      type: 'get',
      success: (data) => {
        localStorage.setItem('following', JSON.stringify(data.following));
      },
      error: (error) => {
        console.log(error);
      },
    });
    $('#signout').click((event) => {
      localStorage.removeItem('userId');
    });
    const follow = async (followId) => {
      await $.ajax({
        url: 'http://localhost:8080/user/follow',
        type: 'put',
        data: JSON.stringify({
          userId,
          followId,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        dataType: 'string',
      });
    };

    const unfollow = async (unfollowId) => {
      await $.ajax({
        url: 'http://localhost:8080/user/unfollow',
        type: 'put',
        data: JSON.stringify({
          userId,
          unfollowId,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        dataType: 'string',
      });
    };

    await $.ajax({
      url: 'http://localhost:8080/users',
      type: 'get',
      success: (data) => {
        data.map((user) => {
          if (user._id !== userId) {
            $('#allUsers').append(
              `<div class=" navigation d-flex justify-content-between align-items-center pl-3 my-1 text-white rounded">${user.username}
          <button id="${user._id}" class="btn btn-raised btton">
          Follow
        </button>
         </div>`,
            );

            var following = JSON.parse(localStorage.getItem('following'));
            var follows = following.some((item) => item._id === user._id);
            if (follows) {
              $(`#${user._id}`).css('background-color', '#834e46');
              $(`#${user._id}`).css('color', 'white');
              $(`#${user._id}`).text('Unfollow');
              $(`#${user._id}`).click(async () => {
                await unfollow(user._id).done(
                  (window.location.href = window.location.href),
                );
              });
            } else {
              $(`#${user._id}`).click(async () => {
                await follow(user._id).done(
                  (window.location.href = window.location.href),
                );
              });
            }
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
});
