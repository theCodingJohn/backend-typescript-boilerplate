import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const checkNodeENV = () => {
  if (NODE_ENV === "development") return process.env.DEV_MONGODB_URI;
  if (NODE_ENV === "test") return process.env.TEST_MONGODB_URI;
  if (NODE_ENV === "production") return process.env.MONGODB_URI;
  else {
    return process.env.MONGODB_URI;
  }
};

const PORT = process.env.PORT as string;
const MONGODB_URI = checkNodeENV() as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

export default { PORT, MONGODB_URI, NODE_ENV, JWT_SECRET };
