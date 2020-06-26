using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using HumanResourceApplication.BoundedContext.SqlContext;
namespace HumanResourceApplication.Models.Main
{
    [Table("vCountryLookups",Schema="dbo")]
    public partial class vCountryLookup
    {
		#region CountryId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion CountryId Annotations

        public int CountryId { get; set; }


        public string CountryName { get; set; }


        public vCountryLookup()
        {
        }
	}
}