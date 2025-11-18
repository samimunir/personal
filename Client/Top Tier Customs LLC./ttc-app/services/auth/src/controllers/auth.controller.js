export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Email and password are required.");
      err.status = 400;

      throw err;
    }

    return res
      .status(201)
      .json({ message: "User registered (stub)", user: { email } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Email and password are required.");
      err.status = 400;

      throw err;
    }

    return res
      .status(200)
      .json({
        message: "User logged in (stub)",
        user: { email },
        token: "fake-jwt-token",
      });
  } catch (err) {
    next(err);
  }
};
