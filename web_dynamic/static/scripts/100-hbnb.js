$(function() {
  const amenities = {};
  const cities = {};
  const states = {};
  $.ajaxSetup({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
  });
  function render(data, textStatus) {
    $('section.places').html("")
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
            $('<div></div>').addClass('number_rooms').text(place.number_rooms + ` Room${place.number_rooms!=1?"s":""}`)
          ).append(
            $('<div></div>').addClass('number_bathrooms').text(place.number_bathrooms + ` Bathroom${place.number_bathrooms!=1?"s":""}`)
          )
        ).append(
          $('<div></div>').addClass('description').append(
            `${place.description}`
          )
        )
      )
    });
  }
  // update amenities filters
  $('.amenities input[type="checkbox"]').change(function() {
    if ($(this).is(':checked')) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });
  // update cities filters
  $('.locations ul li ul input[type="checkbox"]').change(function() {
    if ($(this).is(':checked')) {
      cities[$(this).data('id')] = $(this).data('name');
    } else {
      delete cities[$(this).data('id')];
    }
    $('.locations h4').text(Object.values(states).concat(Object.values(cities)).join(', '));
  });
  // update states filters
  $('.locations ul li h2 input[type="checkbox"]').change(function() {
    if ($(this).is(':checked')) {
      states[$(this).data('id')] = $(this).data('name');
    } else {
      delete states[$(this).data('id')];
    }
    $('.locations h4').text(Object.values(states).concat(Object.values(cities)).join(', '));
  });
  // later to be replaced by http://0.0.0.0
  $.get("http://172.21.137.143:5001/api/v1/status/", function(data, textStatus) {
    if (data.status === 'OK') {
      $('header #api_status').addClass('available')
    } else {
      $('header #api_status').removeClass('available')
    }
  });
  // later to be replaced by http://0.0.0.0
  $.post("http://172.21.137.143:5001/api/v1/places_search/", '{}', function(data, textStatus) {
    render(data, textStatus);
  });
  $('button[type="button"]').on("click", function(e) {
    // later to be replaced by http://0.0.0.0
    $.post("http://172.21.137.143:5001/api/v1/places_search/", JSON.stringify({
        "amenities": Object.keys(amenities),
        "cities": Object.keys(cities),
        "states": Object.keys(states)
      }),
      function(data, textStatus) {
        $('section.places').html("")
        render(data, textStatus);
    })
  });
});
