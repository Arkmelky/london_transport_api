using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LondonTransportAPI.RequestBuilders
{
    public class BikeRequestBuilder
    {
        private const string Https = "https://";
        //Gets all bike points locations
        public string GetAllBikePoints()
        {
            return String.Format("{0}api.tfl.gov.uk/BikePoint?app_id=&app_key=", Https);
        }

        //Gets the bike point with the given id.
        public string GetBikePointById(string id)
        {
            return String.Format("{0}api.tfl.gov.uk/BikePoint/{1}?app_id=&app_key= ", Https, id);
        }

        //Gets the bike points that lie within the bounding box defined by the lat/lon of its north-west and south-east corners.
        public string GetBikePointsByLatLonNorthWestSouthEastCorners(double swLat,double swLon,double neLat,double neLon)
        {
            return String.Format("{0}api.tfl.gov.uk/BikePoint?swLat={1}&swLon={2}&neLat={3}&neLon={4}&app_id=&app_key=", Https, swLat, swLon, neLat, neLon);
        }

        //Gets the bike points that lie within the locus defined by the lat/lon of its centre and a radius in metres.
        public string GetBikePointsByRadius(double lat, double lon, int rad)
        {
            return String.Format("{0}api.tfl.gov.uk/BikePoint?lat={1}&lon={2}&radius={3}&app_id=&app_key=", Https, lat, lon, rad);
        }

        //Search for bike stations by their name, a bike points name contains location information
        public string GetBikePointsByName(string name)
        {
            return String.Format("{0}api.tfl.gov.uk/BikePoint/Search?query={1}&app_id=&app_key=", Https, name);
        }
    }
}