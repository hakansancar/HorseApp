using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HorsePro.Models
{
    public class CreateBet
    {
        public string horseId { get; set; }
        public string playerId { get; set; }
        public int betAmount { get; set; }
        public string raceId { get; set; }
    }
}
