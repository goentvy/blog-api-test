import { useState } from 'react';

const Thumbnail = ({ imageUrl }: { imageUrl: string }) => {
    const [error, setError] = useState(false)

    const fallbackSrc = '/assets/thumbnails/default.png'

    return (
        <img
            src={error ? fallbackSrc : imageUrl}
            alt="썸네일"
            loading="lazy"
            onError={() => setError(true)}
            className="w-16 h-16 object-cover rounded shadow"
        />
    );
};

export default Thumbnail;