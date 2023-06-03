import axios from 'axios';

/* Axios Service that deals with Project Requests */

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/projects
  createProject = requestBody => {
    return this.api.post('/api/user', requestBody);
  };

  // GET /api/projects
  getAllProjects = () => {
    return this.api.get('/api/user');
  };

  // GET /api/projects/:id
  getProject = id => {
    return this.api.get(`/api/user/${id}`);
  };

  // PUT /api/projects/:id
  updateProject = (id, requestBody) => {
    return this.api.put(`/api/user/${id}`, requestBody);
  };

  // DELETE /api/projects/:id
  deleteProject = id => {
    return this.api.delete(`/api/user/${id}`);
  };
}

// Create one instance object
const userService = new UserService();

export default userService;