import { Loader } from "lucide-react";
import Card from "./Card";

const Feed = ({ content }) => {

    if (!content || content.length === 0) {
        return (
            <div className="p-4">
                <div className="w-full h-8">
                    <h1 className="text-2xl text-white mb-[3rem]">Feed</h1>
                </div>
                <Loader className="animate-spin mt-8 text-white" /> <span className="text-white mt-1">Procurando conteúdo...</span>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-4">
            <h1 className="text-2xl text-white mb-[3rem]">Feed</h1>
            {content.map(item => {
                return <Card big={true} key={item.id} user={item.user} post={item} />
            })}
        </div>
    )
}

export default Feed
