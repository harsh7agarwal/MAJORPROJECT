// Check if mapToken is available
const mapToken = window.mapToken;
console.log("MapToken received:", mapToken);


if (mapToken && mapToken !== 'undefined' && mapToken !== '') {
    mapboxgl.accessToken = mapToken;
    
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: listing.geometry.coordinates, // [lng, lat]
        zoom: 9
    });

    // Add a marker to the map
    const marker = new mapboxgl.Marker({
        color: 'red',
    })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${listing.location}</h3><p>This is where the listing is located.</p>`
    )
)
    .addTo(map);

} else {
    // Show error message if no token
    document.getElementById('map').innerHTML = '<div style="padding: 20px; text-align: center; background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;"><p>Map not available. Please configure MAP_TOKEN in your .env file.</p><p>Current token: ' + mapToken + '</p></div>';
}