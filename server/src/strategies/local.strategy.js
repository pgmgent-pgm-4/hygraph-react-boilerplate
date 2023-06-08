// Import external modules
import passport from 'passport';
import { Strategy } from 'passport-local';
import { AwesomeGraphQLClient } from 'awesome-graphql-client';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

// Import custom modules
import settings from '../config/settings';
import { HTTPError } from '../utils';

const localStrategy = () => {
  const queryGetUserByUsername = `
    query getUserByUsername($username: String!) {
      authUser(where: { username: $username }) {
        id,
        username,
        email,
        password
      }
    }
  `;

  const mutationCreateUser = `
  mutation CreateAuthUser($username: String = "", $password: String = "", $email: String = "") {
      createAuthUser(data: {username: $username, password: $password, email: $email}) {
        id
        password
        username
        email
      }
    }
  `;

  const client = new AwesomeGraphQLClient({
    endpoint: `${settings.HYGRAPH_CONTENT_API}`,
    fetch,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${settings.HYGRAPH_ACCESS_TOKEN}`,
      },
    },
  });

  passport.use('login', new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const { authUser } = await client.request(queryGetUserByUsername, { username });

        if (!authUser) {
          throw new HTTPError('User does no exists', 404);
        }

        if (password !== authUser.password) {
          throw new HTTPError('Incorrect Credentials', 404);
        }

        const userPayload = {
          id: authUser.id,
          username: authUser.username,
          email: authUser.email,
        };

        const token = jwt.sign({ user: userPayload }, settings.JWT_SECRET, {
          expiresIn: settings.JWT_EXPIRE,
        });

        const authenticated = {
          ...userPayload,
          token,
        };

        done(null, authenticated);
      } catch (error) {
        done(error);
      }
    },
  ));

  passport.use('signup', new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        // Get all the signup fields
        const { email } = req.body;

        // Create the AuthUser in Hygraph
        const { createAuthUser } = await client.request(mutationCreateUser, { username, password, email });

        // Error
        if (!createAuthUser) {
          throw new HTTPError(`Can't create the user with username: ${username}`, 404);
        }

        const userPayload = {
          id: createAuthUser.id,
          username: createAuthUser.username,
          email: createAuthUser.email,
        };

        const token = jwt.sign({ user: userPayload }, settings.JWT_SECRET, {
          expiresIn: settings.JWT_EXPIRE,
        });

        const authenticated = {
          ...userPayload,
          token,
        };

        done(null, authenticated);
      } catch (error) {
        done(error);
      }
    },
  ));
};

export default localStrategy;
