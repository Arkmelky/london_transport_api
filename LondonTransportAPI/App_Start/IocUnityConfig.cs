using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LondonTransportAPI.Infrastructure;
using LondonTransportAPI.RequestExecutors;
using Microsoft.Practices.Unity;


namespace LondonTransportAPI
{
    public static class IocUnityConfig
    {
        public static void ConfigureUnityContainer()
        {
            IUnityContainer unityContainer = new UnityContainer();

            DiBindings(unityContainer);

            DependencyResolver.SetResolver(new UnityDependencyResolver(unityContainer));
        }

        private static void DiBindings(IUnityContainer unity)
        {
            unity.RegisterType<IRequestExecutor, HttpRequestExecutor>();
            //unity.RegisterType<HomeController>(new InjectionConstructor(new HttpRequestExecutor()));
        }
    }
}