
import joi from "joi";
const userValidator = async (req, res, next) => {
  const userSchema = joi.object({
    name: joi.string().min(3).required().messages({
      "string.base": "نام کاربری باید رشته باشد",
      "string.min": "نام کاربری باید حداقل 5 کاراکتر باشد",
      "any.required": "لطفا نام کاربری را وارد کنید",
      "string.empty": "لطفا نام کاربری را وارد کنید"
    }),
    email: joi.string().email().required().messages({
      "string.base": "ایمیل باید رشته باشد",
      "string.email": "ایمیل وارد شده صحیح نمی باشد",
      "any.required": "لطفا ایمیل را وارد کنید",
      "string.empty": "لطفا ایمیل را وارد کنید"
    }),
    password: joi.string().min(4).required().messages({
      "string.base": "رمز عبور باید رشته باشد",
      "string.min": "رمز عبور باید حداقل 8 کاراکتر باشد",
      "any.required": "لطفا رمز عبور را وارد کنید",
      "string.empty": "لطفا رمز عبور را وارد کنید"
    })
  });

  await userSchema
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err =>
      res.status(400).json({
        message: err.details.map(detail => detail.message).join(", "),
        statusCode: 400
      })
    );
};




export {userValidator}