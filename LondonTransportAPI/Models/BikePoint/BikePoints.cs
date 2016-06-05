using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LondonTransportAPI.Models.BikePoint
{
    [Serializable]
    public class BikePoints
    {
        public List<BikePoint> BikePointsList { get; set; }
    }
}