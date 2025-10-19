import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: 'Pelo menos 6 caracteres', met: password.length >= 6 },
        { label: 'Contém letra maiúscula', met: /[A-Z]/.test(password) },
        { label: 'Contém letra minúscula', met: /[a-z]/.test(password) },
        { label: 'Contém um número', met: /\d/.test(password) },
        { label: 'Contém caractere especial', met: /[^A-Za-z0-9]/.test(password) }
    ];
    return (
        <div className="mt-2 space-y-1">
            {criteria.map((item) => (
                <div key={item.label} className="flex items-center text-xs">
                    {item.met ? (
                        <Check className="size-4 text-white mr-2" />
                    ) : (
                        <X className="size-4 text-gray-500 mr-2" />
                    )}
                    <span className={item.met ? 'text-white' : 'text-gray-400'}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

const PasswordStrengthMeter = ({ password }) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[a-z]/.test(pass)) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;
        return strength;
    };
    const strength = getStrength(password);

    const getColor = (strength) => {
        if (strength <= 1) return 'bg-white';
        if (strength === 2) return 'bg-white';
        if (strength === 3) return 'bg-white';
        if (strength === 4) return 'bg-white';
        if (strength === 5) return 'bg-white';
        return 'bg-white';
    };

    const getStrengthText = (strength) => {
        if (strength <= 1) return 'Muito Fraca';
        if (strength === 2) return 'Fraca';
        if (strength === 3) return 'Razoável';
        if (strength === 4) return 'Boa';
        if (strength === 5) return 'Forte';
        return 'Desconhecida';
    };

    return (
        <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Força da senha</span>
                <span className={`text-xs text-gray-400`}>{getStrengthText(strength)}</span>
            </div>
            <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                    <div key={index}
                        className={`h-1 w-1/5 rounded-full transition-colors duration-300 ${index < strength ? getColor(strength) : 'bg-gray-600'}`}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    );
};

export default PasswordStrengthMeter;