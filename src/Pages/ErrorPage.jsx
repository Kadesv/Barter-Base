import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const getErrorMessage = () => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return {
            title: "Access Denied",
            message: "You need to log in to access this page.",
            linkText: "Return to Homepage",
            linkPath: "/"
          };
        case 404:
          return {
            title: "Page Not Found",
            message: "The page you're looking for doesn't exist.",
            linkText: "Go back to safety",
            linkPath: "/"
          };
        case 500:
          return {
            title: "Server Error",
            message: "Something went wrong on our end. Please try again later.",
            linkText: "Try again",
            linkPath: "/"
          };
        default:
          return {
            title: "Error",
            message: "An unexpected error has occurred.",
            linkText: "Return to Homepage",
            linkPath: "/"
          };
      }
    } else {
      return {
        title: "Unexpected Error",
        message: error.statusText || error.message || "An unknown error occurred.",
        linkText: "Return to Homepage",
        linkPath: "/"
      };
    }
  };

  const { title, message, linkText, linkPath } = getErrorMessage();

  return (
    <div className="error-page flex flex-col items-center justify-center min-h-screen bg-base-300 text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-red-600">{title}</h1>
      <p className="text-lg mb-4">{message}</p>
      {error.statusText || error.message ? (
        <p className="italic text-gray-600 mb-4">{error.statusText || error.message}</p>
      ) : null}
      <Link
        to={linkPath}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default ErrorPage;
