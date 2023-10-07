import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { ResponseData } from './../../global/responses/reponse.global';
import { User } from './../../typeorm/entities/User';
import { HttpMessage, HttpStatus } from 'src/global/enums/enum';
import { UserProfileDto } from './dtos/createProfile.dto';
import { CreateUserPostDto } from './dtos/createUserPost.dto';

@Controller('api/v1/users')
export class UserController {
  // Khởi tạo constructor cho userService
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    try {
      return new ResponseData<User[]>(
        await this.userService.findAll(),
        HttpMessage.SUCCESS_MESSAGE,
        HttpStatus.SUCESSS,
      );
    } catch (error) {
      return new ResponseData<User[]>(
        null,
        HttpMessage.ERROR_MESSAGE,
        HttpStatus.ERROR,
      );
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return new ResponseData<User>(
        await this.userService.findOne(id),
        HttpMessage.SUCCESS_MESSAGE,
        HttpStatus.SUCESSS,
      );
    } catch (error) {
      return new ResponseData<User>(
        null,
        HttpMessage.ERROR_MESSAGE,
        HttpStatus.ERROR,
      );
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    try {
      return new ResponseData<User>(
        await this.userService.remove(id),
        HttpMessage.DELETE_MESSAGE,
        HttpStatus.SUCESSS,
      );
    } catch (error) {
      return new ResponseData<User>(
        null,
        HttpMessage.ERROR_MESSAGE,
        HttpStatus.ERROR,
      );
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return new ResponseData<User>(
        await this.userService.create(createUserDto),
        HttpMessage.CREATED_MESSAGE,
        HttpStatus.CREATED,
      );
    } catch (error) {
      return new ResponseData<User>(
        null,
        HttpMessage.ERROR_MESSAGE,
        HttpStatus.ERROR,
      );
    }
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return new ResponseData<User>(
        await this.userService.update(id, updateUserDto),
        HttpMessage.UPDATED_MESSAGE,
        HttpStatus.SUCESSS,
      );
    } catch (error) {
      return new ResponseData<User>(
        null,
        HttpMessage.ERROR_MESSAGE,
        HttpStatus.ERROR,
      );
    }
  }

  @Post('/:id/profile')
  async createProfileUser(
    @Param('id') id: string,
    @Body() userProfileDto: UserProfileDto,
  ) {
    return await this.userService.createProfileUser(id, userProfileDto);
  }

  @Post('/:id/post')
  async createPost(
    @Param('id') id: string,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPostDto(id, createUserPostDto);
  }
}
