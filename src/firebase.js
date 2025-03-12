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

// Generate a generic run document to store a run
const generateUniqueRunCode = async () => {
    let runCode;
    let isUnique = false;

    // Generate a run code until a unique code is generated
    while (!isUnique) {
        runCode = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
        const runRef = doc(db, "runs", runCode);
        const runSnapshot = await getDoc(runRef);
        if (!runSnapshot.exists()) {
            isUnique = true;
        }
    }

    // Generate the initial run details
    const runDetails = {
        code: runCode,
        status: "active",
        startTime: new Date(),
        endTime: null,
        phone: false,
        story: false,
        context: false,
        password: null,
        security_questions: null,
        authentication_app: null,
        text_task: null,
        email_task: null,
        fingerprint: null,
        smart_card: null,
        voice: null,
    };

    // Create the document
    await setDoc(doc(db, "runs", runCode), runDetails);
    return runCode;
};

// Turn a generic run document into a story document
const startStory = async (runCode, phone_flag) => {
  try {
    // Set initial generic tasks
    const runRef = doc(db, "runs", runCode);
    await setDoc(runRef, {
      story: true,
      password: "not started",
      text_task: "not started",
      fingerprint: "not started",
    }, { merge: true });

    // Set last task based on app usage
    const additionalData = phone_flag
      ? { authentication_app: "not started" }
      : { smart_card: "not started" };

    // Set the fields
    await setDoc(runRef, additionalData, { merge: true });
  } catch (error) {
    console.error("Error starting story code:", error);
  }
};

// Turn a generic run document into a free play document
const startFreePlay = async (runCode, context) => {
  try {
    // Get the authentication methods
    const runRef = doc(db, "runs", runCode);

    // Turn the context into a binary number e.g. 11 -> 1101
    const binaryString = parseInt(context).toString(2).split('').map(bit => parseInt(bit, 10)).reverse();

    // Match each number to an authentication method
    const updateData = {};
    const authenticators = ["password","security_questions","authentication_app","text_task","email_task","fingerprint","smart_card","voice"];
    for (let i = 0; i < (binaryString.length); i++) {
      if (binaryString[i] === 1) {
        updateData[authenticators[i]] = "not started";
      }
    }
    updateData["context"] = parseInt(context);

    // Set the fields
    await setDoc(runRef, updateData, { merge: true });
  } catch (error) {
    console.error("Error starting freeplay code:", error);
  }
};

// Get a field in a run document
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

// Set a field in a run document
const setField = async (runCode, section, value) => {
  try {
    const runRef = doc(db, "runs", runCode);
    const docSnap = await getDoc(runRef);
    if (!docSnap.exists()) {
      console.error("No such document!");
      return null;
    }
    const updateData = {[section]: value,};
    await setDoc(runRef, updateData, { merge: true });
  } catch (error) {
    console.error("Error updating run code:", error);
  }
};

// Finish a run document
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


// Listen to an authentication method for 'finished'
const useWaitForFinished = (runCode, section) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    try {
      const runRef = doc(db, "runs", runCode);

      // Create a subscriber to the document section
      const unsubscribe = onSnapshot(runRef, (runSnapshot) => {
        if (runSnapshot.exists()) {
          const data = runSnapshot.data();

          // Return and unsubscribe on completion
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

export default {
  generateUniqueRunCode,
  startStory,
  startFreePlay,
  setField,
  getField,
  endRun,
  useWaitForFinished,
};