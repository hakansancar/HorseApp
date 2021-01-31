using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace HorsePro.Services
{
    public class RestService
    {
        public string httpRequestService(string json, string transactionType, string reqType, string parameter)
        {
            string result;

            if (reqType == "POST")
            {
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://40.114.24.252:3000/api/" + transactionType);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = reqType;

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    streamWriter.Write(json);
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }
            }
            else
            {
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://40.114.24.252:3000/api/" + transactionType + "/" +parameter);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = reqType;

                var httpResponseQR = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponseQR.GetResponseStream()))
                {
                    var resultQR = streamReader.ReadToEnd();
                    result = resultQR;
                }
            }


            return result;


        }


    }

}