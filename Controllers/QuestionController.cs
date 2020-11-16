using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Forms.Models;
using Forms.Models.DbAppContext;
using Microsoft.EntityFrameworkCore;

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
        public IActionResult Post(Phone phone)
        {
            // add answers

            //phone.Id = Guid.NewGuid().ToString();
            //data.Add(phone);
            //return Ok(phone);

            return null;
        }
    }
}
