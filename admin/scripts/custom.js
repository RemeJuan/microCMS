function populateUserForm(userDetails) {
	userDetails = $(userDetails).parent();
	var fn = $(userDetails).data('fn'),
		ln = $(userDetails).data('ln'),
		em = $(userDetails).data('email');

	$('#userDetails #firstName').val(fn);
	$('#userDetails #lastName').val(ln);
	$('#userDetails #email').val(em);
}

function updateUserDetails(e) {
	var data = $(e).serialize();

	$.ajax({
		type: 'POST',
		url: '/admin/users/create',
		data: data,
		cache: false,
		success: function(response) {
			if (response == 'Success') {
				$('#message').html('Details saved');
				e.reset();
			} else {
				$('#message').html('Details not saved');
			}
		},
		error: function(response) {
			$('#message').html('An error occured');
		}
	});
}

function deleteUser(e) {
	var data = $(e).parent(),
		userEmail = $(data).data('email');

	var con = confirm('Are you sure you wish to delete this user');

	if (con) {
		$.ajax({
			type: 'POST',
			url: '/admin/users/delete',
			data: {
				email: userEmail
			},
			cache: false,
			success: function(response) {
				if (response == 'Success') {
					$('#message').html('Details saved');
					$(e).closest('li').remove();
				} else {
					$('#message').html('Details not saved');
				}
			},
			error: function(response) {
				$('#message').html('An error occured');
			}
		});
	}
}