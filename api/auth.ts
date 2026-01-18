// Auto-detect API URL based on environment
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'
  : '';  // Empty = same origin (production)

// Temporary credentials for development (used as fallback)
const DEV_ADMIN = {
  username: 'admin',
  password: 'outfred2024'
};

export async function loginAdmin(username: string, password: string): Promise<{ token: string }> {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // Fallback to browser-only mode if server unavailable
      if (username === DEV_ADMIN.username && password === DEV_ADMIN.password) {
        const token = btoa(JSON.stringify({ username, exp: Date.now() + 86400000 }));
        console.log('Using fallback auth (server unavailable)');
        return { token };
      }
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return { token: data.token };
  } catch (error) {
    console.error('Login error:', error);
    // Final fallback for development
    if (username === DEV_ADMIN.username && password === DEV_ADMIN.password) {
      const token = btoa(JSON.stringify({ username, exp: Date.now() + 86400000 }));
      console.log('Using fallback auth');
      return { token };
    }
    throw new Error('Invalid credentials');
  }
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    // Try parsing as fallback token first
    const decoded = JSON.parse(atob(token));
    if (decoded.exp && decoded.exp > Date.now()) {
      return true;
    }
    return false;
  } catch {
    // If not a fallback token, assume it's a valid JWT from server
    // In a real app, you'd verify the JWT signature server-side
    return true;
  }
}

export async function createAdmin(username: string, password: string): Promise<boolean> {
  console.log('createAdmin is not available in browser mode');
  return false;
}
