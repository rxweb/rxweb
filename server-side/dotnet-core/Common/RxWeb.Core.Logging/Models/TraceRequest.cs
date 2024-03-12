namespace RxWeb.Core.Logging
{
    public class TraceRequest : Attribute
    {
        public string GetTitle { get; set; }

        public string GetByTitle { get; set; }

        public string PostTitle { get; set; }

        public string PutTitle { get; set; }

        public string PatchTitle { get; set; }

        public string DeleteTitle { get; set; }

        public string GetCategory { get; set; }

        public string GetByCategory { get; set; }

        public string PostCategory { get; set; }

        public string PutCategory { get; set; }

        public string PatchCategory { get; set; }

        public string DeleteCategory { get; set; }
    }
}
