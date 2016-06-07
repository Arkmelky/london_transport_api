//
// JS funstions for Home controller
//


// get "lat,lon,name" params from button "Show on map" 
// and call the function, for set a marker on map.
function showBikePoint(obj) {
    var lat = obj.getAttribute("lat");
    var lon = obj.getAttribute("lon");
    var name = obj.getAttribute("name");
    setMarkerOnMap(lat, lon, name);
}

//pagination handler
$(document).ready(function () {
    var paginationItems = $("ul.pagination > li");
    paginationItems.click(function () {

        $("ul.pagination > li.active").removeClass("active");
        $(this).addClass("active");

        var base = window.location.origin;
        var actionUrl = $(this).find("a").attr("link");
        var url = base + actionUrl;

        $.ajax({
            method: "GET",
            url: url
        }).done(function (data) {
            parseListOfBikePointsToHtml(data);
        });
    });

});


//------------- Markup handlers (from JSON to HTML) ----------------------


//bike-points-container
var containerOpen = '<div class="bike-points-container">';
var containerClose = "</div>";
//END

//bike-point-item
var itemOpen = '<div style="display:none;" class="col-xs-12 col-sm-6 col-md-4 bike-point-item"><div class="item thumbnail ">';
var itemClose = '</div></div>';
//END

//bike-point-item-prop
var propertyOpen = '<div>';
var propertyClose = '</div>';
//END

//label
var labelOpen = '<label>';
var labelClose = '</label>';
//END


//BikePoints JSON array to HTML
function parseListOfBikePointsToHtml(data) {
    var list = JSON.parse(data);
    var renderBikePoints="";
    renderBikePoints += containerOpen;
    
    for (var i = 0; i < list.length; i++) {
        renderBikePoints += bikePointToHtml(list[i]);
    }

    renderBikePoints += containerClose;
    $("div.bike-point-item").fadeOut(200, function () {
        $("div.bike-points-container").replaceWith(renderBikePoints);
        $("div.bike-point-item").fadeIn(200);
    });
    

}

//BikePoint object to HTML
function bikePointToHtml(bikePoint) {
    
    var result = "";

    result += itemOpen;
    result += propertyOpen;
    result += labelOpen + "Place:" + labelClose;
    result += bikePoint.commonName;
    result += propertyClose;

    for (var i = 0; i < bikePoint.additionalProperties.length; i++) {
        result += additionalPropToHtml(bikePoint.additionalProperties[i]);
    }

    result += buttonShowOnMapHtml(bikePoint.lat, bikePoint.lon, bikePoint.commonName);
    result += itemClose;

    return result;

}

//return additionalProp items as HTML(string)
function additionalPropToHtml(prop) {
    
    var result = "";
    switch (prop.key) {
        case "NbBikes":
            result += propertyOpen;
            result += labelOpen + "Number of bikes:" + labelClose;
            result += prop.value;
            result += propertyClose;
            break;
        case "NbEmptyDocks":
            result += propertyOpen;
            result += labelOpen + "Number of empty docks:" + labelClose;
            result += prop.value;
            result += propertyClose;
            break;
        case "NbDocks":
            result += propertyOpen;
            result += labelOpen + "Total number of docks:" + labelClose;
            result += prop.value;
            result += propertyClose;
            break;

        
    default:
    }
    return result;
}

//return button "Show on map" as HTML(string)
function buttonShowOnMapHtml(lat,lon,name) {
    return '<button name="'+ name +'" lat="'+ lat +'" lon="'+ lon +'" onclick="showBikePoint(this)" class="btn  btn-default" value="Show on map">Show on map</button>';
}