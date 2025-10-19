import { useEffect, useState } from "react";

const Alert = ({ type = 'info', where = 'global', message: customMessage, duration = 2000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            // Espera a animação de fade-out terminar antes de chamar onClose
            setTimeout(onClose, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    // Estilos de cor baseados no tipo do alerta
    const typeStyles = {
        success: 'bg-gradient-to-r from-green-500 to-emerald-600',
        fail: 'bg-gradient-to-r from-red-500 to-red-700',
        warning: 'bg-gradient-to-r from-yellow-500 to-orange-600 text-black',
        info: 'bg-gradient-to-r from-blue-500 to-cyan-600',
        userExists: 'bg-gradient-to-r from-orange-600 to-yellow-500 text-black'
    };

    // Emojis para cada tipo de alerta
    const emojis = {
        success: '✅',
        fail: '✖️',
        warning: '⚠️',
        info: 'ℹ️',
        userExists: '👤',
        noData: 'ℹ️',
        notAllowed: '🚫'
    };

    // Mensagens predefinidas (usadas apenas como fallback)
    const predefinedMessages = {
        login: {
            fail: 'Falha no login! Usuário ou senha incorretos.',
            success: 'Login realizado com sucesso!',
            noData: 'Preencha todos os campos.'
        },
        signup: {
            fail: 'Erro ao criar conta. Verifique os campos.',
            success: 'Conta criada com sucesso.',
            noData: 'Preencha todos os campos.',
            userExists: 'Nome de usuário ou e-mail já cadastrado.'
        }
    };

    // Lógica para decidir qual mensagem exibir:
    // 1. Tenta usar a 'customMessage' passada via props.
    // 2. Se não houver, tenta usar as mensagens predefinidas.
    // 3. Se nada funcionar, usa um fallback final.
    const message = customMessage || predefinedMessages[where]?.[type] || "Ocorreu um erro inesperado.";
    const emoji = emojis[type] || '🔵';

    return (
        <div className={`alert-box z-[9999] fixed top-5 right-5 flex items-center px-6 py-4 text-white font-semibold rounded-xl shadow-lg transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"} ${typeStyles[type] || typeStyles.info}`}>
            <span className="mr-3 text-xl">{emoji}</span>
            {message}
        </div>
    );
};

export default Alert;