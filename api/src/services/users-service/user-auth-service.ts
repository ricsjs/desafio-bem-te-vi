import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository";

interface AuthenticateServiceRequest {
    email: string
    password: string
}

interface AuthenticateServiceResponse {
    user: User
}

export class AuthenticateService {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ email, password }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user || !user.password_hash) {
            throw new Error("Invalid credentials");
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new Error("Invalid credentials");
        }

        return {
            user
        }
    }
}
