import { useRef, useState } from "react";

const VideoSection = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        const el = videoRef.current;
        if (!el) return;
        if (el.paused) {
            el.play();
            setIsPlaying(true);
        } else {
            el.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section className="pt-6 md:pt-10 pb-16 md:pb-20 bg-gradient-to-b from-[#070752] to-black">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-6">See PrivacyWeave in Action</h2>
                <div className="max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black relative ring-4 ring-blue-500/30 ring-opacity-50 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                    {/* Place your local mp4 at client/public/assets/video/overview.mp4 (or change the src) */}
                    <video ref={videoRef} className="w-full h-full" controls playsInline poster="/assets/video/thumbail.png">
                        <source src="/assets/video/overview.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <button
                        aria-label={isPlaying ? "Pause" : "Play"}
                        onClick={togglePlay}
                        className="absolute left-4 bottom-4 px-3 py-1.5 text-sm rounded-md bg-white/90 text-slate-900 hover:bg-white shadow"
                    >
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;


