using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using HumanResourceApplication.Models.Enums.Main;
using HumanResourceApplication.BoundedContext.SqlContext;
namespace HumanResourceApplication.Models.Main
{
    [Table("Countries",Schema="dbo")]
    public partial class Country
    {
		#region CountryId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion CountryId Annotations

        public int CountryId { get; set; }

		#region CountryName Annotations

        [Required]
        [MaxLength(100)]
		#endregion CountryName Annotations

        public string CountryName { get; set; }

		#region StatusId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion StatusId Annotations

        public int StatusId { get; set; }

		#region LanguageId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion LanguageId Annotations

        public int LanguageId { get; set; }


        public Country()
        {
        }
	}
}