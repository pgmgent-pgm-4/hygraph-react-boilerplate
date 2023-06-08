// Import external modules
import {
  gql,
  useQuery,
} from "@apollo/client";
import { Spinner } from 'reactstrap';

// Import custom components
import { GET_ALL_POSTS_SMALL } from '../graphql';
import { PostsListComponent, PostsListPagination, PostsListRelayCursor } from '../components/posts';

const PostsPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS_SMALL);

  const gqlResult = () => {
    if (loading) return <Spinner
      color="primary"
      size=""
      type="grow"
    >
      Loading...
    </Spinner>;
    if (error) return <p>Error :(</p>;

    return (
      <PostsListComponent posts={data.posts} />
    );
  };

  return (
    <>
      <PostsListPagination />
      {gqlResult()}
      <PostsListRelayCursor />
    </>
  )
};

export default PostsPage;