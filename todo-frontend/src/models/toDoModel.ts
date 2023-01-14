export default interface toDoModel {
    Id: number,
    ItemName: string,
    IsComplete: boolean,
    CreateDate?: Date,
    isMock?: boolean,
}