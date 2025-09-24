// Authentication service
// This is a basic implementation for demonstration purposes
// In production, this would integrate with a proper auth provider

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

// Simulate authentication API call
export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // For testing purposes, accept any email/password combination
  // In production, this would validate against a real authentication service
  if (credentials.email || !credentials.email) { // Accept any input for now
    const user: User = {
      id: '1',
      email: credentials.email || 'test@example.com',
      name: 'Test User',
      role: 'user'
    }
    
    return {
      success: true,
      user,
      token: 'mock-jwt-token-' + Date.now()
    }
  }
  
  return {
    success: false,
    error: 'Invalid credentials'
  }
}

// Get platform URL based on user role/account
export function getPlatformUrl(user: User): string {
  // For now, all users go to the same platform
  // In the future, this could route to different dashboards based on user role
  return 'http://localhost:3001'
}

// Store authentication token (in production, use secure storage)
export function storeAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

// Get stored authentication token
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

// Clear authentication
export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}
