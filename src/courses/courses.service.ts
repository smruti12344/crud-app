import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseScehma } from './schema/course.schema';
@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(CourseScehma.name) private CourseModel: Model<CourseScehma>,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    //create course in database
    const createCourse = await this.CourseModel.create({
      title: createCourseDto.title,
      description: createCourseDto.description,
      price: createCourseDto.price,
      isActive: createCourseDto.isActive,
    });
    return createCourse;
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
