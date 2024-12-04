import { initDatabase, addUser, getUserByEmail } from '../db/database';

export async function signup(name: string, email: string, password: string) {
  await initDatabase();
  
  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create new user
  const user = await addUser(email, password, name);
  
  const userWithoutPassword = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  return userWithoutPassword;
}

export async function login(email: string, password: string) {
  await initDatabase();
  
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}