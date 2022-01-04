import useAxios from "./useAxios";
import useError from "./useError";
import useGetData from "./useGetData";

export const usePosts = () => {
  const error = useError();
  const axios = useAxios();

  const [posts, setPosts, handleRefresh, refreshing] = useGetData("/posts");

  const handleAddInteraction = async (id) => {
    const i = posts.findIndex((p) => p.id === id);

    posts[i].interactions_count += 1;
    posts[i].interacted = true;
    setPosts([...posts]);

    try {
      await axios.patch(`/posts/${id}/interactions/add`, {});
    } catch (err) {
      posts[i].interactions_count -= 1;
      posts[i].interacted = false;
      setPosts([...posts]);
      error();
    }
  };

  const handleRemoveInteraction = async (id) => {
    const i = posts.findIndex((p) => p.id === id);

    posts[i].interactions_count -= 1;
    posts[i].interacted = false;
    setPosts([...posts]);

    try {
      await axios.patch(`/posts/${id}/interactions/remove`, {});
    } catch (err) {
      posts[i].interactions_count += 1;
      posts[i].interacted = true;
      setPosts([...posts]);
      error();
    }
  };

  const handleInteraction = (id) => {
    const post = posts.find((p) => p.id === id);
    if (post && post.interacted) handleRemoveInteraction(id);
    else if (post && !post.interacted) handleAddInteraction(id);
    else throw Error("No post with this id in the state");
  };

  return [posts, setPosts, handleInteraction, handleRefresh, refreshing];
};

export default usePosts;
