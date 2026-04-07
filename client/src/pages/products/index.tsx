import { Link } from "wouter";

const ProductsIndex = () => {
    return (
        <section className="min-h-[60vh] bg-gradient-to-b from-black to-[#070752] text-white">
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Products</h1>
                <p className="text-gray-300 mb-10">Choose a product to explore:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
                    <Link href="/products/ai-scanner" className="block">
                        <div className="rounded-2xl p-6 border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="text-xl font-semibold mb-2">AI Security Scanner</div>
                            <div className="text-gray-300 text-sm">Detect and block prompt injection, data exfiltration, and social engineering</div>
                        </div>
                    </Link>
                    <Link href="/products/protection-shield" className="block">
                        <div className="rounded-2xl p-6 border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="text-xl font-semibold mb-2">Real‑Time Protection Shield</div>
                            <div className="text-gray-300 text-sm">Your AI guard that never sleeps, never leaks</div>
                        </div>
                    </Link>
                    <Link href="/products/supply-chain" className="block">
                        <div className="rounded-2xl p-6 border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="text-xl font-semibold mb-2">AI to AI Supply Chain</div>
                            <div className="text-gray-300 text-sm">Know every API, plugin, and service touching your data</div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductsIndex;


