import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('POST /user - deve validar o email no cadastro de usuários', () => {

    return request(app.getHttpServer())
    .post('/user')
    .send({
      name: 'Jhon Doe',
      email: 'jhon.doe.com',
      age: 28,
      password: '12345678'
    })
    .expect(400)
    .expect({
      message: ["email must be an email"],
      error: 'Bad Request',
      statusCode: 400
    });

  });

});
