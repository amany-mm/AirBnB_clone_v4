$(document).ready(initialize);
const amenity = {};
const state = {};
const city = {};
let all = {};

function initialize() {
    $('.amenities .popover input').change(function () { all = amenity; checked.call(this, 1); });
    $('.state_input').change(function () { all = state; checked.call(this, 2); });
    $('.city_input').change(function () { all = city; checked.call(this, 3); });
    apiStatus();
    fetchPlaces();
}

function checked(nObject) {
    if ($(this).is(':checked')) {
        all[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
        delete all[$(this).attr('data-name')];
    }
    const classes = Object.keys(all);
    if (nObject === 1) {
        $('.amenities h4').text(classes.sort().join(', '));
    } else if (nObject === 2) {
        $('.locations h4').text(classes.sort().join(', '));
    }
}

function apiStatus() {
    $.get('http://0.0.0.0:5001/api/v1/status/', (data, textStatus) => {
        if (textStatus === 'success' && data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
}

function fetchPlaces() {
    const PLACE_URL = 'http://0.0.0.0:5001/api/v1/places_search/';
    $.ajax({
        url: PLACE_URL,
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
            amenities: Object.values(amenity),
            states: Object.values(state),
            cities: Object.values(city)
        }),
        success: function (response) {
            $('SECTION.places').empty();
            for (const content of response) {
                const data = ['<article>',
                    '<div class="title_box">',
                    `<h2>${content.name}</h2>`,
                    `<div class="price_by_night">$${content.price_by_night}</div>`,
                    '</div>',
                    '<div class="information">',
                    `<div class="max_guest">${content.max_guest} Guest(s)</div>`,
                    `<div class="number_rooms">${content.number_rooms} Bedroom(s)</div>`,
                    `<div class="number_bathrooms">${content.number_bathrooms} Bathroom(s)</div>`,
                    '</div>',
                    '<div class="description">',
                    `${content.description}`,
                    '</div>',
                    '</article>'];
                $('SECTION.places').append(data.join(''));
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
