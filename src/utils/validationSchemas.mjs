export const createUserValidationSchema = {
    username: {
        isLength: {
            options: {
                min: 3,
                max: 5,
            },
            errorMessage: "Username Must be 3-5 charecters ",
        },
        notEmpty: {
            errorMessage: "Username can not be Empty",
        },
        isString: {
            errorMessage: "Username Must be string",
        },
    },
    
    displayname: {
        notEmpty: true,
    },
};