import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">TaskFlow Pro</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">The page you requested does not exist. Return to the landing page or sign in to continue.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900">Home</Link>
          <Link to="/login" className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;