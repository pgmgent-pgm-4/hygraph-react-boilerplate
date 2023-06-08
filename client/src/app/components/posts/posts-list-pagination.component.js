// Import external modules
import { useEffect, useState } from 'react';
import {
  useQuery,
} from "@apollo/client";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// Import custom components
import { GET_POSTS_WITH_PAGINATION } from '../../graphql';
import PostsListComponent from "./posts-list.component";

const PostsListPagination = ({}) => {
  const { data, loading, refetch } = useQuery(GET_POSTS_WITH_PAGINATION, {
    variables: {
      first: 10,
      skip: 0,
    },
  });

  const [nodes, setNodes] = useState();
  const [pageInfo, setPageInfo] = useState();
  const [offset, setOffset] = useState(0);

  const handleOffset = (skip) => {
    console.log(skip);
    setOffset(skip);
  };

  useEffect(() => {
    if (!!data) {
      console.log(data);
      setNodes(data.postsConnectionPagination.edges.map((edge) => edge.node));
      setPageInfo(data.postsConnectionPagination.pageInfo);
    }
    return () => {}
  }, [data]);

  useEffect(() => {
    refetch({
      variables: {
        first: 10,
        skip: offset,
      },
    });
    return () => {}
  }, [offset]);

  return (
    <div>
      <PostsListComponent posts={nodes} />
      {/* <Button color="primary" onClick={() => {
        if (pageInfo.hasPreviousPage) {
          fetchMore({
            variables: {
              first: 10,
              skip: offset,
            },
          });
        }
      }}>
        Load more...
      </Button> */}
      <Pagination
        aria-label="Paged posts"
        size="sm"
      >
        <PaginationItem>
          <PaginationLink
            first
            href="#"
          />
        </PaginationItem>
        {pageInfo && pageInfo.hasPreviousPage && (
          <PaginationItem>
            <PaginationLink
              href="#"
              previous
            />
          </PaginationItem>
        )}
        {/* <PaginationItem>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            next
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            last
          />
        </PaginationItem> */}
        {pageInfo && pageInfo.hasNextPage && (
          <PaginationItem>
            <PaginationLink
              href="#"
              next
              onClick={() => handleOffset(offset + 1)}
            />
          </PaginationItem>
        )}
      </Pagination>
    </div>
  )
};

export default PostsListPagination;