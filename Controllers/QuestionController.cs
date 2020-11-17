using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Forms.Models;
using Forms.Models.DbAppContext;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Http;

namespace Forms.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private DbAppContext db;

        public QuestionController(DbAppContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Question> Get()
        {
            var questions = db.Questions
                .Include(qt => qt.QuestionType)
                .Include(e => e.EnumGroup)
                .ToList();

            foreach (var question in questions)
            {
                if (question.EnumGroupId != null)
                {
                    var enumChoices = db.EnumChoices
                                            .Where(b => b.EnumGroupId == question.EnumGroupId)
                                            .ToList();
                    if (enumChoices.Count() > 0)
                    {
                        question.enumChoices = enumChoices;
                    }
                }
            }

            return questions;
        }

        [HttpPost]
        public IActionResult Post(ICollection<ReceivedAnswer> answers)
        {
            using(var transaction = db.Database.BeginTransaction()){

                try{

                    Dictionary<int, string> response = new Dictionary<int, string>(answers.Count());

                    foreach(var answer in answers)
                    {
                        var ans = new Answer();
                        var question = db.Questions.Find(answer.key);
                        var questOption = db.QuestionOptions.Where(qo => qo.QuestionId == question.Id).FirstOrDefault();
                        var questType = db.QuestionTypes.Find(question.QuestionTypeId);

                        response.Add(question.QuestionName, questType.QuestionTypeName answer.value);

                        switch (questType.QuestionTypeName)
                        {
                            case "text":
                                ans.AnswerTextEnum = answer.value;
                                break;
                            case "int":
                                ans.AnswerInt = Int16.Parse(answer.value);
                                break;
                            case "bool":
                                if(answer.value == "true")
                                    ans.AnswerBoolean = true;
                                else
                                    ans.AnswerBoolean = false;
                                break;
                            case "date":
                                ans.AnswerDate = Convert.ToDateTime(answer.value);
                                break;
                        }

                        ans.QuestionOptionId = questType.Id;

                        db.Answers.Add(ans);
                    }


                    db.SaveChanges();
                    transaction.Commit();
                    return Ok(response);
                    
                }
                catch{
                    transaction.Rollback();
                    return BadRequest();
                }
            }
        }
    }
}
