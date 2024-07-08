import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        console.log("Service :: constructor :: initializing Appwrite client");
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
      
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
      }
      

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            console.log("Service :: createPost :: input data", { title, slug, content, featuredImage, status, userId });
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
            console.log("Service :: createPost :: result", result);
            return result;
        } catch (error) {
            console.error("Service :: createPost :: error", error.message, error.stack);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            console.log("Service :: updatePost :: input data", { title, content, featuredImage, status });
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
            console.log("Service :: updatePost :: result", result);
            return result;
        } catch (error) {
            console.error("Service :: updatePost :: error", error.message, error.stack);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            console.log("Service :: deletePost :: input data", slug);
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            console.log("Service :: deletePost :: success");
            return true;
        } catch (error) {
            console.error("Service :: deletePost :: error", error.message, error.stack);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            console.log("Service :: getPost :: input data", slug);
            const result = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            console.log("Service :: getPost :: result", result);
            return result;
        } catch (error) {
            console.error("Service :: getPost :: error", error.message, error.stack);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            console.log("Service :: getPosts :: input data", queries);
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            console.log("Service :: getPosts :: result", result);
            return result;
        } catch (error) {
            console.error("Service :: getPosts :: error", error.message, error.stack);
            throw error;
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            console.log("Service :: uploadFile :: input data", file);
            const result = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            console.log("Service :: uploadFile :: result", result);
            return result;
        } catch (error) {
            console.error("Service :: uploadFile :: error", error.message, error.stack);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            console.log("Service :: deleteFile :: input data", fileId);
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            console.log("Service :: deleteFile :: success");
            return true;
        } catch (error) {
            console.error("Service :: deleteFile :: error", error.message, error.stack);
            throw error;
        }
    }

    getFilePreview(fileId) {
        console.log("Service :: getFilePreview :: input data", fileId);
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;
