
import { Request, Response } from 'express';
import { getUsers } from '../../handlers/users';

describe('getUsers', () => {
    it('should send an empty array as response', () => {
        const req = {} as Request;
        const res = {
            send: jest.fn(),
        } as unknown as Response;

        getUsers(req, res);

        expect(res.send).toHaveBeenCalledWith([]);
    });
});