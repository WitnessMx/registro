var map = L.map('mapa', {
    crs: L.CRS.Simple,
    zoom:0,
    minZoom: -4,
    maxZoom:5
    //layers:[controladores]
    });

    var yx = L.latLng;

var xy = function(x, y) {
if (L.Util.isArray(x)) {    // When doing xy([x, y]);
    return yx(x[1], x[0]);
}
return yx(y, x);  // When doing xy(x, y);
};

var src= 'styles/imagenes/Layout_010221_01.png';

var bounds = [xy(0, 0), xy(1115, 1723)];
var opacidad=0.3;
var image = L.imageOverlay(src, bounds).addTo(map);


//click en el mapa muestra posicion de mouse
var con=document.getElementsByClassName('leaflet-popup-content-wrapper');
//con[0].attributes[1].value="width:200px"

var popup = L.popup();
function onMapClick(e) {
popup	
    .setLatLng({lat:e.latlng.lat,lng:e.latlng.lng})
    .setContent("<div style='padding:0px;text-align:center;'><font size='3' color='blue'>[X " + popup._latlng.lng.toFixed(2) + ", Y " + popup._latlng.lat.toFixed(2)+ "]</font></div>")
    .openOn(map);
    //con[0].style.width="180px"
    document.getElementById('x').value=popup._latlng.lng.toFixed(3);
    document.getElementById('y').value=popup._latlng.lat.toFixed(3);
}

map.on('click', onMapClick);
//+++++++++++++++++++++++++++++++
map.setView(xy(500, 850), -1);




    

