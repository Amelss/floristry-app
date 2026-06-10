import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Page crashed:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <p className="text-[10px] tracking-[0.22em] uppercase text-stone-400 mb-4 font-medium">
          Something went wrong
        </p>
        <h1
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[36px] sm:text-[44px] font-semibold leading-tight text-[#3D5C3A] mb-4"
        >
          This page hit a snag
        </h1>
        <p className="text-[13px] text-stone-500 font-light leading-relaxed mb-8">
          The rest of the site still works. Try reloading, or head back to the start.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-[#3D5C3A] text-white text-[12px] font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Reload page
          </button>
          <a
            href="/"
            className="px-6 py-3 rounded-xl border border-[#3D5C3A] text-[#3D5C3A] text-[12px] font-medium hover:bg-[#3D5C3A]/5 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }
}
