import { useNavigate } from "react-router";
import { useEffect } from "react";

function redirect(path: string) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(path);
    }, []);
}

export { redirect };