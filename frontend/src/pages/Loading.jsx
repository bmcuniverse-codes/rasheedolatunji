import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/intro");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-danger/20 flex items-center justify-center border border-danger/40 animate-pulse">
          <ShieldAlert size={44} className="text-danger" />
        </div>

        <h1 className="text-4xl font-bold mt-6 tracking-wide">
          Secure<span className="text-danger">Me</span>
        </h1>

        <p className="text-gray-400 mt-3 text-sm">
          Personal Safety & Real-Time Incident Reporting
        </p>

        <div className="mt-8 w-48 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full w-2/3 bg-danger rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;