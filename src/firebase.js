import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWzsHzW6DxXnd-xNH8S55GkDu7nqIF6Hg",
  authDomain: "mfasimulator-2b102.firebaseapp.com",
  projectId: "mfasimulator-2b102",
  storageBucket: "mfasimulator-2b102.firebasestorage.app",
  messagingSenderId: "478572047299",
  appId: "1:478572047299:web:ec665cd1770e1365ab6b76",
  measurementId: "G-LD3P7GFSRM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const generateUniqueRunCode = async () => {
    let runCode;
    let isUnique = false;

    while (!isUnique) {
        runCode = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');

        // Check if this code already exists in Firestore
        const runRef = doc(db, "runs", runCode);
        const runSnapshot = await getDoc(runRef);

        if (!runSnapshot.exists()) {
            isUnique = true;
        }
    }

    const runDetails = {
        code: runCode,
        status: "active",
        startTime: new Date(),
        endTime: null,
        phone: false,
        story: false,
        password: null,
        security_questions: null,
        authentication_app: null,
        text_code: null,
        email_code: null,
        fingerprint: null,
        smart_card: null,
        voice: null,
    };

    await setDoc(doc(db, "runs", runCode), runDetails);
    return runCode;
};

const startStory = async (runCode) => {
  try {
    const runRef = doc(db, "runs", runCode);
    const updateData = {
      story: true,
      password: 0,
      text_code: 0,
      fingerprint: 0,
      smart_card: 0,
    };
    await setDoc(runRef, updateData, { merge: true });
  } catch (error) {
    console.error("Error starting story code:", error);
  }
};

const updateField = async (runCode, section, value) => {
  try {
    const runRef = doc(db, "runs", runCode);
    const updateData = {
      [section]: value,
    };
    await setDoc(runRef, updateData, { merge: true });
  } catch (error) {
    console.error("Error updating run code:", error);
  }
};

const endRun = async (runCode) => {
  try {
    const runRef = doc(db, "runs", runCode);
    await setDoc(runRef, {
        status: 'completed',
        endTime: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error("Error ending run code:", error);
  }
};

export default {
  generateUniqueRunCode,
  startStory,
  updateField,
  endRun,
};