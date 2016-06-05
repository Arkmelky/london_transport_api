using System;

namespace LondonTransportAPI.Models.BikePoint
{
    [Serializable]
    public class AdditionalProperty
    {
        public string category { get; set; }
        public string key { get; set; }
        public string sourceSystemKey { get; set; }
        public string value { get; set; }
        public string modified { get; set; }
    }
}