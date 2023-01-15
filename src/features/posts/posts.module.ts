import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostsController } from "./posts.controller";
import { PostsQueryRepository } from "./posts.query.repository";
import { PostsRepository } from "./posts.repository";
import { BlogsModule } from "../blogs/blogs.module";
import { IsBlogsIdExistInTheRequestBodyConstraint } from "../blogs/decorators/blogs.custom.decorators";
import { CommentsRepository } from "../comments/comments.repository";
import { CommentsQueryRepository } from "../comments/comments.query.repository";
import { BlogClass, BlogsSchema } from "../blogs/blogs.schema";
import { CommentClass, CommentsSchema } from "../comments/comments.schema";
import { IsPostIdExistConstraint } from "./decorators/posts.custom.decorators";
import { DeletePostUseCase } from "./use-cases/delete-post-use-case";
import { UpdatePostUseCase } from "./use-cases/update-post-use-case";
import { LikeOperationForPostUseCase } from "./use-cases/like-operation-for-post-use-case";
import { NewestLikesClass, NewestLikesSchema, PostClass, PostsSchema } from "./posts.schema";
import { CreateCommentUseCase } from "../comments/use-cases/create-comment-use-case";
import { CqrsModule } from "@nestjs/cqrs";
import { GetBlogByIdQuery } from "../blogs/use-cases/queries/get-blog-by-id-query";
import {
    BannedBlogsBySuperAdminClass,
    BannedBlogsBySuperAdminSchema,
    BannedUsersBySuperAdminClass,
    BannedUsersSchema,
    UserAccountClass,
    UsersAccountSchema,
} from "../super-admin/users/users.schema";
import { GetAllCommentsForSpecificPostQuery } from "../comments/use-cases/queries/get-all-comments-for-specific-post-query";
import { GetAllPostsQuery } from "./use-cases/queries/get-all-posts-query";
import { GetPostByIdQuery } from "./use-cases/queries/get-post-by-id-query";
import { GetPostByIdForLikeOperationQuery } from "./use-cases/queries/get-post-by-id-for-like-opertation-query";
import { GetUserByIdQuery } from "../super-admin/users/use-cases/queries/get-user-by-id-query";
import { UsersQueryRepository } from "../super-admin/users/users.query.repository";

const useCases = [UpdatePostUseCase, DeletePostUseCase, LikeOperationForPostUseCase, CreateCommentUseCase];
const queries = [
    GetBlogByIdQuery,
    GetAllCommentsForSpecificPostQuery,
    GetAllPostsQuery,
    GetPostByIdQuery,
    GetPostByIdForLikeOperationQuery,
    GetUserByIdQuery,
];

@Module({
    imports: [
        CqrsModule,
        forwardRef(() => BlogsModule),
        MongooseModule.forFeature([
            {
                name: BlogClass.name,
                schema: BlogsSchema,
            },
            {
                name: PostClass.name,
                schema: PostsSchema,
            },
            {
                name: CommentClass.name,
                schema: CommentsSchema,
            },
            {
                name: NewestLikesClass.name,
                schema: NewestLikesSchema,
            },
            {
                name: BannedUsersBySuperAdminClass.name,
                schema: BannedUsersSchema,
            },
            {
                name: BannedBlogsBySuperAdminClass.name,
                schema: BannedBlogsBySuperAdminSchema,
            },
            {
                name: UserAccountClass.name,
                schema: UsersAccountSchema,
            },
        ]),
    ],
    controllers: [PostsController],
    providers: [
        PostsRepository,
        PostsQueryRepository,
        CommentsRepository,
        CommentsQueryRepository,
        UsersQueryRepository,
        IsBlogsIdExistInTheRequestBodyConstraint,
        IsPostIdExistConstraint,
        ...useCases,
        ...queries,
    ],

    exports: [PostsQueryRepository, PostsRepository],
})
export class PostsModule {}
