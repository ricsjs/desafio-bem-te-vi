import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { MockUsersRepository } from '../../repositories/mock/mock-users-repository'
import { AuthenticateService } from './user-auth-service'

let usersRepository : MockUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
    beforeEach(() => {
        usersRepository = new MockUsersRepository
        sut = new AuthenticateService(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'ricardo',
            email: 'ricfilho0007@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'ricfilho0007@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() => 
            sut.execute({
                email: 'ricfilho0007@gmail.com',
                password: '123456'
            })).rejects.toThrowError('Invalid credentials')
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'ricfilho0007@gmail.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => 
            sut.execute({
                email: 'ricfilho0007@gmail.com',
                password: '123123'
            })).rejects.toThrowError('Invalid credentials')
    })
})