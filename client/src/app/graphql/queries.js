import { gql } from "@apollo/client";

export const GET_ALL_COMMUNITIES = gql`
query GetAllCommunities {
  communities {
    name
    id
    description
    createdAt
    authUser {
      username
    }
  }
}
`;

export const GET_ALL_POSTS_SMALL = gql`
query GetAllPosts {
  posts {
    id
    title
  }
}
`;

export const GET_POSTS_WITH_RELAY_CURSOR = gql`
query GetPostsWithRelayCursor($first: Int = 20, $after: String = null) {
  postsConnectionRelayCursor: postsConnection(first: $first, after: $after) {
    pageInfo {
      hasNextPage 
      endCursor  
    }
    edges {
      node {
        id
        title
      }
    }
  }
}
`;

export const GET_POSTS_WITH_PAGINATION = gql`
query GetPostsWithPagination($first: Int = 20, $skip: Int = 0) {
  postsConnectionPagination: postsConnection(first: $first, skip: $skip) {
    pageInfo {
      hasNextPage
      endCursor
      pageSize
      hasPreviousPage
    }
    aggregate {
      count
    }
    edges {
      node {
        id
        title
      }
    }
  }
}
`;

export const GET_POST_DETAILS = gql`
query GetPostById ($postId: ID!) {
  post(where: {id: $postId}) {
    id
    title
    synopsis
    body {
      html
    }
    thumbnailUrl
    authUser {
      username,
      profile {
        firstName
        lastName
      }
    }
    tags {
      name
    }
    category {
      name
    }
  }
}
`;