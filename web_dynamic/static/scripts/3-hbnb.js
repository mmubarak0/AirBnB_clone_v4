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
  $.ajaxSetup({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
  });
  $.post("http://172.21.137.143:5001/api/v1/places_search/", '{}', function(data, textStatus) {
    data.forEach(function(place) {
      $('section.places').append(
        $('<article></article>').append(
          $('<div></div>').addClass('title_box').append(
            $('<h2></h2>').text(place.name)
          ).append(
            $('<div></div>').addClass('price_by_night').text(place.price_by_night)
          )
        ).append(
          $('<div></div>').addClass('information').append(
            $('<div></div>').addClass('max_guest').text(place.max_guest + ` Guest${place.max_guest!=1?"s":""}`)
          ).append(
            $('<div></div>').addClass('number_rooms').text(place.number_rooms + ` Guest${place.number_rooms!=1?"s":""}`)
          ).append(
            $('<div></div>').addClass('number_bathrooms').text(place.number_bathrooms + ` Guest${place.number_bathrooms!=1?"s":""}`)
          )
        ).append(
          $('<div></div>').addClass('description').append(
            `${place.description}`
          )
        )
      )
    });
  });
});
