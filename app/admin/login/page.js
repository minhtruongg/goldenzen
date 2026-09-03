'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Sai mật khẩu');
      }
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        :root {
          --ink:#FAF6EF; --gold:#A0681A; --gold2:#C8852A; --gold3:#7A5010;
          --cream:#2E1F0A; --cream2:#4A3318; --muted:#9A8468; --muted2:#C4AD8E;
          --border:rgba(160,104,26,0.18); --border2:rgba(160,104,26,0.4); --r:8px;
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
        .login-wrap {
          min-height: 100dvh;
          background: var(--ink);
          background-image: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(160,104,26,0.08) 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'DM Sans', system-ui, sans-serif;
        }
        .login-card { width: 100%; max-width: 380px; }
        .login-logo {
          text-align: center;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 34px;
          color: var(--cream);
          margin-bottom: 6px;
        }
        .login-logo em { font-style: italic; color: var(--gold2); }
        .login-sub {
          text-align: center;
          color: var(--muted);
          font-size: 16px;
          margin-bottom: 32px;
        }
        .login-label {
          display: block;
          font-size: 15px;
          color: var(--cream2);
          margin-bottom: 8px;
          font-weight: 500;
        }
        .login-input {
          width: 100%;
          padding: 16px 16px;
          font-size: 18px;
          border: 1px solid var(--border);
          border-radius: var(--r);
          background: rgba(0,0,0,0.02);
          color: var(--cream);
          outline: none;
          font-family: inherit;
        }
        .login-input:focus { border-color: var(--gold); }
        .login-error {
          color: #B23A3A;
          font-size: 15px;
          margin-top: 10px;
        }
        .login-btn {
          width: 100%;
          margin-top: 20px;
          padding: 16px;
          font-size: 17px;
          font-weight: 600;
          border-radius: var(--r);
          border: 1px solid var(--gold);
          background: var(--gold);
          color: var(--ink);
          cursor: pointer;
        }
        .login-btn:active { background: var(--gold3); }
        .login-btn:disabled { opacity: 0.6; }
      `}</style>
      <div className="login-wrap">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-logo">Golden<em>Zen</em></div>
          <div className="login-sub">Quản lý lịch hẹn</div>
          <label className="login-label" htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            inputMode="numeric"
            autoFocus
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </>
  );
}
