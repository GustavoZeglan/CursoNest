import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './data/user.entity';
import { UserService } from './user.service';
import { QueryFailedError } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Conectar no banco em memória
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
          dropSchema: true,
        }),
        // Criar o repository do usuário
        TypeOrmModule.forFeature([User])
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve impedir o cadastro de usuários com o e-mail duplicado', async () => {
    await controller.createUser({
      name: 'Gustavo A',
      age: 19,
      email: 'g1@gmail.com',
      password: '12345678',
    });

    try {

      await controller.createUser({
        name: 'Gustavo B',
        age: 20,
        email: 'g1@gmail.com',
        password: '12345678',
      });

      expect(true).toBe(false);
    } catch (error: any) {
      expect(error).toBeInstanceOf(QueryFailedError);
    }


  });

  it('deve criar um novo usuário', async () => {
    const newUser = await controller.createUser({
      name: 'Gustavo Zeglan',
      age: 19,
      email: 'lgzeglan@gmail.com',
      password: '12345678',
    });

    expect(newUser).toHaveProperty('id', 1);
    expect(newUser).toHaveProperty('age', 19);
    expect(newUser).toHaveProperty('name', 'Gustavo Zeglan');
    expect(newUser).toHaveProperty('email', 'lgzeglan@gmail.com');
    expect(newUser).toHaveProperty('password', '12345678');
  });

  it('deve listar os usuários do banco de dados', async () => {
    await controller.createUser({
      name: 'Gustavo Zeglan',
      age: 19,
      email: 'lgzeglan1@gmail.com',
      password: '12345678',
    });

    await controller.createUser({
      name: 'Gabriel',
      age: 20,
      email: 'gabriel@gmail.com',
      password: '12345678',
    });

    const users = await controller.getUsers();

    expect(users).toHaveLength(2);
    expect(users).toEqual([
      {
        id: 1,
        name: 'Gustavo Zeglan',
        age: 19,
        email: 'lgzeglan1@gmail.com',
      },
      {
        id: 2,
        name: 'Gabriel',
        age: 20,
        email: 'gabriel@gmail.com',
      }
    ])

  });

});
