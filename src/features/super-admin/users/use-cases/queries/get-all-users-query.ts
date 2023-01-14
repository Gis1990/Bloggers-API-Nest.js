import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UsersQueryRepository } from "../../users.query.repository";
import { ModelForGettingAllUsers } from "../../dto/users.dto";
import { UserPaginationClass } from "../../entities/users.entity";

export class GetAllUsersCommand {
    constructor(public dto: ModelForGettingAllUsers) {}
}

@QueryHandler(GetAllUsersCommand)
export class GetAllUsersQuery implements IQueryHandler<GetAllUsersCommand> {
    constructor(private usersQueryRepository: UsersQueryRepository) {}

    async execute(query: GetAllUsersCommand): Promise<UserPaginationClass> {
        return await this.usersQueryRepository.getAllUsers(query.dto);
    }
}
