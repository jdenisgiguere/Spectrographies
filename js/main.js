$(function() {

//var mapZentoken = L.Mapzen.apiKey = 'mapzen-3CAQoBZ'

/*
var map = L.Mapzen.map('map', {
  center: [45.5237019,-73.6197287],
  zoom: 15,
  minZoom:10,
  maxZoom: 18,
  tangramOptions: {
    scene: {
      import: [
        'https://mapzen.com/carto/refill-style/8/refill-style.zip',
        'https://mapzen.com/carto/refill-style/8/themes/color-pink.zip'
      ] } }
});*/



var map = L.map('map', {
          zoomControl: true}).setView([45.5314, -73.6750], 9);



var mapBoxWhite = L.tileLayer('https://api.mapbox.com/styles/v1/clementg123/cj66rikp37hgc2rltvyo7eepa/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xlbWVudGcxMjMiLCJhIjoiY2o2M3ZhODh3MWxwNDJxbnJnaGZxcWNoMiJ9.YroDniTcealGFJgHtQ2hDg')
var mapBoxCyber = L.tileLayer('https://api.mapbox.com/styles/v1/clementg123/cj6guz4ve3stv2rp4y9ftqbti/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xlbWVudGcxMjMiLCJhIjoiY2o2M3ZhODh3MWxwNDJxbnJnaGZxcWNoMiJ9.YroDniTcealGFJgHtQ2hDg')
var mapBoxDark =  L.tileLayer('https://api.mapbox.com/styles/v1/clementg123/cj66v7isf7jji2soaolfu28sy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xlbWVudGcxMjMiLCJhIjoiY2o2M3ZhODh3MWxwNDJxbnJnaGZxcWNoMiJ9.YroDniTcealGFJgHtQ2hDg')
var stamenToner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 18,
  ext: 'png'
}).addTo(map)



function toggleLayer() {
 var baseMaps = {
  'mapBoxWhite ': mapBoxWhite,
  'mapBoxDark  ': mapBoxDark,
  'mapBoxCyber ': mapBoxCyber,
  'stamenToner ': stamenToner
  
 };

 L.control.layers(baseMaps).addTo(map);
}
toggleLayer();


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


///////// START Bind tout le data dans le pop up /////////
    var popupContent = '<div id="popUpOpen"><a href="#" id="titrePopUp"><h2>'

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
      '&amp;count=horizontal"   style="width:110px; height:20px;"></iframe></div>'

     layer.bindPopup(popupContent) .on('popupopen', function (e) {

       var h2 = document.getElementById('titrePopUp');
       var img = document.getElementById('myImg');
       var modal = document.getElementById('myModal');
       var captionText = document.getElementById("caption");
       var carouselDiv = document.getElementById("carousel-inner");

       // Fonction pour creer le contenu du modal //
       img.onclick = function () {
         map.closePopup();
         modal.style.display = "block";
         captionText.innerHTML = img.alt
         var feature_photos_url = e.popup._source.feature.properties.photos_url;

         var feature_photos_uuid = photos_uuid(feature_photos_url);

         carouselDiv.innerHTML = divsFromPhotosUrl(feature_photos_url);

         // Fonction pour fermer le modal //
         $(".close").bind("click", function(e) {
           $('#myModal').css('display', 'none') ;
         });

       };
     });

    
    } ///////// END Bind tout le data dans le pop up /////////



});  //end marker



var introMarker = L.geoJSON();
var pseudoData = []
var typeData = []
var genreData = []
var titreData = []
var typeAutreData =[]
var genreAutreData = []



marker.eachLayer(function(layer) {
  
  pseudoData.push(layer.feature.properties.pseudo)
  typeData.push(layer.feature.properties.type.split(','))
  genreData.push(layer.feature.properties.genre.split(',')) 
  titreData.push(layer.feature.properties.titre)
  typeAutreData.push(layer.feature.properties.type_other.split(','))
  genreAutreData.push(layer.feature.properties.genre_other.split(','))
});


//////Merging the Two Dimentional Arrays///////////
var genreMerged = [].concat.apply([], genreData);
var typeMerged = [].concat.apply([], typeData);
var typeAD = [].concat.apply([], genreAutreData);
var genreAD = [].concat.apply([], typeAutreData);

/////////////////////////////////////////////////

////Function that delete empty values////
temp = [];

for(let i of genreAD)
    i && temp.push(i); // copy each non-empty value to the 'temp' array

genreAD = temp;
delete temp

////////////////////////////////////////

////Function that delete empty values////
temp = [];

for(let i of typeAD)
    i && temp.push(i); // copy each non-empty value to the 'temp' array

typeAD = temp;
delete temp

////////////////////////////////////////


/////////Function that merge others//////////

genreMerged.push.apply(genreMerged, genreAD)
typeMerged.push.apply(typeMerged, typeAD)


//////////////////////////////////////////



Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}

///creation de la searchbox//



 function pBox() {
  $('#participantBox').select2(
   {data: pseudoData,
    allowClear:true,
    placeholder:'Chercher un participant'
          })
 } pBox()

function tBox() {
  $('#typeBox').select2(
   {data: typeMerged.unique(),
    allowClear:true
     })
 } tBox()

 function gBox() {
  $('#genreBox').select2(
   {data: genreMerged.unique(),
    allowClear:true

     })
 }gBox()

 function titBox() {
  $('#titreBox').select2(
   {
     data: titreData,
     allowClear:true,
     placeholder:'Chercher un titre'
     })
 }titBox()


//return _filteredMarker.addTo(map)
markerCluster.addLayer(marker)
group.addLayer(marker)
map.addLayer(markerCluster)  
//map.fitBounds(marker.getBounds())


   });
} //////////////////////////// end of getGEOJson ///////////////////////////////////

getGeoJSON()

//////////////////////////// Filter Function ///////////////////////////////////
function getFilterGeoJSON(value) {
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
filteredMarker = new L.geoJSON(markers,
{

pointToLayer: function(feature, latlng) {

     var customMarker = new L.ExtraMarkers.icon(
     {
          icon: 'glyphicon-eye-open',
          markerColor: 'yellow',
          shape: 'penta',
          prefix: 'glyphicon'
        });

        return L.marker(latlng, {icon:customMarker})       
      },


filter: function(feature, layer) {
console.log(value)

  
  if (feature.properties.pseudo == value) {return feature.properties.pseudo = value}
  else if (feature.properties.type == value) { return feature.properties.type = value}
  else if (feature.properties.genre == value) { return feature.properties.genre = value }
  else if (feature.properties.titre == value) { return feature.properties.titre = value}
  else if (feature.properties.type_other == value) { return feature.properties.type_other = value}
  else if (feature.properties.genre_other == value) { return feature.properties.genre_other == value}
      
    },

  onEachFeature: function(feature, layer) {

// Fonction qui récupère le UUID de chaque photos





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
       '&amp;count=horizontal"   style="width:110px; height:20px;"></iframe>'); ///////// END Bind tout le data dans le pop up /////////

    
    } // End of onEachFeature





  }); // End of L.GeoJSON instantiating filteredMarker;

//////////////////////

map.removeLayer(markerCluster)
//group.addLayer(filteredMarker)
map.addLayer(filteredMarker)  
map.flyToBounds(filteredMarker.getBounds())
   
}
)}



// Click outside the header info div collapse //

$(document).click(function(e) {
    if (!$(e.target).is('a')) {
        $('.collapse').collapse('hide');        
    }
});

$("#participantBox").on("select2:select", function(e) {

 value = $(e.currentTarget).val();
 
getFilterGeoJSON(value)

});

$("#participantBox").on("select2:unselect", function(e) {

 map.removeLayer(filteredMarker)
 map.addLayer(marker)
 map.flyToBounds(marker.getBounds())

});

$("#typeBox").on("select2:select", function(e) {

 value = $(e.currentTarget).find("option:selected").val();
  console.log(value)
  getFilterGeoJSON(value)

});

$("#typeBox").on("select2:unselect", function(e) {

map.removeLayer(filteredMarker)
 map.addLayer(marker)
 map.flyToBounds(marker.getBounds())

});


$("#genreBox").on("select2:select", function(e) {

 value = $(e.currentTarget).find("option:selected").val();
 console.log(value)
 getFilterGeoJSON(value)

});

$("#genreBox").on("select2:unselect", function(e) {

 value = $(e.currentTarget).val();
 
 map.removeLayer(filteredMarker)
 map.addLayer(marker)
 map.flyToBounds(marker.getBounds())

});

$("#titreBox").on("select2:select", function(e) {

 value = $(e.currentTarget).val();
 
getFilterGeoJSON(value)

});

$("#titreBox").on("select2:unselect", function(e) {

 map.removeLayer(filteredMarker)
 map.addLayer(marker)
 map.flyToBounds(marker.getBounds())

});

});


/**
 * Get a search parameter by its name
 * https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 *
 * @param name :  string Name of the parameters
 * @param url : string URL to parse
 * @returns {*}
 */
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Array of the photos associated to the photos url
 *
 * @param photos_url
 * @returns {Array|*}
 */
function photos_uuid(photos_url) {
  return getParameterByName('photos', photos_url).split(',');
}

/**
 * Create a string representing the div for every photos from a photo url
 * @param photos_url
 * @returns {string}
 */
function divsFromPhotosUrl(photos_url) {
  var baseURL = "https://web.fulcrumapp.com/shares/3a4bbd0435c58166/photos/"
  var photos = photos_uuid(photos_url);
  var divsAsText = '';
  var currentDiv;
  for (var i = 0; i < photos.length; i++) {
    if (i == 0) {
      currentDiv = '<div class="item active"><img src="' + baseURL + photos[i] + '" id="img' + i + '" ></div>';
    } else {
      currentDiv = '<div class="item"><img src="' + baseURL + photos[i] + '" id="img' + i + '" ></div>';
    }

    divsAsText = divsAsText + currentDiv;
  }

  return divsAsText;
}

