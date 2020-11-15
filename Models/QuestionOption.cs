namespace Forms.Models
{
    public class QuestionOption
    {
        public int Id { get; set; }

        public int? QuestionId { get; set; }
        public Question Question { get; set; }

        public int EnumChoiceId { get; set; }
        public EnumChoice EnumChoice { get; set; }
    }
}
