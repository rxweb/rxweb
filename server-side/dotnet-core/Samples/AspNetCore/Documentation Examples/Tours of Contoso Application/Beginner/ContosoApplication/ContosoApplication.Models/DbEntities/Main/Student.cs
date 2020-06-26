using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using ContosoApplication.Models.Enums.Main;
using ContosoApplication.BoundedContext.SqlContext;
namespace ContosoApplication.Models.Main
{
    [Table("Students",Schema="dbo")]
    public partial class Student
    {
		#region StudentId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion StudentId Annotations

        public int StudentId { get; set; }

		#region StudentName Annotations

        [Required]
        [MaxLength(50)]
		#endregion StudentName Annotations

        public string StudentName { get; set; }

		#region RollNumber Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion RollNumber Annotations

        public int RollNumber { get; set; }

		#region Age Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion Age Annotations

        public int Age { get; set; }

		#region Gender Annotations

        [Required]
        [MaxLength(10)]
		#endregion Gender Annotations

        public string Gender { get; set; }

		#region EmailId Annotations

        [Required]
        [MaxLength(30)]
		#endregion EmailId Annotations

        public string EmailId { get; set; }

		#region CourseId Annotations

        [RelationshipTableAttribue("Courses","dbo","","CourseId")]
		#endregion CourseId Annotations

        public Nullable<int> CourseId { get; set; }

		#region Course Annotations

        [ForeignKey(nameof(CourseId))]
        [InverseProperty(nameof(ContosoApplication.Models.Main.Course.Students))]
		#endregion Course Annotations

        public virtual Course Cours { get; set; }


        public Student()
        {
        }
	}
}