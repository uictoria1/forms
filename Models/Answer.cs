using System;
using System.Linq;
using System.Threading.Tasks;

namespace Forms.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public string AnswerTextEnum { get; set; }
        public int AnswerInt { get; set; }
        public int AnswerDate { get; set; }
        public bool AnswerBoolean { get; set; }


        public int QuestionOptionId { get; set; }
        public QuestionOption QuestionOption { get; set; }
    }
}
