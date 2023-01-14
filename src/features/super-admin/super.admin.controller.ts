import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import {
    BlogsIdValidationModel,
    BlogsIdValidationModelWhenBlogIsBanned,
    InputModelForBanUnbanBlog,
    ModelForGettingAllBlogs,
} from "../blogs/dto/blogs.dto";
import { BlogClassPagination } from "../blogs/entities/blogs.entity";
import { BasicAuthGuard } from "../../guards/basic-auth.guard";
import { SkipThrottle } from "@nestjs/throttler";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
    InputModelForBanUnbanUser,
    InputModelForCreatingNewUser,
    ModelForGettingAllUsers,
    UsersIdValidationModel,
} from "./users/dto/users.dto";
import { BindUserWithBlogCommand } from "./users/use-cases/bind-user-with-blog-use-case";
import { UserViewModelClass, UserPaginationClass } from "./users/entities/users.entity";
import { CreateUserWithoutConfirmationEmailCommand } from "../auth/use-cases/create-user-without-confirmation-email-use-case";
import { DeleteUserCommand } from "./users/use-cases/delete-user-use-case";
import { BanUnbanUserBySuperAdminCommand } from "./users/use-cases/ban-unban-user-by-super-admin-use-case";
import { GetAllBlogsForSuperAdminCommand } from "../blogs/use-cases/queries/get-all-blogs-for-super-admin-query";
import { GetAllUsersCommand } from "./users/use-cases/queries/get-all-users-query";
import { BanUnbanBlogBySuperAdminCommand } from "../blogs/use-cases/ban-unban-blog-by-super-admin-use-case";

@SkipThrottle()
@Controller("sa")
export class SuperAdminController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @UseGuards(BasicAuthGuard)
    @Put("/blogs/:id/ban")
    @HttpCode(204)
    async banUnbanBlog(
        @Param() param: BlogsIdValidationModelWhenBlogIsBanned,
        @Body() dto: InputModelForBanUnbanBlog,
    ): Promise<boolean> {
        return await this.commandBus.execute(new BanUnbanBlogBySuperAdminCommand(dto.isBanned, param.id));
    }

    @UseGuards(BasicAuthGuard)
    @Get("/blogs")
    async getAllBlogsForSuperAdmin(
        @Query()
        dto: ModelForGettingAllBlogs,
    ): Promise<BlogClassPagination> {
        return await this.queryBus.execute(new GetAllBlogsForSuperAdminCommand(dto));
    }

    @UseGuards(BasicAuthGuard)
    @Put(":blogId/bind-with-user/:userId")
    @HttpCode(204)
    async bindUserWithBlog(
        @Param("blogId") blogId: BlogsIdValidationModel,
        @Param("userId") userId: UsersIdValidationModel,
    ): Promise<boolean> {
        return await this.commandBus.execute(new BindUserWithBlogCommand(blogId.toString(), userId.toString()));
    }

    @UseGuards(BasicAuthGuard)
    @Put("/users/:id/ban")
    @HttpCode(204)
    async banUnbanUserBySuperAdmin(
        @Body() dto: InputModelForBanUnbanUser,
        @Param() param: UsersIdValidationModel,
    ): Promise<boolean> {
        return await this.commandBus.execute(
            new BanUnbanUserBySuperAdminCommand(dto.isBanned, dto.banReason, param.id),
        );
    }

    @UseGuards(BasicAuthGuard)
    @Get("/users")
    async getAllUsers(
        @Query()
        dto: ModelForGettingAllUsers,
    ): Promise<UserPaginationClass> {
        return await this.queryBus.execute(new GetAllUsersCommand(dto));
    }

    @UseGuards(BasicAuthGuard)
    @Post("/users")
    async createUser(@Body() dto: InputModelForCreatingNewUser): Promise<UserViewModelClass> {
        return await this.commandBus.execute(new CreateUserWithoutConfirmationEmailCommand(dto));
    }

    @UseGuards(BasicAuthGuard)
    @Delete("/users/:id")
    @HttpCode(204)
    async deleteUser(@Param() param: UsersIdValidationModel): Promise<boolean> {
        return await this.commandBus.execute(new DeleteUserCommand(param.id));
    }
}
