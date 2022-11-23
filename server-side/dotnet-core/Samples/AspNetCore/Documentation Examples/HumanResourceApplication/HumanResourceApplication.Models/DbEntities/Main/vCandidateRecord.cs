using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using HumanResourceApplication.BoundedContext.SqlContext;
namespace HumanResourceApplication.Models.Main
{
    [Table("vCandidateRecords",Schema="dbo")]
    public partial class vCandidateRecord
    {
		#region CandidateId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion CandidateId Annotations

        public int CandidateId { get; set; }


        public string FirstName { get; set; }


        public string EmailId { get; set; }


        public int CountryId { get; set; }


        public string Designation { get; set; }


        public int Experience { get; set; }


        public vCandidateRecord()
        {
        }
	}
}