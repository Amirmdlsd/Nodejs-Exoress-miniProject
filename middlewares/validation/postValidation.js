import joi from "joi";

const postValidator = async (req, res, next) => {
  const postSchema = joi.object({
    title: joi.string().min(5).required().messages({
      "string.base": "نام نوشته باید رشته باشد",
      "string.min": "نام نوشته باید حداقل 5 کاراکتر باشد",
      "any.required": "لطفا نام نوشته را وارد کنید",
      "string.empty": "لطفا نام نوشته را وارد کنید"
    }),
    body: joi.string().min(10).required().messages({
      "string.base": "متن نوشته باید رشته باشد",
      "string.min": "متن نوشته باید حداقل 10 کاراکتر باشد",
      "any.required": "لطفا متن نوشته را وارد کنید",
      "string.empty": "لطفا متن نوشته را وارد کنید"
    })

  });

  try {
    await postSchema.validateAsync(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const errorMessage = error.details.map(detail => detail.message).join(", ");
    return res.status(400).json({
      message: errorMessage,
      statusCode: 400
    });
  }
};

export { postValidator };
