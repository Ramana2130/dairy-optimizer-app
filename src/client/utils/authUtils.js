
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null; // Return true if token exists
  };
  