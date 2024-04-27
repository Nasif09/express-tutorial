import passport from "passport";
import { Strategy } from "passport-discord";


export default passport.use(
    new Strategy(
        {
            clientID: "1233077370739622040",
            clientSecret: "b2dbd0e149d56bdca845d443e0bdea994e24c7110eb58874d3af0a356308f628",
            callbackURL: "http://localhost:3000/api/auth/discord/redirect",
            scope: ["identify"],
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("accessToken:", accessToken);
            console.log("refreshToken:", refreshToken);
            console.log("profile:", profile);

            // Implement your logic for handling the authenticated user profile here

            // Call done() to indicate the completion of the authentication process
            // For example: done(null, user);
        }
    )
);
