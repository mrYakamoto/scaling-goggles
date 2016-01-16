$(document).ready(function() {


clinicNameAndAddress(1);
});




function initMap(clinicObj){
  var mapCanvas = document.getElementById('map');

  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(37.09024, -95.712891),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

  // var numClinics = numOfCpcs();
  // for (var i = 1; i <= numClinics; i++ ){
  //   clinicObject = clinicNameAndAddress();
  // }

  var marker = new google.maps.Marker({
    position: {lat: clinicObj.lat, lng: clinicObj.lng},
    map: map,
    title: clinicObj.name,
  });
  // console.log(marker);
}

function createMarker(clinicObjWithLatLng){
  var marker = new google.maps.Marker({
    position: {lat: clinicObjWithLatLng.lat, lng: clinicObjWithLatLng.lng},
    map: map,
    title: clinicObjWithLatLng.name,
  });
  console.log("CREATE_MARKER");
  console.log(marker);
  initMap(marker);
  // initMap(marker);
}

function latLngData(clinicObj){
    $.ajax({
      type: 'GET',
      url: "/geolocate/"+clinicObj.name+"/"+clinicObj.full_address,
    })
    .done(function(response){
      alert(response);
      var parsedGeoResponse = jQuery.parseJSON(response);
      alert(parsedGeoResponse);
      clinicObj.lat = parsedGeoResponse.results[0].geometry.location.lat;
      clinicObj.lng = parsedGeoResponse.results[0].geometry.location.lng;
      console.log("LAT_LNG_DATA");
      console.log(clinicObj.lat);
      console.log(clinicObj.lng);
      initMap(clinicObj);
    })
    .fail(function(xhr,unknown,error){
      alert(error);
    });
}

function clinicNameAndAddress(id){
  $.ajax({
    type: 'GET',
    url: "/clinics/"+id+"/data"
  })
  .done(function(response){
    alert(response);
    var clinicObj = jQuery.parseJSON(response);
    alert(clinicObj);
    latLngData(clinicObj);
    // createMarker(clinicObjWithLatLng);
      // console.log("CLINIC_NAME_AND_ADDRESS");
      // console.log(clinicObj.name);
      // console.log(clinicObj.full_address);

    // return clinicObj;
  })
  .fail(function(xhr,unknown,error){
    alert(error);
  });
}

function numOfCpcs(){
  $.ajax({
    type: 'GET',
    url: '/numbercpcs'
  })
  .done(function(response){
    alert(response);
    return response;
  })
  .fail(function(xhr,unknown,error){
    alert(error);
  });
}





