using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using HumanResourceApplication.BoundedContext.SqlContext;
namespace HumanResourceApplication.Models.Main
{
    [Table("vStateRecords",Schema="dbo")]
    public partial class vStateRecord
    {
		#region StateId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion StateId Annotations

        public int StateId { get; set; }


        public string StateName { get; set; }


        public int StatusId { get; set; }


        public vStateRecord()
        {
        }
	}
}