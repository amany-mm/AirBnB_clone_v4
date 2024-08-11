$(document).ready(initialize);

function initialize() {
    const amenity = {};

    $('.amenities .popover input').change(function () {
        if ($(this).is(':checked')) {
            amenity[$(this).attr('data-name')] = $(this).attr('data-id');

        } else if ($(this).is(':not(:checked)')) {
            delete amenity[$(this).attr('data-name')];
        }

        const amenities = Object.keys(amenity);
        $('.amenities h4').text(amenities.sort().join(', '));
    });
}
