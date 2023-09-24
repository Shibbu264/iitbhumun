import Cors from 'cors';

// Initialize the CORS middleware
export const initMiddleware = (middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

// Example usage:
// const corsMiddleware = initMiddleware(
//   Cors({
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     origin: 'https://example.com',
//   })
// );

// export { corsMiddleware };
