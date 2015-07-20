function populateUserForm(userDetails) {

	var fn = $(userDetails).data('fn'),
		ln = $(userDetails).data('ln'),
		em = $(userDetails).data('email');

	$('#userDetails #firstName').val(fn);
	$('#userDetails #lastName').val(ln);
	$('#userDetails #email').val(em);
}

function updateUserDetails(e) {
	console.log(e);

	var data = $(e).serialize();

	$.ajax({
	  type: 'POST',
	  url: '/admin/profile',
	  data: data,
	  cache: false,
	  success: function(response)
	  {
	  	$('#message').html('Details updated successfully')
	  	e.reset();
	  },
	  error: function(response) {
	  	console.log('error');
	  }
	});
}