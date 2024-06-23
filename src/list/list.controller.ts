import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('list')
export class ListController {
    @Get()
    allTasks(){
        return {
            id:[0,1,2,3]
        }
    }
    @Get(':id')
    specificTask(@Param('id') id:string){
        return {
            id: id,
            message: "Found",
            content: "Content"
        }
    }
    @Post()
    addNewTask(@Body() body){
        return {
            message: "Data recieved",
            content: body
        }
    }
    @Patch(':id')
    updateTask(id: string, body){
        return {
            message: "Success",
            id: id,
            body:body
        }
    }
}
