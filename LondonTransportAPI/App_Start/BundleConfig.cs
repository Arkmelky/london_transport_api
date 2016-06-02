using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;


namespace LondonTransportAPI
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.min.js"));
            
            bundles.Add(new StyleBundle("~/bundles/bootstrap").Include(
                "~/Content/bootstrap.min.css",
                "~/Content/bootstrap-theme.min.css"));
        }
    }
}