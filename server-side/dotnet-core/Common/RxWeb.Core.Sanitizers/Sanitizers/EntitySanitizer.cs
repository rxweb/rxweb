namespace RxWeb.Core.Sanitizers
{
    public class EntitySanitizer : Attribute
    {
        public Type Injector { get; set; }
        public EntitySanitizer(Type type) {
            Injector = type;
        }
    }
}
