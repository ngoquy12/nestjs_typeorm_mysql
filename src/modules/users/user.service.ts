import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../../typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.dto';
import { v4 as uuidv4 } from 'uuid';
import { formatYMD } from './../../utils/formatData';
import { UpdateUserDto } from './dtos/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { UserId: id } });
  }

  async remove(id: string) {
    // Tìm kiếm user theo id
    const findUser = await this.findOne(id);
    if (findUser) {
      return this.userRepository.remove(findUser);
    }
  }

  async create(createUserDto: CreateUserDto) {
    // Tạo ra đối tượng user mới
    const newUser = {
      ...createUserDto,
      UserId: uuidv4(),
      CreatedDate: formatYMD(new Date()),
    };

    // Tạo instance từ entity User nhưng không lưu vào trong database
    const newInstance = this.userRepository.create(newUser);

    // Lưu instance vào trong database
    return await this.userRepository.save(newInstance);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Tìm kiếm user theo id trong database
    const findUser = await this.findOne(id);

    // Kiểm tra user có tồn tại
    if (!findUser) {
      return null;
    } else {
      // Cập nhật lại thực thể user với dữ liệu đã được cập nhật
      this.userRepository.merge(findUser, updateUserDto);

      // Lưu dữ liệu được cập nhật vào trong database
      return this.userRepository.save(findUser);
    }
  }
}
