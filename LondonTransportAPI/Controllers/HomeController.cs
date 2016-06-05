using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
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
        private BikeRequestBuilder bikeRequestBuilder;
        private IRequestExecutor requestExecutor;

        public HomeController(IRequestExecutor executor)
        {
            requestExecutor = executor;
            bikeRequestBuilder = new BikeRequestBuilder();
        }

        //
        // GET: /Home/

        public ActionResult Index()
        {
            try
            {
                string req = requestExecutor.Execute(bikeRequestBuilder.GetAllBikePoints());
            
                JavaScriptSerializer serializer = new JavaScriptSerializer();

            
                var obj = serializer.Deserialize<BikePoint[]>(req);
                var res = obj.Take(6).ToList();
                //var s = res.TakeWhile(x => x.id != "").ToList();
                ViewBag.result = res;
            }
            catch (Exception)
            {
                throw;
            }

            

            return View();
        }

    }
}
