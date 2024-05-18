$(function() {
  const amenities = {};
  $('input[type="checkbox"]').change(function() {
    if ($(this).is(':checked')) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });
  $.get("http://172.21.137.143:5001/api/v1/status/", function(data, textStatus) {
    if (data.status === 'OK') {
      $('header #api_status').addClass('available')
    } else {
      $('header #api_status').removeClass('available')
    }
  });
});
