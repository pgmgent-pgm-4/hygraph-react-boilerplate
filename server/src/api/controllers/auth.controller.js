// Import external modules
import passport from 'passport';

// Import custom modules
import { handleHTTPError, HTTPError } from '../../utils';

const login = (req, res, next) => {
  passport.authenticate('login', async (err, authenticated, info) => {
    try {
      if (err || !authenticated) {
        throw err;
      }

      return res.status(200).json(authenticated);
    } catch (error) {
      return handleHTTPError(error, next);
    }
  })(req, res, next);
};

const signup = async (req, res, next) => {
  passport.authenticate('signup', async (err, authenticated, info) => {
    try {
      if (err || !authenticated) {
        throw err;
      }

      return res.status(200).json(authenticated);
    } catch (error) {
      return handleHTTPError(error, next);
    }
  })(req, res, next);
};

const logout = (req, res, next) => {
  try {
    if (typeof req.logout === 'function') {
      req.logout((logoutError) => {
        if (logoutError) { throw logoutError; }
        req.session.destroy((sessionError) => {
          if (sessionError) { throw sessionError; }
          req.session = null;
        });
      });
    }
    return res.status(200).json(req.body);
  } catch (error) {
    return handleHTTPError(error, next);
  }
};

export default {
  login,
  logout,
  signup,
};
