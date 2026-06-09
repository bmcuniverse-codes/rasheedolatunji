import { Link, useLocation } from "react-router-dom";
import { Home, Siren, FilePlus, ClipboardList, User } from "lucide-react";

function BottomNav() {
  const { pathname } = useLocation();

  const items = [
    { path: "/dashboard", label: "Home", icon: <Home size={21} /> },
    { path: "/sos", label: "SOS", icon: <Siren size={21} /> },
    { path: "/report", label: "Report", icon: <FilePlus size={21} /> },
    { path: "/my-reports", label: "Reports", icon: <ClipboardList size={21} /> },
    { path: "/profile", label: "Profile", icon: <User size={21} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-gray-800 px-2 py-2 z-50">
      <div className="max-w-md mx-auto grid grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 text-[11px] py-2 ${
                active ? "text-danger" : "text-gray-400"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;