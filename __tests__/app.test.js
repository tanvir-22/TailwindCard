import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import User from '../models/user.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/Boibazar');
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Register Redirect Flow', () => {
  it('should redirect after successful registration', async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'wuebkd', email:'test123@gmail.com',password: '123456' });

    expect(res.statusCode).toBe(302); 
    expect(res.headers.location).toBe('/login?registered=true');
  });

  it('should render login page with success message in query', async () => {
    const res = await request(app).get('/login?registered=true');
    expect(res.statusCode).toBe(200);
  });
});
