using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using vega.Models;

namespace vega.Controllers.Resources
{

    public class SaveVehicleResource
    {
        public int Id { get; set; }

        [Required]
        public int ModelId { get; set; }

        public bool IsRegistered { get; set; }

        [Required]
        public ContactResource Contact { get; set; }

        public ICollection<int> Features { get; set; }

        public DateTime LastUpdate { get; set; }

        public SaveVehicleResource()
        {
            Features = new Collection<int>();
        }
    }
}