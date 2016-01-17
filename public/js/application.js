$(document).ready(function() {


  initMap();
});


function initMap(clinicObj){
  var mapCanvas = document.getElementById('map');

  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(37.09024, -95.712891),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

  getAllClinicsInfo();

  function createMarker(clinicObj){
    var clinicLoc = { lat: clinicObj.lat, lng: clinicObj.lng };
    var marker = new google.maps.Marker({
      position: clinicLoc,
      map: map,
      title: clinicObj.name,
    });
  }

  function getAllClinicsInfo(){
    $.get("/clinicsLocations", function(response){
      arrayClinicObjects = jQuery.parseJSON(response);
      var clinicCount = arrayClinicObjects.length;
      // console.log(clinicCount);

      for (var i=0; i < clinicCount; i++){
        if ((arrayClinicObjects[i].lat)&&(arrayClinicObjects[i].lng)){
          console.log("INSIDE IF");

          arrayClinicObjects[i].lat = parseFloat(arrayClinicObjects[i].lat)

          arrayClinicObjects[i].lng = parseFloat(arrayClinicObjects[i].lng)
          // console.log(arrayClinicObjects[i]);
          createMarker(arrayClinicObjects[i]);
        }
        else {
          console.log("INSIDE ELSE");
          latLngData(arrayClinicObjects[i]);
        }

      }
    });
  }

  function clinicNameAndAddress(id){
    $.ajax({
      type: 'GET',
      url: "/clinics/"+id+"/data"
    })
    .done(function(response){
      // console.log(response);
      var clinicObj = jQuery.parseJSON(response);
      // console.log(clinicObj);

    })
    .fail(function(xhr,unknown,error){
      alert(error);
    });
  }

  function latLngData(clinicObj){
    $.ajax({
      type: 'GET',
      url: "/geolocate/"+clinicObj.name+"/"+clinicObj.full_address,
    })
    .done(function(response){
      console.log("latLngData RESPONSE");
    // console.log(response);
    var parsedGeoResponse = jQuery.parseJSON(response);
    clinicObj.lat = parsedGeoResponse.results[0].geometry.location.lat;
    clinicObj.lng = parsedGeoResponse.results[0].geometry.location.lng;
    saveLatLngData(clinicObj);
  })
    .fail(function(xhr,unknown,error){
      alert(error);
    });
  }

  function saveLatLngData(clinicObj){
    clinicInfo = {};
    clinicInfo.id = clinicObj.id;
    clinicInfo.lat = clinicObj.lat;
    clinicInfo.lng = clinicObj.lng;
    $.ajax({
      type: 'PUT',
      url: "/saveLatLng/"+clinicInfo.id+"/"+clinicInfo.lat+"/"+clinicInfo.lng
    })
    .done(function(response){
      console.log("saveLatLngData RESPONSE");
      console.log(response);
      createMarker(clinicObj);
    })
    .fail(function(xhr,unknown,error){
      alert(error);
    });

  }


}





// "2016-01-16 23:59:35.278558"







