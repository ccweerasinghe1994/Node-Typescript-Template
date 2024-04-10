import { Request, Response } from 'express';
import { ICreateUserDto } from '../dtos/users/createUser.dto';
import { ICreateUserQueryParam } from '../types/user/query-param';
import { IUser } from '../types/user/user';

export function getUsers(req: Request, res: Response) {
    res.send([]);
}

export function getUserById(req: Request, res: Response) {
    res.send({});
}

export function createUser(req: Request<{}, {}, ICreateUserDto, ICreateUserQueryParam>, res: Response<IUser>) {
    req.body;
    res.send({
        email: 'abc@gmail.com',
        id: '1',
        username: 'abc'
    });
}