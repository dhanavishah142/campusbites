import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      }));

      alert(`Welcome back, ${userData.name}!`);
      window.location.href = "index.html";
    } else {
      alert("User data not found. Please sign up again.");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert(err.message);
  }
});

