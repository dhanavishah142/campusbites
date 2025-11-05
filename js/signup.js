  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBy5yfr3yYuMSDFHWwp0LdRhQASe2EKx78",
  authDomain: "campusbites-a7d47.firebaseapp.com",
  projectId: "campusbites-a7d47",
  storageBucket: "campusbites-a7d47.appspot.com",
  messagingSenderId: "287799383807",
  appId: "1:287799383807:web:80dcc43f75b5e226241eca"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const fullName = signupForm.fullname.value.trim();
  const email = signupForm.email.value.trim();
  const role = signupForm.role.value;
  const password = signupForm.password.value;
  const confirmPassword = signupForm.confirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: fullName });

    await setDoc(doc(db, "users", user.uid), {
      name: fullName,
      email: email,
      role: role,
      reviewCount: 0,
      createdAt: new Date()
    });

    alert("Account created successfully!");
    window.location.href = "index.html"; 

  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
});

