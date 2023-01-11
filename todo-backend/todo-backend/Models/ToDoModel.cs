using todo_backend.Authentication.DBModels;

namespace todo_backend.Models
{
    public class ToDoModel
    {
        public ToDoModel(ToDoItem item)
        {
            this.Id = item.Id;
            this.ItemName = item.ItemName;  
            this.IsComplete = item.IsComplete; 
            this.CreateDate = item.CreateDate;
        }
        public int Id { get; set; }
        public string ItemName { get; set; }
        public bool IsComplete { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
