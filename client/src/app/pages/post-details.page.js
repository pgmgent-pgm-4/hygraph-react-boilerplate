// Import external modules
import {
  gql,
  useQuery,
} from "@apollo/client";
import { useParams } from "react-router-dom";

// Import custom components
import { GET_POST_DETAILS } from '../graphql';
import { PostDetailsComponent } from '../components/posts';

const PostDetailsPage = () => {
  let params = useParams();
  let postId = (params.postId);

  const { loading, error, data } = useQuery(GET_POST_DETAILS, { 
    variables: {
      postId: postId
    }
  });

  const gqlResult = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.toString()}Error :(</p>;

    return (
      <PostDetailsComponent post={data.post} />
    );
  };

  return (
    <>
      {gqlResult()}
    </>
  )
};

export default PostDetailsPage;