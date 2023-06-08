// Import external modules
import { useQuery } from "@apollo/client";
import { ListGroup, ListGroupItem } from 'reactstrap';

// Import custom modules
import { GET_ALL_COMMUNITIES } from '../../graphql';

const CommunitiesList = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMMUNITIES);

  const gqlResultAsJSX = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.toString()}</p>;

    return (
      <div className="card communities-list">
        <div className="card-header">
          Communities
        </div>
        <ListGroup>
        {data && data.communities && data.communities.map(community => 
          <ListGroupItem key={ community.id }>
            <h2>{ community.name }</h2>
            <p>{ community.description }</p>
          </ListGroupItem>
        )}
        </ListGroup>
      </div>
    )
  };

  return (
    <>
      {
        gqlResultAsJSX()
      }
    </>
  )
};

export default CommunitiesList;