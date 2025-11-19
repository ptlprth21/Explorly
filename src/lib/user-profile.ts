import { 
  updateProfile, 
  updateEmail, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential,
  User
} from "firebase/auth";

export async function reauthenticateUser(user: User, currentPassword: string) {
  const credential = EmailAuthProvider.credential(user.email!, currentPassword);
  await reauthenticateWithCredential(user, credential);
}

export async function updateUserProfile(user: User, displayName: string, photoURL?: string) {
  return await updateProfile(user, { displayName, photoURL });
}

export async function updateUserEmail(user: User, newEmail: string, currentPassword: string) {
  await reauthenticateUser(user, currentPassword);
  return await updateEmail(user, newEmail);
}

export async function updateUserPassword(user: User, currentPassword: string, newPassword: string) {
  await reauthenticateUser(user, currentPassword);
  return await updatePassword(user, newPassword);
}