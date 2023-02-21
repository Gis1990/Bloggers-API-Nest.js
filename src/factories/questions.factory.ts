import { QuestionViewModelClass, QuestionViewModelPaginationClass } from "../entities/quez.entity";
import { QuestionClass } from "../schemas/questions.schema";
import { QuestionsPaginationDtoClass } from "../dtos/questions.dto";

export class QuestionsFactory {
    static async createQuestionViewModelClass(question: QuestionClass): Promise<QuestionViewModelClass> {
        return new QuestionViewModelClass(
            question.id,
            question.body,
            question.correctAnswers,
            question.published,
            question.createdAt,
            question.updatedAt,
        );
    }

    static async createQuestionViewModelPaginationClass(
        dto: QuestionsPaginationDtoClass,
    ): Promise<QuestionViewModelPaginationClass> {
        const result = await Promise.all(
            dto.items.map((elem) => {
                return QuestionsFactory.createQuestionViewModelClass(elem);
            }),
        );
        return new QuestionViewModelPaginationClass(dto.pagesCount, dto.page, dto.pageSize, dto.totalCount, result);
    }
}
