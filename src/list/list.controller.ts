import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { Task, isTask } from './entities/list.entity';
@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) {}
    @Get()
    allTasks(){
        return this.listService.tasks()
    }
    @Get(':id')
    specificTask(@Param('id') id:number){
        if(this.listService.findTask(id)){
            return {
                id: id,
                message: "Found",
                content: this.listService.findTask(id)
            }
        }else{
            throw new BadRequestException ({
                message: "Please enter a valid id."
           }) 
        }
    }
    @Post()
    addNewTask(@Body() body:Task){
        if(isTask(body)){
            if(!this.listService.findTask(body.id)){
                this.listService.createTask(body);
                return {
                    message: "Data recieved",
                    content: body
                }
            }else{
               throw new BadRequestException ({
                    message: "Please enter a valid id. This id already exists."
               }) 
            }
        }else{
            throw new BadRequestException( {
                message: "Please enter a valid body",
                expectedBody:{
                    id: 'number',
                    title: 'string',
                    description: 'string',
                    done: 'boolean',
                }
            })
        }
    }
    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() body){
        return {
            message: "Success",
            id: id,
            body:body
        }
    }
    @Delete(':id')
    removeTask(@Param('id') id: string){
        return {
            message: "Success",
            id: id,
        }
    }
}
