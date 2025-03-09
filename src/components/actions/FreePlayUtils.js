import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import firebaseUtils  from '../../firebase.js';

const useVariables = (current) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const runCode = queryParams.get('runCode');

  const [phone, setPhone] = useState(null);
  const [finished, setFinished] = useState(null);

  useEffect(() => {
    const fetchPhone = async () => {
      const phoneData = await firebaseUtils.getField(runCode, "phone");
      setPhone(phoneData);
      const task_finished = await firebaseUtils.getField(runCode, current);
      if (task_finished !== "started") {
        firebaseUtils.updateField(runCode, current, "started");
      }
    };
    fetchPhone();
  }, [runCode, current]);

  firebaseUtils.updateField(runCode, "status", "active");
  firebaseUtils.useWaitForFinished(runCode, current);

  return { runCode, phone, finished };
};

const useNextMFA = (current) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const runCode = queryParams.get('runCode');

  return async () => {
    await firebaseUtils.updateField(runCode, current, "finished");
    const position = await firebaseUtils.getField(runCode, "position");
    await firebaseUtils.updateField(runCode, "position", position + 1);
    window.location.reload();
  };
};

export default {
  useVariables,
  useNextMFA,
};


