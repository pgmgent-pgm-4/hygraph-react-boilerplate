import { faker } from '@faker-js/faker';
import fetch from 'node-fetch';
import { generateValueBetweenMinAndMax, generateTimestamps } from './utils';

import client from './graphql_client';

const mutationCreateCategory = `
mutation createCategory($name: String = "", $description: String = "") {
  createCategory(
    data: {name: $name, description: $description }){
      id
      name
      description
      parentCategory {
        id
        name
      }
      createdAt
      updatedAt
    }
}`;

(async () => {
  /*
   * Create a Tag (Local Provider)
  */
  const createCategory = async ({ name, description, parentCategoryId = null}) => {
    try {
      const { createCategory } = await client.request(mutationCreateCategory, { name, description });

      if (!createCategory) {
        throw new Error(`Can't create the category with name ${name}!`);
      }

      console.log(`Category created with name ${createCategory.name}!`);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create categories via promises
  */
  const createCategories = async (n = 30) => {
    for (let i = 0 ; i < n ; i++) {
      await new Promise(resolve => setTimeout(resolve, 300 * i)).then(() => createCategory({ name: faker.lorem.words(generateValueBetweenMinAndMax(4, 10)), description: faker.lorem.sentence(generateValueBetweenMinAndMax(4, 10)) }));
    }
  };

  /*
   * Create tags
  */
  createCategories();

})();
