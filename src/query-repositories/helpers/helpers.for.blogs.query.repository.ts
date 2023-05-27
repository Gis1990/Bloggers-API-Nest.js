import { ModelForGettingAllBlogs, QueryDto } from "../../dtos/blogs.dto";
import { BlogClass } from "../../schemas/blogs.schema";

export class HelperForBlogs {
    static createQuery(dto: ModelForGettingAllBlogs): QueryDto {
        const {
            searchNameTerm = null,
            pageNumber = 1,
            pageSize = 10,
            sortBy = "createdAt",
            sortDirection = "desc",
        } = dto;
        const skips = pageSize * (pageNumber - 1);
        const sortObj: any = {};
        sortObj[sortBy] = sortDirection === "desc" ? -1 : 1;
        const query: any = {};
        if (searchNameTerm) {
            query.name = { $regex: searchNameTerm, $options: "i" };
        }
        return { query, skips, sortObj, pageSize, pageNumber };
    }

    static async returnSubscriptionStatusForBlog(userId: string, blog: BlogClass): Promise<string> {
        const isSubscribed = blog.subscribers.includes(userId);
        if (isSubscribed) {
            return "Subscribed";
        } else {
            return "Unsubscribed";
        }
    }

    static async getSubscriptionDataForBlogs(userId: string | undefined, blog: BlogClass): Promise<BlogClass> {
        if (userId) {
            blog.currentUserSubscriptionStatus = await HelperForBlogs.returnSubscriptionStatusForBlog(userId, blog);
        } else {
            blog.currentUserSubscriptionStatus = "None";
        }
        return blog;
    }
}
