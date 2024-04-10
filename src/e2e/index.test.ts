import { Express } from 'express';
import request from 'supertest';
import { createApp } from '../createApp';

// let's close the server after all tests are done


describe('Integration tests', () => {

    let underTest: Express;
    beforeAll(() => {
        underTest = createApp();
    });


    it('should return status 200 for GET /users', async () => {
        const response = await request(underTest).get('/users');
        expect(response.status).toBe(200);
    });
});
