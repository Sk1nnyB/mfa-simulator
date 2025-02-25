import { useNavigate, useLocation } from 'react-router-dom';

const useNextMFA = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    const queryParams = new URLSearchParams(location.search);
    const context = queryParams.get('context');
    const story = parseInt(queryParams.get('story'), 10);

    if (story !== null) navigate(`/play?story=${story + 1}`);

    if (!context) return;

    const pos = parseInt(context[context.length - 1], 16);
    const next = (parseInt(context, 16) + 1).toString(16).toUpperCase().padStart(4, '0');

    if (pos === 0) {
      navigate(`/play?context=${next}`);
    } else {
      navigate(`/play?context=${next}`, { replace: true });
    }
  };
};

export default useNextMFA;
