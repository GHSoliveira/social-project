import { useState } from "react";
import Alert from "../animations/Alert"; // <-- Importe o Alert

const PlanCard = ({ onNotImplemented }) => {
    return (
        <li
            className="w-80 bg-gradient-to-r from-[#0f0f0f] to-[#222222] border-2 border-gray-700 h-[30rem] rounded-3xl p-6 flex flex-col items-center hover:shadow-[0px_0px_30px] transition-all duration-300 hover:shadow-white/30 hover:border-cyan-400 cursor-pointer"
            onClick={onNotImplemented}
        >
            <h2 className="text-2xl text-cyan-400 font-bold">Plano Exemplo</h2>
            <p className="text-gray-400 mt-2">Clique para saber mais.</p>
        </li>
    );
};

const ChangePlan = () => {
    const [alert, setAlert] = useState({ show: false, type: "", where: "" });

    const handleNotImplemented = () => {
        setAlert({ show: true, type: 'warning', where: 'global', message: 'Página de planos ainda não implementada!' });
    };

    return (
        <div className="w-screen h-screen bg-gradient-to-br overflow-hidden from-[#111111] to-[#1f1f1f] ">
            {alert.show && <Alert type={alert.type} where={alert.where} message={alert.message} onClose={() => setAlert({ show: false })} />}
            <header className="h-24 w-full items-center justify-center flex bg-gradient-to-r from-[#1b1b1b] to-[#161616]">
                <h1 className="text-white text-3xl">Atualize seu plano para ter opções exclusivas</h1>
            </header>
            <main className="w-full h-[calc(100vh-6rem)] flex p-8 justify-center items-center">
                <ul className="h-full w-fit flex gap-8 items-center">
                    <PlanCard onNotImplemented={handleNotImplemented} />
                    <PlanCard onNotImplemented={handleNotImplemented} />
                    <PlanCard onNotImplemented={handleNotImplemented} />
                </ul>
            </main>
        </div>
    );
};

export default ChangePlan;