const WebpackExternalImport = require("webpack-external-import");

module.exports = {
  // Your webpack configuration settings...

  plugins: [
    // Other plugins...

    new WebpackExternalImport({
      external: (context, request, callback) => {
        // Check if the request is an HTTP URL
        if (request.startsWith("http://") || request.startsWith("https://")) {
          // Allow loading resources from HTTP URLs
          return callback(null, `commonjs ${request}`);
        }
        // Continue with default handling for other requests
        return callback();
      },
    }),
  ],
};
