import { useState } from "react";
import { Search, Settings } from "lucide-react";
import Alert from "../../animations/alert";
const Header = ({ where, user, isLogged }) => {
    const [alert, setAlert] = useState({ show: false, type: "", where: "" });

    const handleNotImplemented = () => {
        setAlert({ show: true, type: 'warning', where: 'global', message: 'Funcionalidade ainda não implementada!' });
    };

    return (
        <header className="h-38 w-full p-4 flex bg-[#0f0f0f] border-b-1 border-gray-600 relative">
            {alert.show && <Alert type={alert.type} where={alert.where} message={alert.message} onClose={() => setAlert({ show: false })} />}
            <div className="w-full h-full flex items-center justify-between">
                <h1 className="text-3xl text-white h-full flex items-center">
                    Bem vindoª à {where}, {isLogged ? user.username : 'Guest'}!
                </h1>

                <div
                    className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] hover:from-white hover:to-white text-white hover:text-black transition-colors duration-300 w-2xs p-2 rounded-4xl flex gap-4 items-center border-1 border-gray-600 cursor-pointer"
                    onClick={handleNotImplemented}
                >
                    <Search className="" />
                    <input
                        className="focus:outline-none bg-transparent text-white placeholder:text-gray-400 pointer-events-none"
                        type="text"
                        placeholder="pesquisa..."
                        readOnly
                    />
                </div>
            </div>

            <div className="flex w-1/7 justify-center items-center text-white">
                <Settings className="hover:animate-spin transition-colors duration-300 cursor-pointer" onClick={handleNotImplemented} />
            </div>
        </header>
    );
};

export default Header;