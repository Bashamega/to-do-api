import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
            content: "Content"
        }
    }
    @Post()
    addNewTask(@Body() body){
        return {
            massege: "Data recieved",
            content: body
        }
    }
}
