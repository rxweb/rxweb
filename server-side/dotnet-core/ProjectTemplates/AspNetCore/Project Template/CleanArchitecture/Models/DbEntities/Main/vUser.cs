using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using $ext_safeprojectname$.BoundedContext.SqlContext;
namespace $ext_safeprojectname$.Models.Main
{
    [Table("vUsers",Schema="dbo")]
    public partial class vUser
    {
		#region UserId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion UserId Annotations

        public int UserId { get; set; }


        public string ApplicationTimeZoneName { get; set; }


        public string LanguageCode { get; set; }


        public string UserName { get; set; }


        public byte[] Password { get; set; }


        public byte[] Salt { get; set; }


        public bool LoginBlocked { get; set; }


        public string LocaleCode { get; set; }


        public vUser()
        {
        }
	}
}