const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  const token = jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
    },
    process.env.JWT_SECRET
  )
    return {token: token, userId: user._id}
}

module.exports = createToken;