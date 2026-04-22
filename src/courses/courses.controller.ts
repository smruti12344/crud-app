import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole as Role } from 'src/user/user.type';
import { RolesGuard } from 'src/auth/roles.guard';
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @UseGuards(AuthGuard, RolesGuard) // Apply both AuthGuard and RolesGuard to protect this route
  @Roles(Role.ADMIN) // Only allow users with the 'admin' role to access this route
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    const course = this.coursesService.create(createCourseDto);
    return {
      message: 'Course created successfully',
      course,
    };
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
