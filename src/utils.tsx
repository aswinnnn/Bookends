import { useNavigate } from "react-router";

function useRedirect() {
  const navigate = useNavigate();

  const redirect = (path: string) => {
    navigate(path);
  };

  return redirect;
}

export { useRedirect };