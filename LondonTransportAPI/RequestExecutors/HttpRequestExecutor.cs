using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace LondonTransportAPI.RequestExecutors
{
    public interface IRequestExecutor
    {
        string Execute(string req);
    }

    public class HttpRequestExecutor : IRequestExecutor
    {
        public string Execute(string request)
        {
            string response;

            try
            {
                var httpWebRequest = (HttpWebRequest)HttpWebRequest.Create(request);
                var httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();

                using (var streamReader = new StreamReader(httpWebResponse.GetResponseStream(), Encoding.UTF8))
                {
                    response = streamReader.ReadToEnd();
                }

            }
            catch (Exception e)
            {

                throw;
            }

            return response;
        }
    }
}