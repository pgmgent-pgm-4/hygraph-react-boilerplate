// Import external modules
import { useEffect, useState } from 'react';
import {
  useQuery,
} from "@apollo/client";
import { Button } from 'reactstrap';

// Import custom components
import { GET_POSTS_WITH_RELAY_CURSOR } from '../../graphql';
import PostsListComponent from "./posts-list.component";

const PostsListRelayCursor = ({}) => {
  const { data, loading, fetchMore } = useQuery(GET_POSTS_WITH_RELAY_CURSOR, {
    variables: {
      first: 10,
      after: null,
    },
  });

  const [nodes, setNodes] = useState();
  const [pageInfo, setPageInfo] = useState();

  useEffect(() => {
    if (!!data) {
      console.log(data);
      setNodes(data.postsConnectionRelayCursor.edges.map((edge) => edge.node));
      setPageInfo(data.postsConnectionRelayCursor.pageInfo);
    }
    return () => {}
  }, [data])

  return (
    <div>
      <PostsListComponent posts={nodes} />
      <Button color="primary" onClick={() => {
        if (pageInfo.hasNextPage) {
          fetchMore({
            variables: {
              first: 10,
              after: pageInfo.endCursor,
            },
          });
        }
      }}>
        Load more...
      </Button>
    </div>
  )
};

export default PostsListRelayCursor;