import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../../typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.dto';
import { v4 as uuidv4 } from 'uuid';
import { formatYMD } from './../../utils/formatData';
import { UpdateUserDto } from './dtos/update.dto';
import { UserProfileDto } from './dtos/createProfile.dto';
import { HttpMessage, HttpStatus } from 'src/global/enums/enum';
import { Profile } from 'src/typeorm/entities/Profile';
import { CreateUserPostDto } from './dtos/createUserPost.dto';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async findAll() {
    return await this.userRepository.find({ relations: ['profile'] });
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

  async createProfileUser(id: string, userProfileDto: UserProfileDto) {
    // Kiểm tra id của user có tồn tại không?
    const findUser = await this.userRepository.findOne({
      where: { UserId: id },
    });

    if (!findUser) {
      // Trả về lỗi khi không tìm thấy user
      throw new HttpException(
        HttpMessage.NOTFOUND_MESSAGE,
        HttpStatus.NOT_FOUND,
      );
    } else {
      // Tạo newProfile cho user
      const newProfileUser = {
        ProfileId: uuidv4(),
        FirstName: userProfileDto.FirstName,
        LastName: userProfileDto.LastName,
        Address: userProfileDto.Address,
      };

      // Tạo instance từ entity của user nhưng không lưu vào trong databse
      const newInstance = await this.profileRepository.create(newProfileUser);

      // Lưu vào trong database của profile
      const saveProfile = await this.profileRepository.save(newInstance);

      // Thêm một key có tên profile vào trong entity user
      findUser.profile = saveProfile;

      // lưu vào trong database của user
      return await this.userRepository.save(findUser);
    }
  }

  async createUserPostDto(id: string, createUserPostDto: CreateUserPostDto) {
    // Kiểm tra id của user có tồn tại không?
    const findUser = await this.userRepository.findOne({
      where: { UserId: id },
    });

    if (!findUser) {
      throw new HttpException(
        HttpMessage.NOTFOUND_MESSAGE,
        HttpStatus.NOT_FOUND,
      );
    } else {
      // Tạo đối tượng newPost
      const newPost = {
        PostId: uuidv4(),
        Title: createUserPostDto.Title,
        Content: createUserPostDto.Content,
      };

      // Tạo mới instance từ entity user nhưng chưa lưu vào database
      const newInstance = await this.postRepository.create(newPost);

      // // Lưu dữ liệu vào trong database
      // const savePost = await this.postRepository.save(newInstance);

      newInstance.user = findUser;

      return this.postRepository.save(newInstance);
    }
  }
}
