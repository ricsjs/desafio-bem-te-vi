import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { MockUsersRepository } from '../../repositories/mock/mock-users-repository'
import { RegisterService } from './user-register-service'

let usersRepository: MockUsersRepository
let sut: RegisterService

describe('Register Service', () => {
    beforeEach(() => {
        usersRepository = new MockUsersRepository
        sut = new RegisterService(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'Ricardo',
            email: 'ricfilho00000007@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'Ricardo',
            email: 'ricfilho007@gmail.com',
            password: '123456'
        })
        
        if (user.password_hash === null) {
            throw new Error('Password hash is null');
        }

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })


    it('should not be able to register with same email twice', async () => {
        const email = 'ricfilho0007@gmail.com'

        await sut.execute({
            name: 'Ricardo',
            email,
            password: '123456'
        })

        await expect(() =>
            sut.execute({
                name: 'Ricardo',
                email,
                password: '123456'
            })
        ).rejects.toThrowError('User already exists.')
    })
})