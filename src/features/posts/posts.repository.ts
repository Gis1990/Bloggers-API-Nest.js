import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostDBClass, PostDocument } from "./posts.schema";
import { NewPostClassResponseModel } from "./entities/posts.entity";
import { CreatedPostDto } from "./dto/posts.dto";

@Injectable()
export class PostsRepository {
    constructor(@InjectModel(PostDBClass.name) private postsModelClass: Model<PostDocument>) {}

    async createPost(newPost: CreatedPostDto): Promise<NewPostClassResponseModel> {
        const post = new this.postsModelClass(newPost);
        await post.save();
        const { _id, usersLikesInfo, ...postRest } = post.toObject();
        return postRest;
    }

    async updatePost(
        id: string,
        title: string,
        shortDescription: string,
        content: string,
        blogId: string,
    ): Promise<boolean> {
        const post = await this.postsModelClass.findOne({ id: id });
        let blogName;
        if (post) {
            blogName = post.blogName;
        }
        const result = await this.postsModelClass.updateOne(
            { id: id },
            { $set: { title, shortDescription, content, blogId, blogName } },
        );
        return result.matchedCount === 1;
    }

    async deletePostById(id: string): Promise<boolean> {
        const result = await this.postsModelClass.deleteOne({ id: id });
        return result.deletedCount === 1;
    }

    async likeOperation(id: string, update: any): Promise<boolean> {
        const result = await this.postsModelClass.updateOne({ id: id }, update);
        return result.matchedCount === 1;
    }
}
