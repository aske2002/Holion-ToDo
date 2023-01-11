using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todobackend.Migrations
{
    /// <inheritdoc />
    public partial class ínital2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_AspNetUsers_ApplicationUserId",
                table: "ToDoItems");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "ToDoItems",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_AspNetUsers_ApplicationUserId",
                table: "ToDoItems",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_AspNetUsers_ApplicationUserId",
                table: "ToDoItems");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "ToDoItems",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_AspNetUsers_ApplicationUserId",
                table: "ToDoItems",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
