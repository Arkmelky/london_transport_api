using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Services;
using LondonTransportAPI.Models.BikePoint;
using LondonTransportAPI.RequestBuilders;
using LondonTransportAPI.RequestExecutors;
using Newtonsoft.Json.Linq;

namespace LondonTransportAPI.Controllers
{
    public class HomeController : Controller
    {
        private int _itemsPerPage;
        private int _countPages;
        private const string CacheKey = "bikePoints";
        private readonly BikeRequestBuilder _bikeRequestBuilder;
        private readonly IRequestExecutor _requestExecutor;

        public HomeController(IRequestExecutor executor)
        {
            _requestExecutor = executor;
            _bikeRequestBuilder = new BikeRequestBuilder();
            _itemsPerPage = 6;
        }

        //
        // GET: /Home/

        public ActionResult Index()
        {
            var bikePointsList = GetBikePointsFromCache();
            var res = bikePointsList.Take(_itemsPerPage).ToList();
            ViewBag.result = res;
            ViewBag.totalPages = _countPages;
            
            return View();
        }

        [WebMethod]
        public string GetBikePoints(int pageNum = 1)
        {
            var bikePointsList = GetBikePointsFromCache();
            var res = bikePointsList.Skip(_itemsPerPage*(pageNum-1)).Take(_itemsPerPage).ToList();

            return new JavaScriptSerializer().Serialize(res);
        }



        private List<BikePoint> GetBikePointsFromCache()
        {
            List<BikePoint> bikePoints;
            object cacheItem = HttpContext.Cache.Get(CacheKey);
            if (cacheItem == null)
            {
                try
                {
                    string req = _requestExecutor.Execute(_bikeRequestBuilder.GetAllBikePoints());

                    JavaScriptSerializer serializer = new JavaScriptSerializer();

                    bikePoints = serializer.Deserialize<BikePoint[]>(req).ToList();
                    HttpContext.Cache.Insert(CacheKey, bikePoints);

                    //calc pages count
                    _countPages = bikePoints.Count / _itemsPerPage;
                    if (bikePoints.Count % _itemsPerPage > 0)
                    {
                        _countPages++;
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            else
            {
                bikePoints = cacheItem as List<BikePoint>;
            }

            return bikePoints;
        }

    }
}
