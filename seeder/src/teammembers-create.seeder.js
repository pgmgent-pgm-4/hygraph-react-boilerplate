import { faker } from '@faker-js/faker';

import client from './graphql_client';
import { generateValueBetweenMinAndMax, generateTimestamps } from './utils';
import uploadMediumByRemoteUrl from './upload-medium';

const mutationCreateTeamMember = `
mutation CreateTeamMember($firstName: String = "", $lastName: String = "", $memberType: TeamMemberType = Student, $jobTitle: String = "", $id: ID = "") {
  createTeamMember(
    data: {firstName: $firstName, lastName: $lastName, memberType: $memberType, jobTitle: $jobTitle, picture: {connect: {id: $id}}}
  ) {
    id
    lastName
    jobTitle
    firstName
    memberType
    picture {
      id
      height
      handle
      mimeType
      url
      width
      size
    }
  }
}
`;

const memberTypes = [
  'Student',
  'Lecturer',
  'Alumni',
];

(async () => {
  /*
   * Create a TeamMember
  */
  const createTeamMember = async ({ firstName, lastName, jobTitle, avatarUrl, memberType, pictureId }) => {
    try {
      const { createTeamMember } = await client.request(mutationCreateTeamMember, {
        firstName,
        lastName,
        memberType,
        jobTitle,
        id: pictureId,   
      });

      if (!createTeamMember) {
        throw new Error(`Can't create the teammember with name ${createTeamMember.firstName} ${createTeamMember.lastName}`);
      }

      console.log(`Teammember created with name ${createTeamMember.firstName} ${createTeamMember.lastName}!`);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create teammembers
  */
  const createTeamMembers = async (n = 20) => {
    for (let i = 0; i < n; i++) {
      const result = await uploadMediumByRemoteUrl(faker.image.avatarGitHub());
      await createTeamMember({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        jobTitle: faker.person.jobTitle(),
        avatarUrl: faker.image.avatarGitHub(),
        memberType: memberTypes[generateValueBetweenMinAndMax(0, memberTypes.length - 1)],
        pictureId: result.id,
      });
    };
  };

  /*
   * Create posts
  */
  await createTeamMembers(12);

})();