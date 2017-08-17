$(function() {



var map = L.map('map', {
          zoomControl: true}).setView([45.5314, -73.6750], 9);



var baseLayer1 = L.tileLayer('https://api.mapbox.com/styles/v1/clementg123/cj66rikp37hgc2rltvyo7eepa/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xlbWVudGcxMjMiLCJhIjoiY2o2M3ZhODh3MWxwNDJxbnJnaGZxcWNoMiJ9.YroDniTcealGFJgHtQ2hDg')

var baseLayer2 = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var markerCluster = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 50

});

var group = L.layerGroup();
var marker = L.geoJSON();

function getGeoJSON() {
$.when(
 $.getJSON('https://web.fulcrumapp.com/shares/3a4bbd0435c58166.geojson')).done(function(theGeoJSON) {

  (function removeNull(o) {
        for(var key in o) {
            if( null === o[key] ) o[key] = '';
            if ( typeof o[key] === 'object' ) removeNull(o[key]);
        }
     })(theGeoJSON);

markers = theGeoJSON.features;


/////  L.Geojson //////
marker = new L.geoJSON(markers, {

 
   pointToLayer: function(feature, latlng) {

     var customMarker = new L.ExtraMarkers.icon(
     {
          icon: 'glyphicon-eye-open',
          markerColor: 'cyan',
          shape: 'penta',
          prefix: 'glyphicon'
        });

        return L.marker(latlng, {icon:customMarker})       
      },


  onEachFeature: function(feature, layer) {

var baseURL = "https://web.fulcrumapp.com/shares/3a4bbd0435c58166/photos/"

// Fonction qui récupère le UUID de chaque photos


var x 

// Capture le pop up //
map.on('popupopen', function (e) {
                 
      var h2 = document.getElementById('titrePopUp');
      var img = document.getElementById('myImg');
      var modal = document.getElementById('myModal');
      var captionText = document.getElementById("caption");
      var carouselDiv = document.getElementById("carousel-inner")

    // Fonction pour creer le contenu du modal //
img.onclick = function(){ 
           map.closePopup();
           modal.style.display = "block";
           captionText.innerHTML = img.alt
           //carouselDiv.innerHTML = photoCount()
           var x= (e.popup._source.feature.properties.photos_url)
           var j
          function photos_uuid(j){
              j = x
              for(var i = 0; i < j.length; i++) {
            return x.substring(70).split('%2C')}
            }

          function test(){for(var i = 0; i < photos_uuid(j).length ; i++) {
           return carouselDiv.innerHTML = divsFromPhotosUrl(photos_uuid(x))
         }}
         console.log(test())
          test()

////////////////////////////////////////////////////


k = x

function divsFromPhotosUrl(k) {
 var photos = photos_uuid(k)
 var divsAsText = '';
 var currentDiv;
  for(var i = 0; i < photos.length ; i++) {
    currentDiv = '<div class="item active"><img src="'+baseURL+photos[i]+'" id="img0'+i+'" ></div>';
    divsAsText = divsAsText + currentDiv;
     return divsAsText;
   }}







    // Fonction pour fermer le modal //
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function() { 
      modal.style.display = "none";
      }
    }
});

///////// START Bind tout le data dans le pop up /////////

     layer.bindPopup(
     '<div id="popUpOpen"><a href="#" id="titrePopUp"><h2>'

     // Pop Up Content

       +feature.properties.titre
       +'</h2></a><h3 style="display:inline">'
       +feature.properties.genre
       +' & '
       +feature.properties.type
       +'</h3><h4> Par : '
       +feature.properties.pseudo


      // Modal Section Content //


         +'</h4><div id=&quot;attributeContainer&quot;>'
         // Image section
         +'<img class="img-thumbnail "id="myImg"'
         // Alt section with all the data for the modal popup
                 +' alt="<div><h2>'
                 +feature.properties.titre
                 +'</h2><br><h3 style=&quot;display: inline !important;&quot;> Genre : </h3><h4 style=&quot;display: inline !important;&quot;>'
                 +feature.properties.genre
                 +'</h4><br><br><h3 style=&quot;display: inline !important;&quot;> Type : </h3><h4 style=&quot;display: inline !important;&quot;>'
                 +feature.properties.type
                 +'</h4><br><h3> Contexte : </h3><p>'
                 +feature.properties.description_contexte
                 +'</p><div class=&quot;well&quot; style=&quot;margin-top:15px !important&quot;><div class=&quot;col-sm-8 well &quot; ><h3 style=&quot;display: inline !important;&quot;> Auteur : </h3><h4 style=&quot;display: inline !important;&quot;>'
                 +feature.properties.pseudo
                  // Autoportrait //
                 +'</h4></div><div class=&quot;col-sm-4 well&quot;><img  id=&quot;selfie&quot; class=&quot;img-thumbnail&quot; src=&quot;'
                 +feature.properties.autoportrait_url.replace('view?photos=','')
                 +'&quot;</img></div><div class=&quot;col well&quot;><h3> Relation au lieu : </h3><p>'
                 +feature.properties.relation_au_lieu_appartenance
                 +'</p></div></div></div>'
                 // Audio //
                 +'<div class=&quot;col  well&quot;>'
                 +'<audio controls controls controlsList=&quot;nodownload&quot;><source src=&quot;'
                 +feature.properties.audio_url.replace('view?audio=','')
                 //+feature.properties.audio_url.replace('view?audio=','')
                 +'&quot;</audio></div></div></div>'
                 // End of alt attribution
                 // Caroussel
         +'" src="'
         //+photosPreURL+first
         +feature.properties.photos_url.substring(0,106).replace('view?photos=','') 
         +'"></div></img>'   
        
    // Socials // 

      //Facbook
     +'<iframe src="https://www.facebook.com/plugins/share_button.php?href='
       + feature.properties.photos_url.replace('view?photos=','')
       +'&layout=button&size=small&mobile_iframe=false&width=59&height=20&appId" width="59" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'

       +'  '
      //Twitter 
       +'<iframe id="tweet-button" allowtransparency="true" frameborder="0" scrolling="no"  src="http://platform.twitter.com/widgets/tweet_button.html?url='
       +feature.properties.photos_url.replace('view?photos=','')+
       '&amp;count=horizontal"   style="width:110px; height:20px;"></iframe>')

    
    } ///////// END Bind tout le data dans le pop up /////////



});  //end _filtermarker

//return _filteredMarker.addTo(map)
markerCluster.addLayer(marker)
group.addLayer(marker)
map.addLayer(markerCluster)  
map.fitBounds(marker.getBounds())

   });
}

// Click outside the header info div collapse //

$(document).click(function(e) {
    if (!$(e.target).is('a')) {
        $('.collapse').collapse('hide');        
    }
});


getGeoJSON()

})