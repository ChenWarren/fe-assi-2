/**
 * Fetches data from the server
 */

import http from '../utils/http-init'
import { Post, User, Comment } from '../types/model.type'

// Define the DataService class with all the methods
class DataService {
    getAllPosts() {
        return http.get<Post[]>(`/posts`)
    }

    getPostById(id: string) {
        return http.get<Post>(`/posts/${id}`)
    }

    getUserByUserId(id: string) {
        return http.get<User>(`/users/${id}`)
    }

    getCommentsByPostId(id: string) {
        return http.get<Comment[]>(`/comments?postId=${id}`)
    }
}

// Export the DataService instance
export const dataService = new DataService()
