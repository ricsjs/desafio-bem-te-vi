import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { RegisterService } from "../../users-service/user-register-service";


export function makeUserRegisterService() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const userRegisterService = new RegisterService(prismaUsersRepository);

    return userRegisterService;
}