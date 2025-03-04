import { useNavigate, useLocation } from 'react-router-dom';
import firebaseUtils  from '../../firebase.js';

const useVariables = (current) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const runCode = queryParams.get('runCode');
  const phone = parseInt(queryParams.get('phone'));
  const finished = firebaseUtils.useWaitForFinished(runCode, current);
  return { runCode, phone, finished };
};

const useNextMFA = (current) => {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    const queryParams = new URLSearchParams(location.search);
    const context = queryParams.get('context');
    const story = parseInt(queryParams.get('story'), 10);
    const runCode = queryParams.get('runCode');
    const phone = queryParams.get('phone');

    if (context) {
      const pos = parseInt(context[context.length - 1], 16);
      const nextContext = (parseInt(context, 16) + 1).toString(16).toUpperCase().padStart(4, '0');

      const navigateOptions = { replace: pos !== 0 };
      navigate(`/play?context=${nextContext}&phone=${phone}&runCode=${runCode}`, navigateOptions);
      return;
    }

    navigate(`/play?story=${story+1}&phone=${phone}&runCode=${runCode}`);
    return;


  };
};

export default {
  useVariables,
  useNextMFA,
};


