import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { useUserStore } from "../../store/Users";
import Alert from "../../animations/alert";

const Sidebar = ({ isLogged, configs }) => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ show: false, type: "", where: "" });

    const whoIsLogged = useUserStore((state) => state.whoIsLogged);
    const logout = useUserStore((state) => state.logout);

    const user = isLogged ? whoIsLogged : null;

    if (isLogged && (!user || !user.profilePicture)) {
        return null;
    }

    const handleLogOut = () => {
        logout();
        navigate("/");
    };

    const handleNotImplemented = () => {
        setAlert({ show: true, type: 'warning', where: 'global', message: 'Funcionalidade ainda não implementada!' });
    };

    const filteredConfigs = isLogged
        ? configs
        : configs.filter((config) => !config.needLogin);

    const renderMenuItem = (config, index) => {
        const { optionName, icon, src } = config;
        const Icon = LucideIcons[icon] || LucideIcons["Circle"];
        const baseClasses = `transition-colors duration-300 cursor-pointer rounded-2xl`;
        const openClasses = `w-full h-14 mb-5 flex items-center gap-12 p-3.5 bg-gradient-to-r from-[#0e0e0e] to-[#0e0e0e] hover:from-[#f0f0f0] hover:to-[#f0f0f0] hover:text-black`;
        const closedClasses = `hover:bg-gradient-to-r hover:from-[#f0f0f0] hover:to-[#f0f0f0] hover:text-black p-4 rounded-full flex justify-center`;
        const finalClasses = `${baseClasses} ${isOpen ? openClasses : closedClasses}`;

        if (optionName === "Sair") {
            return (
                <li
                    key={index}
                    onClick={handleLogOut}
                    className={`transition-colors duration-300 cursor-pointer rounded-2xl ${isOpen
                        ? "w-full h-14 mb-5 flex items-center gap-12 p-3.5 bg-gradient-to-r from-[#0e0e0e] to-[#0e0e0e] hover:from-[#f0f0f0] hover:to-[#f0f0f0] hover:text-black"
                        : "hover:bg-gradient-to-r hover:from-[#f0f0f0] hover:to-[#f0f0f0] hover:text-black p-4 rounded-full"
                        }`}
                >
                    <Icon />
                    {isOpen && optionName}
                </li>
            );
        }

        if (!src) {
            return (
                <li key={index} onClick={handleNotImplemented} className={finalClasses}>
                    <Icon />
                    {isOpen && optionName}
                </li>
            );
        }

        return (
            <Link to={src} key={index} className="w-full">
                <li
                    className={`transition-colors duration-300 cursor-pointer rounded-2xl ${isOpen
                        ? "w-full h-14 mb-5 flex items-center gap-12 p-3.5 bg-gradient-to-r from-[#0e0e0e] to-[#0e0e0e] hover:from-[#f0f0f0] hover:to-[#f0f0f0] hover:text-black"
                        : "hover:bg-gradient-to-r hover:from-[#f0f0f0] hover:to-[#f0f0f0] hover:text-black p-4 rounded-full flex justify-center"
                        }`}
                >
                    <Icon />
                    {isOpen && optionName}
                </li>
            </Link>
        );
    };

    return (
        <aside
            className={`h-full ${isOpen ? "w-80" : "w-20"} bg-gradient-to-r border-r-1 border-gray-600 from-[#0f0f0f] to-[#181818] transition-all duration-200 flex flex-col`}
        >
            {alert.show && <Alert type={alert.type} where={alert.where} message={alert.message} onClose={() => setAlert({ show: false })} />}
            <div className="h-1/4 w-full flex flex-col items-center justify-center">
                {isLogged ? (
                    <div
                        className={`p-[3px] rounded-full bg-white cursor-pointer ${isOpen ? "h-32 w-32" : "h-16 w-16"
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div
                            className="w-full h-full rounded-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${user.profilePicture})` }}
                        />
                    </div>
                ) : (
                    <LucideIcons.User
                        className={`cursor-pointer bg-[#1e1e1e] text-white rounded-full ${isOpen ? "h-32 w-32 border-8" : "h-12 w-12 border-2"
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                )}

                {isOpen && (
                    <>
                        <h1 className="text-2xl text-white mt-4 overflow-hidden whitespace-nowrap overflow-ellipsis">{isLogged ? user.username : "Guest"}</h1>
                        <h3 className="bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent font-bold">
                            {isLogged ? user.role : ""}
                        </h3>
                    </>
                )}
            </div>

            <div className={`flex-1 p-2 ${isOpen ? "overflow-auto" : "overflow-hidden"}`}>
                <ul className={`${isOpen ? "h-full" : "flex flex-col items-center gap-2"} text-white`}>
                    {filteredConfigs.map(renderMenuItem)}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
