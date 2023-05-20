mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fua2V0MTIxMjEyIiwiYSI6ImNsaG5mMXg4MzBtNHUzam1ucnZha3h3eGIifQ.CKvZeRUIhLxNLLLJ5-hNcA';

    //  Creating map object and connecting it to div with id 'map'
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: post.coordinates,
    zoom: 1
});


    //create a class element of the marker and provide the properties in the CSS, do this step for custom marker
var el = document.createElement('div');
el.className = 'marker';

new mapboxgl.Marker(el)
.setLngLat(post.coordinates) //  This function take values in Longitude and Latitude format
.setPopup(new mapboxgl.Popup().setHTML(`Title : ${post.title} \n Place: ${post.location}`)) // add popup
.addTo(map);    //  Add marker on the map
    