using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Forms.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string QuestionName { get; set; }

        public int QuestionTypeId { get; set; }
        public QuestionType QuestionType { get; set; }

        public int? EnumGroupId { get; set; }
        public EnumGroup EnumGroup { get; set; }

        [NotMapped]
        public List<EnumChoice> enumChoices { get; set; }
    }
}
