import React from "react";

function Logo({ width = '50px', height = '50px' }) {
    return (
        <div>
            <img 
                src="https://th.bing.com/th/id/R.c5affaa100ece044ec140c9e6769bee4?rik=W2e0eBnJmMHWtA&riu=http%3a%2f%2fmedia.buzzle.com%2fmedia%2fimages-en%2fgallery%2fbotany%2fflowers%2f1200-187014300-pink-lotus-flower.jpg&ehk=wTwv33tUxkARQFeWL7LEujepH0rG88nVyd%2bpCOCuDIQ%3d&risl=&pid=ImgRaw&r=0" 
                alt="Logo" 
                style={{ width, height }} 
            />
        </div>
    );
}

export default Logo;
