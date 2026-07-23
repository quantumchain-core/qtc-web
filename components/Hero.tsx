export default function Hero() {
  return (
    <section className="pt-32 pb-24 text-center px-6">
      <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
        Quantum Resistant.<br />Built for the Future.
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
        Run a validator on the first post-quantum Layer 1 blockchain.
      </p>
      <a href="/dashboard" className="inline-block bg-cyan-500 text-black px-10 py-4 rounded-2xl text-xl font-semibold hover:bg-cyan-400 transition">
        Launch Validator Dashboard →
      </a>
    </section>
  );
}
