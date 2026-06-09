export default function NotFoundPage({ go }) {
  return (
    <div className="max-w-xl mx-auto px-5 py-24 text-center">
      <p className="text-[10px] tracking-[0.22em] uppercase text-stone-400 mb-4 font-medium">
        404 · Page not found
      </p>
      <h1
        style={{ fontFamily: '"Cormorant Garamond",serif' }}
        className="text-[36px] sm:text-[44px] font-semibold leading-tight text-[#3D5C3A] mb-4"
      >
        This page has wilted away
      </h1>
      <p className="text-[13px] text-stone-500 font-light leading-relaxed mb-8">
        The page you're looking for doesn't exist or may have moved.
        Try the search (⌘K) or head back to the start.
      </p>
      <button
        onClick={() => go('home')}
        className="px-6 py-3 rounded-xl bg-[#3D5C3A] text-white text-[12px] font-medium hover:opacity-90 transition-opacity cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
}
