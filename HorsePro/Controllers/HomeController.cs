using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using HorsePro.Models;
using HorsePro.Services;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net;

namespace HorsePro.Controllers
{
    public class HomeController : Controller
    {
        private RestService horseRestService;

        public HomeController(ILogger<HomeController> logger)
        {
            horseRestService = new RestService();
        }

        public IActionResult Index()
        {
            JObject raceInfo = CreateRace();
            string raceId = raceInfo["raceId"]?.ToString();
            List<Horse> listOfHorsesRace = new List<Horse>();

            if (raceInfo["race"]["horses"] != null)
            {
                foreach (var item in raceInfo["race"]["horses"])
                {
                    string horseId = getIdResource(item.ToString());
                    JObject horseInfo = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Horse", "GET", horseId));
                    listOfHorsesRace.Add(new Horse { horseId = horseInfo["horseId"].ToString(), horseName = horseInfo["horseName"].ToString(), horseAge = horseInfo["horseAge"].ToString(), horseWeight = horseInfo["horseWeight"].ToString(), horseJockey = horseInfo["horseJockey"].ToString(), horseImg = horseInfo["horseImg"].ToString(), foldingRate = horseInfo["foldingRate"].ToString() });
                }
            }
            
            ViewBag.listOfHorsesRace = listOfHorsesRace;

            ViewBag.raceInfo = raceInfo;
            return View();
        }

        [Route("Racing/{raceId}")]
        public IActionResult Racing(string raceId)
        {
            JObject raceInfo = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Race", "GET", raceId));
            List<Horse> listOfHorsesRace = new List<Horse>();
            List<string> horseIdArray = new List<string>();
            Random horseWinnerRnd = new Random();

            if (raceInfo["horses"] != null)
            {
                foreach (var item in raceInfo["horses"])
                {
                    string horseId = getIdResource(item.ToString());
                    JObject horseInfo = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Horse", "GET", horseId));
                    listOfHorsesRace.Add(new Horse { horseId = horseInfo["horseId"].ToString(), horseName = horseInfo["horseName"].ToString(), horseAge = horseInfo["horseAge"].ToString(), horseWeight = horseInfo["horseWeight"].ToString(), horseJockey = horseInfo["horseJockey"].ToString(), horseImg = horseInfo["horseImg"].ToString(), foldingRate = horseInfo["foldingRate"].ToString(), horseIdSelector = "horse"+horseInfo["horseId"].ToString() });
                    horseIdArray.Add("#horse"+horseInfo["horseId"].ToString());
                }
            }

            int winnerHorseIndex = horseWinnerRnd.Next(0, listOfHorsesRace.Count);
            string tmpHorse = horseIdArray[0];
            horseIdArray[0] = horseIdArray[winnerHorseIndex];
            horseIdArray[winnerHorseIndex] = tmpHorse;

            JsonResult response = AddWinnerToHorse(listOfHorsesRace[winnerHorseIndex].horseId, raceId);


            ViewBag.raceId = raceId;
            ViewBag.horseIdArray = horseIdArray;
            ViewBag.listOfHorsesRace = listOfHorsesRace;
            return View();
        }



        [Route("Payout/{raceId}")]
        public IActionResult Payout(string raceId)
        {
            JObject raceInfo = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Race", "GET", raceId));
            string winnerHorseId = getIdResource(raceInfo["winner"].ToString());
            double racePotAmount = Convert.ToDouble(raceInfo["potAmount"]);
            string winnerHorseName = "";

            // Winning bet
            JArray betList = (JArray)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Bet", "GET", null));
            foreach (JObject item in betList)
            {
                string betRaceId = getIdResource(item["race"].ToString());

                if (raceId == betRaceId)
                {
                    string horseId = getIdResource(item["horse"].ToString());
                    string betterId = getIdResource(item["better"].ToString());

                    JObject playerInfo = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Player", "GET", betterId));
                    double betterAmount = Convert.ToDouble(playerInfo["amount"]);

                    double betAmount = Convert.ToDouble(item["betAmount"]);

                    JObject horseInfo = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Horse", "GET", horseId));

                    if (winnerHorseId == horseId)
                    {
                        winnerHorseName = horseInfo["horseName"].ToString();
                        double foldingRate = Convert.ToDouble(horseInfo["foldingRate"]);
                        double newBetAmount = (betAmount * foldingRate)-betAmount;

                        JsonResult response = AddAmountToPlayer(betterId, newBetAmount);

                        racePotAmount -= newBetAmount;
                    }
                    else
                    {
                        JsonResult response = AddAmountToPlayer(betterId, -betAmount);
                    }

                }
            }

            // Share Owners,Operators,Jockey

            List<Owner> listOfOwners = new List<Owner>();
            List<Operator> listOfOperators = new List<Operator>();
            List<Jockey> listOfJockeys = new List<Jockey>();

            JArray shareList = (JArray)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "NumberOfShares", "GET", null));
            foreach (JObject item in shareList)
            {
                string shareHorseId = getIdResource(item["horse"].ToString());

                if (winnerHorseId == shareHorseId)
                {
                    double horseShareRate = Convert.ToDouble(item["share"]);
                    if (item["owner"] != null)
                    {
                        string horseOwnerId = getIdResource(item["owner"].ToString());
                        double ownerShareAmount = racePotAmount / 100 * horseShareRate;
                        JsonResult response = AddAmountToOwner(horseOwnerId, ownerShareAmount);

                        JObject ownerInfo = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Owner", "GET", horseOwnerId));
                        listOfOwners.Add(new Owner {ownerId = horseOwnerId, ownerName = ownerInfo["ownerName"].ToString(), ownerShare = horseShareRate.ToString(), ownerWinAmount = ownerShareAmount.ToString() });

                    }
                    if (item["jockey"] != null)
                    {
                        string horseJockeyId = getIdResource(item["jockey"].ToString());
                        double jockeyShareAmount = racePotAmount / 100 * horseShareRate;
                        JsonResult response = AddAmountToJockey(horseJockeyId, jockeyShareAmount);

                        JObject jockeyInfo = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Jockey", "GET", horseJockeyId));
                        listOfJockeys.Add(new Jockey { jockeyId = horseJockeyId, jockeyName = jockeyInfo["jockeyName"].ToString(), jockeyShare = horseShareRate.ToString(), jockeyWinAmount = jockeyShareAmount.ToString() });

                    }
                    if (item["operator"] != null)
                    {
                        string horseOperatorId = getIdResource(item["operator"].ToString());
                        double operatorShareAmount = racePotAmount / 100 * horseShareRate;
                        JsonResult response = AddAmountToOperator(horseOperatorId, operatorShareAmount);

                        JObject operatorInfo = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Operator", "GET", horseOperatorId));
                        listOfOperators.Add(new Operator { operatorId = horseOperatorId, operatorName = operatorInfo["operatorName"].ToString(), operatorShare = horseShareRate.ToString(), operatorWinAmount = operatorShareAmount.ToString() });

                    }

                }
            }

            ViewBag.listOfOwners = listOfOwners;
            ViewBag.listOfOperators = listOfOperators;
            ViewBag.listOfJockeys = listOfJockeys;

            ViewBag.winnerJockeyName = listOfJockeys[0].jockeyName;
            ViewBag.winnerJockeyAmount = listOfJockeys[0].jockeyWinAmount;
            ViewBag.winnerHorseName = winnerHorseName;

            
            return View();
        }

        public JsonResult AddWinnerToHorse(string horseId, string raceId)
        {
            JObject transactionJSON = new JObject();

            transactionJSON.Add("$class", "horsera.AddWinnerToRace");

            transactionJSON.Add("race", "resource:horsera.Race#" + raceId);
            transactionJSON.Add("horse", "resource:horsera.Horse#" + horseId);

            string json = JsonConvert.SerializeObject(transactionJSON);
            JObject jsonResult = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(json, "AddWinnerToRace", "POST", null));

            return Json(new { transactionId = jsonResult["transactionId"].ToString() });

        }

        public JsonResult AddAmountToPlayer(string playerId, double amount)
        {
            JObject transactionJSON = new JObject();

            transactionJSON.Add("$class", "horsera.AddAmountToPlayer");

            transactionJSON.Add("player", "resource:horsera.Player#" + playerId);
            transactionJSON.Add("amount", amount);

            string json = JsonConvert.SerializeObject(transactionJSON);
            JObject jsonResult = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(json, "AddAmountToPlayer", "POST", null));

            return Json(new { transactionId = jsonResult["transactionId"].ToString() });

        }

        public JsonResult AddAmountToOwner(string ownerId, double amount)
        {
            JObject transactionJSON = new JObject();

            transactionJSON.Add("$class", "horsera.AddAmountToOwner");

            transactionJSON.Add("owner", "resource:horsera.Owner#" + ownerId);
            transactionJSON.Add("amount", amount);

            string json = JsonConvert.SerializeObject(transactionJSON);
            JObject jsonResult = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(json, "AddAmountToOwner", "POST", null));

            return Json(new { transactionId = jsonResult["transactionId"].ToString() });

        }


        public JsonResult AddAmountToJockey(string jockeyId, double amount)
        {
            JObject transactionJSON = new JObject();

            transactionJSON.Add("$class", "horsera.AddAmountToJockey");

            transactionJSON.Add("jockey", "resource:horsera.Jockey#" + jockeyId);
            transactionJSON.Add("amount", amount);

            string json = JsonConvert.SerializeObject(transactionJSON);
            JObject jsonResult = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(json, "AddAmountToJockey", "POST", null));

            return Json(new { transactionId = jsonResult["transactionId"].ToString() });

        }

        public JsonResult AddAmountToOperator(string operatorId, double amount)
        {
            JObject transactionJSON = new JObject();

            transactionJSON.Add("$class", "horsera.AddAmountToOperator");

            transactionJSON.Add("operator", "resource:horsera.Operator#" + operatorId);
            transactionJSON.Add("amount", amount);

            string json = JsonConvert.SerializeObject(transactionJSON);
            JObject jsonResult = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(json, "AddAmountToOperator", "POST", null));

            return Json(new { transactionId = jsonResult["transactionId"].ToString() });

        }


        public JsonResult CreateBet(CreateBet betInfo)
        {
            JObject transactionJSON = new JObject();
            JObject subtransactionJSON = new JObject();

            transactionJSON.Add("$class", "horsera.BetToHorse");

            transactionJSON.Add("horse", "resource:horsera.Horse#" + betInfo.horseId);
            transactionJSON.Add("player", "resource:horsera.Player#" + betInfo.playerId);
            transactionJSON.Add("betAmount", betInfo.betAmount);
            transactionJSON.Add("race", "resource:horsera.Race#" + betInfo.raceId);

            string json = JsonConvert.SerializeObject(transactionJSON);
            JObject jsonResult = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(json, "BetToHorse", "POST", null));

            return Json(new { transactionId = jsonResult["transactionId"].ToString() });

        }

        public JsonResult CreateHorse(Horse horseInfo)
        {
            JObject transactionJSON = new JObject();
            JObject subtransactionJSON = new JObject();

            transactionJSON.Add("$class", "horsed.CreateHorse");

            subtransactionJSON.Add("horseId", horseInfo.horseId);
            subtransactionJSON.Add("horseName", horseInfo.horseName);
            subtransactionJSON.Add("horseAge", "tester22");
            subtransactionJSON.Add("horseWeight", "tester22");
            subtransactionJSON.Add("horseJockey", "tester22");
            subtransactionJSON.Add("avaibleNumberOfShares", "0");

            transactionJSON.Add("horse", subtransactionJSON);

            string json = JsonConvert.SerializeObject(transactionJSON);
            JObject jsonResult = (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(json, "CreateHorse", "POST", null));

            return Json(new { transactionId = jsonResult["transactionId"].ToString() });

        }

        public JObject CreateRace()
        {
            JObject transactionJSON = new JObject();
            JObject subtransactionJSON = new JObject();

            string[] horses = { "resource:horsera.Horse#1", "resource:horsera.Horse#2", "resource:horsera.Horse#3", "resource:horsera.Horse#4" };

            JArray raceList = (JArray)JsonConvert.DeserializeObject(horseRestService.httpRequestService(null, "Race", "GET", null));
            int raceId = raceList.Count + 1000;
            transactionJSON.Add("$class", "horsera.CreateRace");

            subtransactionJSON.Add("raceId", raceId);
            subtransactionJSON.Add("raceName", "Creosafe " +raceId +".Koşusu");
            subtransactionJSON.Add("potAmount", 1000);
            subtransactionJSON.Add("horses", JArray.FromObject(horses));

            transactionJSON.Add("race", subtransactionJSON);

            string json = JsonConvert.SerializeObject(transactionJSON);
            return (JObject)JsonConvert.DeserializeObject(horseRestService.httpRequestService(json, "CreateRace", "POST", null));


        }

        public string getIdResource(string resource)
        {
            int searchHashIndex = resource.IndexOf("#");
            string id = resource.Substring(searchHashIndex + 1, resource.Length - (searchHashIndex + 1));

            return id;

        }

    }
}
