import { useContext } from "react";
import { Patch } from "../apicall";
import context from "../context";
import useGetData from "./useGetData";

export const usePosts = () => {
  const { token, setError } = useContext(context);
  const [posts, setPosts, handleRefresh, refreshing] = useGetData("/posts");

  const handleAddInteraction = async (id) => {
    const i = posts.findIndex((p) => p.id === id);

    posts[i].interactions_count += 1;
    posts[i].interacted = true;
    setPosts([...posts]);

    try {
      await Patch(`/posts/${id}/interactions/add`, {}, token, false);
    } catch (error) {
      posts[i].interactions_count -= 1;
      posts[i].interacted = false;
      setPosts([...posts]);
      setError();
    }
  };

  const handleRemoveInteraction = async (id) => {
    const i = posts.findIndex((p) => p.id === id);

    posts[i].interactions_count -= 1;
    posts[i].interacted = false;
    setPosts([...posts]);

    try {
      await Patch(`/posts/${id}/interactions/remove`, {}, token, false);
    } catch (error) {
      posts[i].interactions_count += 1;
      posts[i].interacted = true;
      setPosts([...posts]);
      setError();
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
