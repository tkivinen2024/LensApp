const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const getUserById = require("./db/services/user/getUserById");

module.exports = (passport, secret) => {
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
                secretOrKey: secret,
            },
            (payload, done) => {
                getUserById(payload._id)
                    .then((user) => {
                        if (user) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        done(err, false);
                    });
            }
        )
    );
};
