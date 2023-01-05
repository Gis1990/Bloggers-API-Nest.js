import { HttpException, Injectable } from "@nestjs/common";
import { CommentsRepository } from "../comments.repository";
import { CommentsQueryRepository } from "../comments.query.repository";

@Injectable()
export class UpdateCommentUseCase {
    constructor(
        private commentsRepository: CommentsRepository,
        private commentsQueryRepository: CommentsQueryRepository,
    ) {}

    async execute(id: string, content: string, userId: string | undefined): Promise<boolean> {
        const comment = await this.commentsQueryRepository.getCommentById(id, userId);
        if (!comment) {
            return false;
        }
        if (userId !== comment.userId) throw new HttpException("Incorrect id", 403);
        return this.commentsRepository.updateCommentById(id, content);
    }
}
