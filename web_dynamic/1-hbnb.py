<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>AirBnB clone</title>
    <link type="text/css" rel="stylesheet" href="../static/styles/4-common.css?{{ cache_id }}">
    <link type="text/css" rel="stylesheet" href="../static/styles/3-header.css?{{ cache_id }}">
    <link type="text/css" rel="stylesheet" href="../static/styles/3-footer.css?{{ cache_id }}">
    <link type="text/css" rel="stylesheet" href="../static/styles/6-filters.css?{{ cache_id }}">
	<link type="text/css" rel="stylesheet" href="../static/styles/8-places.css?{{ cache_id }}">
    <link rel="icon" href="../static/images/icon.png?{{ cache_id }}" type="image/png">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="../static/scripts/1-hbnb.js?{{ cache_id }}"></script>
  </head>
  <body>
    <header>
      <div class="logo"></div>
    </header>
    <div class="container">
      <section class="filters">
        <div class="locations">
          <h3>States</h3>
          <h4>&nbsp;</h4>
          <div class="popover">
            <ul>
              {% for state in states %}
              <li><strong>{{ state.name }}</strong>
                <ul>
                  {% for city in state.cities %}
                  <li>{{ city.name }}</li>
                  {% endfor %}
                </ul>
              </li>
              {% endfor %}
            </ul>
          </div>
        </div>
        <div class="amenities">
          <h3>Amenities</h3>
          <h4>&nbsp;</h4>
          <ul class="popover">
            {% for amenity in amenities %}
            <li>
              <input type="checkbox" data-id="{{ amenity.id }}" data-name="{{ amenity.name }}">
              {{ amenity.name }}
            </li>
            {% endfor %}
          </ul>
        </div>
        <button>Search</button>
      </section>
      <section class="places">
        <h1>Places</h1>
        <ul>
          {% for place in places %}
          <li>
            <div>
              <h2>{{ place.name }}</h2>
              <div class="price_by_night">${{ place.price_by_night }}</div>
            </div>
            <div>
              <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
              <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
              <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
            </div>
            <div class="user">
              <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
            </div>
            <div class="description">
              {{ place.description | safe }}
            </div>
          </li>
          {% endfor %}
        </ul>
      </section>
    </div>
    <footer>
      <strong>Holberton School</strong>
    </footer>
  </body>
</html>