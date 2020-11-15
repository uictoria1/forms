namespace Forms.Models
{
    public class EnumChoice
    {
        public int Id { get; set; }
        public string EnumChoiceName { get; set; }

        public int EnumGroupId { get; set; }
        public EnumGroup EnumGroup { get; set; }

    }
}
