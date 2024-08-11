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
    fetchReviews();
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
                $.get(`http://0.0.0.0:5001/api/v1/users/${content.user_id}`, (userData, textStatus) => {
                    if (textStatus === 'success') {
                        const username = userData.first_name + ' ' + userData.last_name;
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
                            '<div class="owner">',
                            `<strong> Owner: </strong>${username}`,
                            '</div><br>',
                            '<div class="description">',
                            `${content.description}`,
                            '</div>',
                            '<div class="reviews"><h2>',
                            `<span id="${content.id}n" class="treview">Reviews</span>`,
                            `<span id="${content.id}" onclick="fetchReviews(this)">Show</span></h2>`,
                            `<ul id="${content.id}r"></ul>`,
                            '</article>'];
                        $('SECTION.places').append(data.join(''));
                    }
                });
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function fetchReviews(all) {
    if (all === undefined) {
        return;
    }
    if (all.textContent === 'Show') {
        all.textContent = 'Hide';
        $.get(`http://0.0.0.0:5001/api/v1/places/${all.id}/reviews`, (data, textStatus) => {
            if (textStatus === 'success') {
                $(`#${all.id}n`).html(data.length + ' Reviews');
                for (const review of data) {
                    printReview(review, all);
                }
            }
        });
    } else {
        all.textContent = 'Show';
        $(`#${all.id}n`).html('Reviews');
        $(`#${all.id}r`).empty();
    }
}

function printReview(review, all) {
    const date = new Date(review.created_at);
    const month = date.toLocaleString('en', { month: 'long' });
    const day = dateOrdinal(date.getDate());

    if (review.user_id) {
        $.get(`http://0.0.0.0:5001/api/v1/users/${review.user_id}`, (data, textStatus) => {
            if (textStatus === 'success') {
                $(`#${all.id}r`).append(
                    `<li><h3>From ${data.first_name} ${data.last_name} the ${day + ' ' + month + ' ' + date.getFullYear()}</h3>
          <p>${review.text}</p>
          </li>`);
            }
        });
    }
}

function dateOrdinal(dom) {
    if (dom === 31 || dom === 21 || dom === 1) return dom + 'st';
    else if (dom === 22 || dom === 2) return dom + 'nd';
    else if (dom === 23 || dom === 3) return dom + 'rd';
    else return dom + 'th';
}
