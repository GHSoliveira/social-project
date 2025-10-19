import { create } from "zustand";
import { persist } from "zustand/middleware";

class Post {
  constructor(id, title, content, image, user) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.image = image;
    this.user = user;
    this.comments = [];
    this.upvotedBy = [];
    this.downvotedBy = [];
    this.isEdited = false;
  }

  get score() {
    return this.upvotedBy.length - this.downvotedBy.length;
  }
}

export const usePostStore = create(
  persist(
    (set, get) => ({
      posts: [],

      setPosts: (posts) => set({ posts }),

      addPost: (title, content, image, user) =>
        set((state) => {
          const newPost = new Post(
            state.posts.length + 1,
            title,
            content,
            image,
            user
          );

          return { posts: [...state.posts, newPost] };
        }),

      addComment: (postId, commentContent, user) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    ...post.comments,
                    {
                      id: crypto.randomUUID(),
                      content: commentContent,
                      user: {
                        username: user.username,
                        role: user.role,
                        profilePicture: user.profilePicture,
                      },
                    },
                  ],
                }
              : post
          ),
        })),
      deletePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        })),
      deleteComment: (postId, commentId) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.filter(
                    (comment) => comment.id !== commentId
                  ),
                }
              : post
          ),
        })),
      toggleUpvote: (postId, userEmail) => {
        const { posts } = get();
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            const hasUpvoted = post.upvotedBy.includes(userEmail);
            const hasDownvoted = post.downvotedBy.includes(userEmail);

            return {
              ...post,
              upvotedBy: hasUpvoted
                ? post.upvotedBy.filter((e) => e !== userEmail)
                : [...post.upvotedBy, userEmail],
              downvotedBy: hasDownvoted
                ? post.downvotedBy.filter((e) => e !== userEmail)
                : post.downvotedBy,
            };
          }
          return post;
        });

        set({ posts: updatedPosts });
      },

      toggleDownvote: (postId, userEmail) => {
        const { posts } = get();
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            const hasDownvoted = post.downvotedBy.includes(userEmail);
            const hasUpvoted = post.upvotedBy.includes(userEmail);

            return {
              ...post,
              downvotedBy: hasDownvoted
                ? post.downvotedBy.filter((e) => e !== userEmail)
                : [...post.downvotedBy, userEmail],
              upvotedBy: hasUpvoted
                ? post.upvotedBy.filter((e) => e !== userEmail)
                : post.upvotedBy,
            };
          }
          return post;
        });

        set({ posts: updatedPosts });
      },

      updatePost: (postId, updatedContent) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, ...updatedContent, isEdited: true }
              : post
          ),
        })),
    }),
    {
      name: "post-storage", // key do localStorage
    }
  )
);
