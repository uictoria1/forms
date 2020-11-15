using Microsoft.EntityFrameworkCore;

namespace Forms.Models.DbAppContext
{
    public class DbAppContext : DbContext
    {
        public DbSet<QuestionType> QuestionTypes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<EnumChoice> EnumChoices { get; set; }
        public DbSet<EnumGroup> EnumGroups { get; set; }
        public DbSet<QuestionOption> QuestionOptions { get; set; }
        public DbAppContext(DbContextOptions<DbAppContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }

        #region
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<QuestionType>().HasData(
                new QuestionType { Id = 1, QuestionTypeName = "text" },
                new QuestionType { Id = 2, QuestionTypeName = "int" },
                new QuestionType { Id = 3, QuestionTypeName = "date" },
                new QuestionType { Id = 4, QuestionTypeName = "bool" }
                );

            modelBuilder.Entity<EnumGroup>().HasData(
                new EnumGroup { Id = 1, EnumGroupName = "Sex" },
                new EnumGroup { Id = 2, EnumGroupName = "MaritalStatus" }
                );

            modelBuilder.Entity<EnumChoice>().HasData(
                new EnumChoice { Id = 1, EnumGroupId = 1, EnumChoiceName = "Male" },
                new EnumChoice { Id = 2, EnumGroupId = 1, EnumChoiceName = "Female" },
                new EnumChoice { Id = 3, EnumGroupId = 2, EnumChoiceName = "Single" },
                new EnumChoice { Id = 4, EnumGroupId = 2, EnumChoiceName = "Married" }
                );

            modelBuilder.Entity<QuestionOption>().HasData(
                new QuestionOption() { Id = 1, QuestionId = 3, EnumChoiceId = 1 },
                new QuestionOption() { Id = 2, QuestionId = 3, EnumChoiceId = 2 },
                new QuestionOption() { Id = 3, QuestionId = 5, EnumChoiceId = 3 },
                new QuestionOption() { Id = 4, QuestionId = 5, EnumChoiceId = 4 }
                );

            modelBuilder.Entity<Question>().HasData(
                new Question() { Id = 1, Order = 1, QuestionName = "Введите имя", QuestionTypeId = 1 },
                new Question() { Id = 2, Order = 2, QuestionName = "Введите возраст", QuestionTypeId = 2 },
                new Question() { Id = 3, Order = 3, QuestionName = "Введите пол", QuestionTypeId = 1, EnumGroupId = 1 },
                new Question() { Id = 4, Order = 4, QuestionName = "Введите дату", QuestionTypeId = 3 },
                new Question() { Id = 5, Order = 5, QuestionName = "Введите семейное положение", QuestionTypeId = 1, EnumGroupId = 2 },
                new Question() { Id = 6, Order = 6, QuestionName = "Любите ли вы программировать", QuestionTypeId = 4 }
                );
        }
        #endregion
    }
}
