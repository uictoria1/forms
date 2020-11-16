using Microsoft.EntityFrameworkCore.Migrations;

namespace Forms.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EnumGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnumGroupName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnumGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionTypeName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EnumChoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnumChoiceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnumGroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnumChoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnumChoices_EnumGroups_EnumGroupId",
                        column: x => x.EnumGroupId,
                        principalTable: "EnumGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Order = table.Column<int>(type: "int", nullable: false),
                    QuestionName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuestionTypeId = table.Column<int>(type: "int", nullable: false),
                    EnumGroupId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_EnumGroups_EnumGroupId",
                        column: x => x.EnumGroupId,
                        principalTable: "EnumGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Questions_QuestionTypes_QuestionTypeId",
                        column: x => x.QuestionTypeId,
                        principalTable: "QuestionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionId = table.Column<int>(type: "int", nullable: true),
                    EnumChoiceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionOptions_EnumChoices_EnumChoiceId",
                        column: x => x.EnumChoiceId,
                        principalTable: "EnumChoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuestionOptions_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnswerTextEnum = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AnswerInt = table.Column<int>(type: "int", nullable: false),
                    AnswerDate = table.Column<int>(type: "int", nullable: false),
                    AnswerBoolean = table.Column<bool>(type: "bit", nullable: false),
                    QuestionOptionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answers_QuestionOptions_QuestionOptionId",
                        column: x => x.QuestionOptionId,
                        principalTable: "QuestionOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "EnumGroups",
                columns: new[] { "Id", "EnumGroupName" },
                values: new object[,]
                {
                    { 1, "Sex" },
                    { 2, "MaritalStatus" }
                });

            migrationBuilder.InsertData(
                table: "QuestionTypes",
                columns: new[] { "Id", "QuestionTypeName" },
                values: new object[,]
                {
                    { 1, "text" },
                    { 2, "int" },
                    { 3, "date" },
                    { 4, "bool" }
                });

            migrationBuilder.InsertData(
                table: "EnumChoices",
                columns: new[] { "Id", "EnumChoiceName", "EnumGroupId" },
                values: new object[,]
                {
                    { 1, "Male", 1 },
                    { 2, "Female", 1 },
                    { 3, "Single", 2 },
                    { 4, "Married", 2 }
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "EnumGroupId", "Order", "QuestionName", "QuestionTypeId" },
                values: new object[,]
                {
                    { 1, null, 1, "Введите имя", 1 },
                    { 3, 1, 3, "Введите пол", 1 },
                    { 5, 2, 5, "Введите семейное положение", 1 },
                    { 2, null, 2, "Введите возраст", 2 },
                    { 4, null, 4, "Введите дату", 3 },
                    { 6, null, 6, "Любите ли вы программировать", 4 }
                });

            migrationBuilder.InsertData(
                table: "QuestionOptions",
                columns: new[] { "Id", "EnumChoiceId", "QuestionId" },
                values: new object[,]
                {
                    { 1, 1, 3 },
                    { 2, 2, 3 },
                    { 3, 3, 5 },
                    { 4, 4, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionOptionId",
                table: "Answers",
                column: "QuestionOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_EnumChoices_EnumGroupId",
                table: "EnumChoices",
                column: "EnumGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionOptions_EnumChoiceId",
                table: "QuestionOptions",
                column: "EnumChoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionOptions_QuestionId",
                table: "QuestionOptions",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_EnumGroupId",
                table: "Questions",
                column: "EnumGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuestionTypeId",
                table: "Questions",
                column: "QuestionTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "QuestionOptions");

            migrationBuilder.DropTable(
                name: "EnumChoices");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "EnumGroups");

            migrationBuilder.DropTable(
                name: "QuestionTypes");
        }
    }
}
