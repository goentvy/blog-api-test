import { useState } from 'react';

const Thumbnail = ({ imageUrl }: { imageUrl: string }) => {
    const [error, setError] = useState(false)

    const basePath = import.meta.env.DEV ? '' : '/blog-api-test'
    const fallbackSrc = `${basePath}/assets/thumbnails/default.png`
    const validSrc = imageUrl && !error ? imageUrl : fallbackSrc

    return (
        <img
            src={validSrc}
            alt="썸네일"
            loading="lazy"
            onError={() => setError(true)}
            className="w-16 h-16 object-cover rounded shadow"
        />
    );
};

export default Thumbnail;