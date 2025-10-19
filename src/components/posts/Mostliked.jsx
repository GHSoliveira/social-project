import { useMemo, useState } from "react"; // <-- Importe useState
import { Loader } from "lucide-react";
import { MiniCard } from "./Card";
import Alert from "../../animations/alert";

const MostLiked = ({ content }) => {
    const sortedPosts = useMemo(() => {
        if (!content || content.length === 0) {
            return [];
        }

        const handleNotImplemented = () => {
            setAlert({ show: true, type: 'warning', where: 'global', message: 'Abrir post a partir daqui ainda não foi implementado!' });
        };

        return [...content]
            .sort((a, b) => {
                const scoreA = a.upvotedBy.length - a.downvotedBy.length;
                const scoreB = b.upvotedBy.length - b.downvotedBy.length;
                return scoreB - scoreA;
            })
            .slice(0, 10);
    }, [content]);

    if (sortedPosts.length === 0) {
        return (
            <section className="w-full h-[30rem]">
                <div className="w-full h-8 mt-4">
                    <h1 className="text-2xl text-white">Mais Curtidos</h1>
                </div>
                {(!content || content.length === 0) ? (
                    <div className="flex items-center mt-8">
                        <Loader className="animate-spin text-cyan-400" />
                        <span className="text-cyan-400 ml-2">Procurando conteúdo...</span>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-8">Nenhum post para exibir aqui ainda.</p>
                )}
            </section>
        );
    }

    return (
        <section className="w-full h-[30rem]">
            {alert.show && <Alert type={alert.type} where={alert.where} message={alert.message} onClose={() => setAlert({ show: false })} />}
            <div className="w-full h-8 mt-4">
                <h1 className="text-2xl text-white">Mais Curtidos</h1>
            </div>

            <div
                className="w-full relative h-[calc(100%-2.5rem)] overflow-hidden"
                style={{
                    maskImage: `linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)`,
                    WebkitMaskImage: `linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)`,
                }}
            >

                <div className="flex absolute top-0 left-0 w-max animate-scroll">
                    {sortedPosts.map(item => (
                        <div key={`1-${item.id}`} className="mx-3">
                            <MiniCard user={item.user} post={item} />
                        </div>
                    ))}
                    {sortedPosts.map(item => (
                        <div key={`2-${item.id}`} className="mx-3">
                            <MiniCard user={item.user} post={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MostLiked;