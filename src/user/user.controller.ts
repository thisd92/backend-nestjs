import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from './entities/user-role';
import { RoleGuard } from 'src/guards/role.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Roles(UserRole.Admin, UserRole.User)
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an user by ID' })
  @ApiOkResponse({
    description: 'User updated successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOperation({ summary: 'User deleted by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
