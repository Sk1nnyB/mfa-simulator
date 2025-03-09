import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

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
        context: false,
        position: 1,
        password: null,
        security_questions: null,
        authentication_app: null,
        text_task: null,
        email_task: null,
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
      password: "not started",
      text_task: "not started",
      fingerprint: "not started",
      smart_card: "not started",
    };
    await setDoc(runRef, updateData, { merge: true });
  } catch (error) {
    console.error("Error starting story code:", error);
  }
};

const startFreePlay = async (runCode, context) => {
  try {
    const runRef = doc(db, "runs", runCode);

    const binaryString = parseInt(context).toString(2).split('').map(bit => parseInt(bit, 10)).reverse();
    const updateData = {};
    const authenticators = ["password","security_questions","authentication_app","text_task","email_task","fingerprint","smart_card","voice"];
    for (let i = 0; i < (binaryString.length); i++) {
      if (binaryString[i] === 1) {
        updateData[authenticators[i]] = "not started";
      }
    }

    updateData["context"] = parseInt(context);

    await setDoc(runRef, updateData, { merge: true });
  } catch (error) {
    console.error("Error starting freeplay code:", error);
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

const getField = async (runCode, section) => {
  try {
    const runRef = doc(db, "runs", runCode);
    const docSnap = await getDoc(runRef);

    if (docSnap.exists()) {
      return docSnap.data()[section];
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching field:", error);
    return null;
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

const useWaitForFinished = (runCode, section) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    try {
      const runRef = doc(db, "runs", runCode);

      const unsubscribe = onSnapshot(runRef, (runSnapshot) => {
        if (runSnapshot.exists()) {
          const data = runSnapshot.data();
          if (data[section] === "finished") {
            setStatus("finished");
            unsubscribe();
          }
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error waiting for run to finish:", error);
    }
  }, [runCode, section]);

  return status;
};

// Function to get position reference listener

export default {
  generateUniqueRunCode,
  startStory,
  startFreePlay,
  updateField,
  getField,
  endRun,
  useWaitForFinished,
};