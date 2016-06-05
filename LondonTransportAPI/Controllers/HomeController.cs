using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using LondonTransportAPI.Models.BikePoint;
using LondonTransportAPI.RequestBuilders;
using LondonTransportAPI.RequestExecutors;
using Newtonsoft.Json.Linq;

namespace LondonTransportAPI.Controllers
{
    public class HomeController : Controller
    {
        private string cacheKey = "bikePoints";
        private readonly BikeRequestBuilder _bikeRequestBuilder;
        private readonly IRequestExecutor _requestExecutor;

        public HomeController(IRequestExecutor executor)
        {
            _requestExecutor = executor;
            _bikeRequestBuilder = new BikeRequestBuilder();
        }

        //
        // GET: /Home/

        public ActionResult Index()
        {
            List<BikePoint> bikePoints;
            object cacheItem = HttpContext.Cache.Get(cacheKey);
             

            if (cacheItem == null)
            {
                bikePoints = SetOrUpdateBikePointsInCache();
            }
            else
            {
                bikePoints = cacheItem as List<BikePoint>;
            }

            var res = bikePoints.Take(6).ToList();
            ViewBag.result = res;
            
            return View();
        }


        
        private List<BikePoint> SetOrUpdateBikePointsInCache()
        {
            List<BikePoint> bikePoints;

            try
            {
                string req = _requestExecutor.Execute(_bikeRequestBuilder.GetAllBikePoints());

                JavaScriptSerializer serializer = new JavaScriptSerializer();

                bikePoints = serializer.Deserialize<BikePoint[]>(req).ToList();
                HttpContext.Cache.Insert(cacheKey, bikePoints);
            }
            catch (Exception)
            {
                throw;
            }

            return bikePoints;
        }

    }
}
