// Following firebase firestore functions. colloection, addDoc, where, query, deleteDoc, updateDoc, doc from firebase/firestore
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
// Connections
import { fire_db } from "@/firebase/firebase.config"; // Assuming you have set up the Firebase configuration
import { useSelector } from "react-redux";

// Function to get a user by their ID
export const getUserById = async (docId) => {
  const userRef = doc(db, "users", userId); // Reference to the specific user document

  try {
    // Retrieve the user document
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // The user document exists; return its data
      return userDoc.data();
    } else {
      // The user document does not exist
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// Usage example:
// getUserById(userId)
//   .then((user) => {
//     if (user) {
//       console.log("User data:", user);
//     } else {
//       console.log("User not found");
//     }
//   })
//   .catch((error) => {
//     console.error("Failed to get user:", error);
//   });

// Function to get all users in the 'users' collection
async function getAllUsers() {
  const usersCollection = collection(db, "users"); // Reference to the 'users' collection

  try {
    // Retrieve all user documents
    const querySnapshot = await getDocs(usersCollection);
    const users = [];

    querySnapshot.forEach((doc) => {
      // Add each user's data to the 'users' array
      users.push(doc.data());
    });

    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
}

// Usage example:
// getAllUsers()
//   .then((users) => {
//     console.log('All users:', users);
//   })
//   .catch((error) => {
//     console.error('Failed to get all users:', error);
//   });

// Function to create a user record in Firestore
export const createUserRecord = async (user) => {
  try {
    // Extract the serializable properties from the user object
    const {
      uid,
      displayName,
      email,
      phoneNumber,
      photoURL,
      isAnonymous,
      metadata,
    } = user;

    await setDoc(doc(fire_db, "users", uid), {
      uid,
      displayName,
      email,
      phoneNumber,
      photoURL,
      isAnonymous,
      createdAt: metadata.creationTime,
      lastLoginAt: metadata.lastSignInTime,
    });
  } catch (error) {
    throw error;
  }
};

// Function to update a user's details in Firestore
export const updateUserRecord = async (docId, currentData, updatedData) => {
  const userRef = doc(fire_db, "users", docId); // Reference to the specific user document
  const updatedProperties = dataSanitizer(currentData, updatedData);

  // Create an object with the updated data, including a timestamp
  const updatedUserData = {
    ...updatedProperties,
    updatedAt: serverTimestamp(), // Add a 'updatedAt' field with the current timestamp
  };

  try {
    // Update the document with the new data
    await updateDoc(userRef, updatedUserData);

    // Optionally, you can retrieve and return the updated user data
    const updatedUserSnapshot = await getDocs(
      query(collection(fire_db, "users"), where("uid", "==", docId))
    );
    const updatedUser = updatedUserSnapshot.docs[0].data();

    return updatedUser;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

// Function to delete a user by their ID
export const deleteUserRecordById = async (docId) => {
  const userRef = doc(db, "users", docId); // Reference to the specific user document

  try {
    // Delete the user document
    await deleteDoc(userRef);
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Usage example:
// deleteUserRecordById(userId)
//   .then(() => {
//     console.log('User deleted successfully');
//   })
//   .catch((error) => {
//     console.error('Failed to delete user:', error);
//   });

const dataSanitizer = (currentData, updatedData) => {
  const updatedProperties = {};

  for (const key in updatedData) {
    if (updatedData.hasOwnProperty(key)) {
      // Check if the key exists in currentData and the values are different
      if (
        currentData[key] !== undefined &&
        currentData[key] !== updatedData[key]
      ) {
        updatedProperties[key] = updatedData[key];
      }
    }
  }
  return updatedProperties;
};
