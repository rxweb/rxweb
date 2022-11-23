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
    [Table("States",Schema="dbo")]
    public partial class State
    {
		#region StateId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion StateId Annotations

        public int StateId { get; set; }

		#region StateName Annotations

        [Required]
        [MaxLength(100)]
		#endregion StateName Annotations

        public string StateName { get; set; }

		#region StatusId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion StatusId Annotations

        public int StatusId { get; set; }

		#region CountryId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion CountryId Annotations

        public int CountryId { get; set; }


        public State()
        {
        }
	}
}