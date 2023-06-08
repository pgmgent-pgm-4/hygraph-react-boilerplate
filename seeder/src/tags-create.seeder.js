import faker from '@faker-js/faker';
import fetch from 'node-fetch';
import client from './graphql_client';

const mutationCreateTag = `
mutation CreateTagMutation($name: String!) {
  __typename
  createTag(data: {name: $name}) {
    id,
    name
  }
}`;

(async () => {
  /*
   * Create a Tag (Local Provider)
  */
  const createTag = async (name) => {
    try {
      const { createTag } = await client.request(mutationCreateTag, { name });

      if (!createTag) {
        throw new Error(`Can't create the tag with name ${createTag.name}!`);
      }

      console.log(`Tag created with name ${createTag.name}!`)
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create tags via promises
  */
  const createTags = async () => {
    const response = await fetch('https://www.gdm.gent/static/data/cases.json');
    const cases = await response.json();
    const tags = [...new Set(cases.flatMap(project => project.Tags))];
    tags.forEach(async (tag, index) => {
      await new Promise(resolve => setTimeout(resolve, 300 * index)).then(() => createTag(tag));
    });
  };

  /*
   * Create tags
  */
  createTags();

})();
