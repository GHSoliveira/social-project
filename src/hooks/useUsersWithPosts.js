import { usePostStore } from "../store/Posts";
import { users } from "../store/Users";

export const useUsersWithPosts = () => {
  const posts = usePostStore((state) => state.posts);

  return users.map((user) => ({
    ...user,
    posts: posts.filter((post) => post.user.username === user.id),
  }));
};
