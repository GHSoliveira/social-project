import { useState } from "react";

export default function ImagePreviewer({ value, onChange, size }) {
    const [hasError, setHasError] = useState(false);

    const handleImageError = () => setHasError(true);
    const handleImageLoad = () => setHasError(false);

    return (
        <div className="flex flex-col text-white space-y-3 items-center">
            <label htmlFor="image-url">Endereço da imagem:</label>

            <input
                id="image-url"
                type="text"
                placeholder="digite o endereço da imagem..."
                className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#1a1a1a] transition-colors duration-300 focus:outline-none text-white placeholder:text-gray-400 w-full p-2 rounded-3xl"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setHasError(false);
                }}
            />

            <div className="mt-2 p-2 w-fit border border-gray-600 rounded-xl bg-[#1f1f1f]">
                {!value || hasError ? (
                    <p className="text-red-400 text-sm">
                        {!value ? "Nenhum link inserido." : "Erro ao carregar a imagem. Verifique o link."}
                    </p>
                ) : (
                    <img
                        src={value}
                        alt="Pré-visualização"
                        className={`w-full h-${size} rounded-md object-contain`}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                    />
                )}
            </div>
        </div>
    );
}
