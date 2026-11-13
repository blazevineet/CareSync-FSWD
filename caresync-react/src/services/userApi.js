import { USER_API } from '../config';

export async function loginApi(email, password) {
  try {
    const response = await fetch(`${USER_API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || 'Invalid email or password.');
    }
    return { user: data, isLive: true };
  } catch (err) {
    if (err.message.includes('Invalid email')) {
      throw err;
    }
    // If backend is unreachable, throw connection info
    throw new Error('Unable to connect to User Service (port 8082). Please make sure user-service is running.');
  }
}

export async function registerApi(name, email, password) {
  try {
    const response = await fetch(USER_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed.');
    }
    return { user: data, isLive: true };
  } catch (err) {
    if (err.message && !err.message.includes('Failed to fetch')) {
      throw err;
    }
    throw new Error('Unable to connect to User Service (port 8082). Please ensure user-service is running.');
  }
}
