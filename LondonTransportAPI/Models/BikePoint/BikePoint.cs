using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace LondonTransportAPI.Models.BikePoint
{
    [Serializable]
    public class BikePoint
    {
        public string id { get; set; }
        public string url { get; set; }
        public string commonName { get; set; }
        public string placeType { get; set; }

        public AdditionalProperty[] additionalProperties { get; set; }

        //public string children { get; set; }
        //public string childrenUrls { get; set; }
        public string lat { get; set; }
        public string lon { get; set; }
    }
}