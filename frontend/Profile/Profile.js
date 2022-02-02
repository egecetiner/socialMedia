$(document).ready(async () => {
  var _userId = localStorage.getItem('userId');
  if (_userId == null) {
    $('.container').html(
      '<div class="d-flex align-items-center justify-content-center"><h1>Unauthorized User!</h1></div>',
    );
    $('.container').css('display', 'flex');
    $('.container').css('justify-content', 'center');
  } else {
    await $.ajax({
      url: `http://localhost:8080/user/${_userId}`,
      type: 'get',
      success: (data) => {
        $(`#welcome`).text(`${data.username}'s Profile`);
        data.following.map(async (item) => {
          await $.ajax({
            url: `http://localhost:8080/user/${item._id}`,
            type: 'get',
            success: (data) => {
              $('#following').append(
                `<div class="  d-flex navigation followers justify-content-between align-items-center  my-1 text-white rounded">
                <div class="mr-5 pr-5 pl-3 ">${data.username}</div>
              <button id="${data._id}" class="btn btn-raised btton ">
              Unfollow
            </button>
             </div>`,
              );
            },
            error: (error) => {
              console.log(error);
            },
          });

          $(`#${item._id}`).click(async () => {
            await unfollow(_userId, item._id).done(
              (window.location.href = window.location.href),
            );
          });
        });
        data.followers.map(async (item) => {
          await $.ajax({
            url: `http://localhost:8080/user/${item._id}`,
            type: 'get',
            success: (data) => {
              $('#followers').append(
                `<div class="  d-flex navigation followers justify-content-center align-items-center  my-1 text-white rounded">${data.username}
             
             </div>`,
              );
            },
            error: (error) => {
              console.log(error);
            },
          });
        });
      },
      error: (error) => {
        console.log(error);
      },
    });

    const unfollow = async (userId, unfollowId) => {
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

    $('#signout').click((event) => {
      localStorage.removeItem('userId');
    });
    $('#delete').click(async (event) => {
      if (confirm('Are you sure you want to delete profile?')) {
        await $.ajax({
          url: `http://localhost:8080/user/${_userId}`,
          type: 'get',
          success: (data) => {
            data.following.map(async (item) => {
              await unfollow(_userId, item._id);
            });
            data.followers.map(async (item) => {
              await unfollow(item._id, _userId);
            });
          },
          error: (error) => {
            console.log(error);
          },
        });

        await $.ajax({
          url: `http://localhost:8080/user/${_userId}`,
          type: 'delete',
          dataType: 'string',
          error: (data) => {
            if (data.status == 200) {
              alert('Profile is deleted successfully');
              window.location.href = '../Signin/Signin.html';
            } else {
              alert('An error occured.');
            }
          },
        });
      } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
      }
    });
  }
});
