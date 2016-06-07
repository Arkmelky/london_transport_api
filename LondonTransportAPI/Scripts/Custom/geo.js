//////////////////////////////////////////////////////////////////////////////////
//
//
//   GoogleMap Geo 
//
//

// address-result-container
var resultContainerOpen = '<div class="addresses-results-container">';
var resultContainerClose = '</div>';
//END

//address-results-info-message _error
var addressResInfoMessOpen = '<div class="address-results-info-message {status} ">';
var addressResInfoMessClose = '</div>';
//END

//address-results-items
var addressResItemsOpen = '<div class="address-results-items thumbnail" style="display:none;">';
var addressResItemsClose = '</div>';
//END

//address-item
var addressItemOpen = '<div lat="{lat}" lon="{lon}" class="address-item list-group-item">';
var addressItemClose = '</div>';
//END


var addressFromForm = ""; //
var getAddressesByGoogle = "https://maps.googleapis.com/maps/api/geocode/json?address=";

var actionUrl; // Action URL 
var resultPlaces; // List of addresses
var resultMessageInfo; // Info message - address-results-info-message block
var resultMessageStatus; // Contain background name (bg-info or bg-danger or bg-success) will be replaced with {status}

var currLat = 0;
var currLon = 0;
var currRad = 0;
var currPlaceName = "";


$(document).ready(function () {
    // form#search handler - try to get addresses by place name
    $("form#search").submit(function (e) {
        e.preventDefault();

        var input = $(this).find("input[name=address]");
        addressFromForm = input.val();

        currRad = $(this).find("select[name=meters] option:selected").val();
        if (isNaN(currRad)) {
            currRad = 500;
        }
        actionUrl = $(this).attr("action");

        console.log(currRad);

        if (addressFromForm == "" || addressFromForm == undefined) {

            resultMessageInfo = "Error. Empty field.";
            resultMessageStatus = "bg-danger";

            resultPlaces = null;
            addressFromForm = null;

            setOnlyMessage();
            return;
        }

        var url = getAddressesByGoogle + addressFromForm;

        $.ajax({
            method: "GET",
            url: url
        }).done(function (data) {

            resultPlaces = data.results;

            if (resultPlaces.length > 0) {
                if (resultPlaces.length > 1) {
                    //More then one result
                    resultMessageInfo = "More then one result. Choose yours.";
                    resultMessageStatus = "bg-info";
                } else {
                    //One result
                    resultMessageInfo = "One result";
                    resultMessageStatus = "bg-success";

                    setAddressResultsContainer();
                    $("div.address-results-items").show(400);

                    registrateListeners();
                    $("div.address-item").click();
                    return;
                }
            } else {
                //No results
                resultMessageInfo = "No result.Try again.";
                resultMessageStatus = "bg-danger";

                setOnlyMessage();
                return;
            }

            setAddressResultsContainer();
            $("div.address-results-items").show(400);

            registrateListeners();
        });

    });

});

//
//registrate address-item click event after updating addresses-results-container block
function registrateListeners() {

    
    

    $("div.address-item").click(function () {

        $(this).addClass("selected");
        currLat = $(this).attr("lat");
        currLon = $(this).attr("lon");
        currPlaceName = $(this).text();

        var base = window.location.origin;
        var url = base + actionUrl;

        $("div.address-item").not("div.address-item.selected").hide();

        console.log(currLat, currLon, currRad);

        deleteAllMarkers();
        var markerMe = getNewMarker(currLat, currLon, "You", "You");
        addMarkerToList(markerMe);

        getBikePointsByRadius(currLat, currLon, currRad, url);

    });
}

//parse response to JSON and set result to var resultPlaces
function parseAddressesToJson(data) {
    resultPlaces = JSON.parse(data);
}
//when have no result set this stuff as address-results-container block
function setOnlyMessage() {
    var result = "";
    result += resultContainerOpen;
    result += addressInfoMessageToHtml();
    result += resultContainerClose;
    $("div.addresses-results-container").replaceWith(result);
}

//build and set address-results-container 
function setAddressResultsContainer() {
    var result = "";
    result += resultContainerOpen;
    result += addressInfoMessageToHtml();
    result += addressListToHtml();
    result += resultContainerClose;
    $("div.addresses-results-container").replaceWith(result);
}

//build address-results-info-message HTML block
function addressInfoMessageToHtml() {
    var result = "";
    result += addressResInfoMessOpen.replace("{status}", resultMessageStatus);
    result += resultMessageInfo;
    result += addressResInfoMessClose;
    return result;
}

//build address-results-items HTML block (contain list of addresses)
function addressListToHtml() {

    var result = "";
    result += addressResItemsOpen;
    for (var i = 0; i < resultPlaces.length; i++) {
        result += addressItemToHtml(resultPlaces[i]);
    }
    result += addressResItemsClose;
    return result;
}

//build address-item HTML block
function addressItemToHtml(address) {
    var result = "";
    result += addressItemOpen.replace("{lat}", address.geometry.location.lat).replace("{lon}", address.geometry.location.lng);
    result += address.formatted_address;
    result += addressItemClose;
    return result;
}


/*
{  
   "results":[  
      {  },
      {  
         "address_components":[  
            {  
               "long_name":"Милуолл",
               "short_name":"Милуолл",
               "types":[  
                  "neighborhood",
                  "political"
               ]
            },
            {  
               "long_name":"Лондон",
               "short_name":"Лондон",
               "types":[  
                  "locality",
                  "political"
               ]
            },
            {  
               "long_name":"Лондон",
               "short_name":"Лондон",
               "types":[  
                  "postal_town"
               ]
            },
            {  
               "long_name":"Тауэр-Хамлетс",
               "short_name":"Тауэр-Хамлетс",
               "types":[  
                  "administrative_area_level_3",
                  "political"
               ]
            },
            {  
               "long_name":"Большой Лондон",
               "short_name":"Большой Лондон",
               "types":[  
                  "administrative_area_level_2",
                  "political"
               ]
            },
            {  
               "long_name":"Англия",
               "short_name":"Англия",
               "types":[  
                  "administrative_area_level_1",
                  "political"
               ]
            },
            {  
               "long_name":"Великобритания",
               "short_name":"GB",
               "types":[  
                  "country",
                  "political"
               ]
            },
            {  
               "long_name":"E14",
               "short_name":"E14",
               "types":[  
                  "postal_code_prefix",
                  "postal_code"
               ]
            }
         ],
         "formatted_address":"Милуолл, Лондон E14, Великобритания",
         "geometry":{  
            "location":{  
               "lat":51.49767,
               "lng":-0.020534
            },
            "location_type":"APPROXIMATE",
            "viewport":{  
               "northeast":{  
                  "lat":51.4990189802915,
                  "lng":-0.01918501970849797
               },
               "southwest":{  
                  "lat":51.4963210197085,
                  "lng":-0.02188298029150203
               }
            }
         },
         "place_id":"ChIJHRsfHr8CdkgRe8Jo3Y9lCVg",
         "types":[  
            "neighborhood",
            "political"
         ]
      }
   ],
   "status":"OK"
}*/