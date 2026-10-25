import { useMemo, useState } from 'react';

const accounts = [
  {
    id: 'maria',
    name: 'Maria Santos',
    email: 'maria@homebuild.com',
    password: '123456',
    projectName: 'Villa Residence',
    location: 'Green Valley Subdivision',
    progress: 68,
    budgetUsed: '$118,500',
    nextMilestone: 'Roofing',
    heroMessage: 'Your home is progressing smoothly. The exterior structure is nearly ready for roofing.',
    updates: [
      {
        title: 'Foundation Completed',
        date: 'Jan 10, 2026',
        status: 'Completed',
        description: 'Concrete foundation and slab are fully cured and inspected.',
        progress: 18,
      },
      {
        title: 'Frame Structure',
        date: 'Feb 02, 2026',
        status: 'In Progress',
        description: 'Wall framing and roof trusses are being installed.',
        progress: 42,
      },
      {
        title: 'Roofing Works',
        date: 'Mar 07, 2026',
        status: 'Upcoming',
        description: 'Roof sheets, insulation, and waterproofing are scheduled.',
        progress: 60,
      },
      {
        title: 'Interior Finishing',
        date: 'Apr 22, 2026',
        status: 'Upcoming',
        description: 'Plastering, painting, electrical systems, and tiles.',
        progress: 78,
      },
    ],
  },
  {
    id: 'josh',
    name: 'Joshua Lee',
    email: 'josh@homebuild.com',
    password: 'pass123',
    projectName: 'Modern Townhouse',
    location: 'Oakview District',
    progress: 52,
    budgetUsed: '$94,300',
    nextMilestone: 'Electrical Rough-in',
    heroMessage: 'Your townhouse has reached the stage where the electrical and plumbing systems are being installed.',
    updates: [
      {
        title: 'Lot Preparation',
        date: 'Dec 18, 2025',
        status: 'Completed',
        description: 'The site was leveled and utility lines were marked.',
        progress: 12,
      },
      {
        title: 'Concrete Slab',
        date: 'Jan 28, 2026',
        status: 'Completed',
        description: 'The slab has been poured and reinforced as planned.',
        progress: 30,
      },
      {
        title: 'Wall Panels',
        date: 'Mar 06, 2026',
        status: 'In Progress',
        description: 'Interior and exterior walls are being assembled.',
        progress: 55,
      },
      {
        title: 'Plumbing & Wiring',
        date: 'Apr 12, 2026',
        status: 'Upcoming',
        description: 'The rough-in for plumbing and electrical lines is scheduled next.',
        progress: 72,
      },
    ],
  },
  {
    id: 'sophia',
    name: 'Sophia Nguyen',
    email: 'sophia@homebuild.com',
    password: 'secure99',
    projectName: 'Coastal Bungalow',
    location: 'Seabreeze Heights',
    progress: 84,
    budgetUsed: '$162,900',
    nextMilestone: 'Final Walkthrough',
    heroMessage: 'The bungalow is nearing completion with painting, fixtures, and final touches underway.',
    updates: [
      {
        title: 'Exterior Finish',
        date: 'Jan 02, 2026',
        status: 'Completed',
        description: 'Paint, windows, and doors were installed on schedule.',
        progress: 44,
      },
      {
        title: 'Kitchen Install',
        date: 'Feb 14, 2026',
        status: 'Completed',
        description: 'Cabinets, counters, and island are now in place.',
        progress: 63,
      },
      {
        title: 'Interior Painting',
        date: 'Mar 20, 2026',
        status: 'In Progress',
        description: 'Walls are being painted and touch-ups are being completed.',
        progress: 80,
      },
      {
        title: 'Final Inspection',
        date: 'May 08, 2026',
        status: 'Upcoming',
        description: 'The final inspection and handover are scheduled for early May.',
        progress: 92,
      },
    ],
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginAccount = (account) => {
    setUser(account);
    setIsLoggedIn(true);
    setError('');
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const matchedAccount = accounts.find(
      (account) =>
        account.email.toLowerCase() === email.trim().toLowerCase() &&
        account.password === password
    );

    if (!matchedAccount) {
      setError('Invalid email or password. Please try one of the demo accounts.');
      return;
    }

    loginAccount(matchedAccount);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  const stats = useMemo(() => {
    if (!user) return [];
    return [
      { label: 'Overall Progress', value: `${user.progress}%`, tone: 'primary' },
      { label: 'Budget Used', value: user.budgetUsed, tone: 'secondary' },
      { label: 'Next Milestone', value: user.nextMilestone, tone: 'success' },
    ];
  }, [user]);

  if (!isLoggedIn || !user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="brand">
            <span className="brand-mark">H</span>
            <h1>HouseBuilder</h1>
          </div>

          <h2>Welcome back</h2>
          <p>Track your home build, milestones, and construction updates.</p>

          <div className="demo-accounts">
            {accounts.map((account) => (
              <button
                key={account.id}
                type="button"
                className="account-pill"
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                  loginAccount(account);
                }}
              >
                {account.name}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <label>
              Email
              <input
                type="email"
                placeholder="name@homebuild.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="primary-btn">
              Login
            </button>
          </form>

          <div className="demo-box">
            <strong>Demo accounts</strong>
            <ul>
              <li>maria@homebuild.com / 123456</li>
              <li>josh@homebuild.com / pass123</li>
              <li>sophia@homebuild.com / secure99</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">Construction dashboard</p>
          <h1>{user.projectName}</h1>
        </div>

        <div className="user-box">
          <div className="avatar">{user.name.charAt(0)}</div>
          <div>
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
          <button type="button" onClick={handleLogout} className="secondary-btn">
            Logout
          </button>
        </div>
      </header>

      <section className="hero-card">
        <div>
          <p className="eyebrow accent">Project update</p>
          <h2>{user.heroMessage}</h2>
        </div>
        <div className="hero-badge">{user.location}</div>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.tone}`}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </section>

      <section className="main-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Project Progress</h3>
            <span>{user.progress}% complete</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${user.progress}%` }} />
          </div>

          <div className="progress-legend">
            <div>
              <span className="dot green" />
              Completed
            </div>
            <div>
              <span className="dot yellow" />
              In progress
            </div>
            <div>
              <span className="dot gray" />
              Upcoming
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Site Overview</h3>
            <span>{user.location}</span>
          </div>

          <div className="site-card">
            <div className="site-image" />
            <div className="site-info">
              <h4>{user.projectName}</h4>
              <p>{user.location}</p>
              <ul>
                <li>Custom home build</li>
                <li>Designer finishes</li>
                <li>Project monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="updates-panel">
        <div className="panel-header">
          <h3>Construction Updates</h3>
          <span>Milestone timeline</span>
        </div>

        <div className="timeline">
          {user.updates.map((item, index) => (
            <div key={`${item.title}-${index}`} className="timeline-item">
              <div className="timeline-mark" />
              <div className="timeline-content">
                <div className="timeline-top">
                  <h4>{item.title}</h4>
                  <span className={`status ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </div>
                <small>{item.date}</small>
                <p>{item.description}</p>
                <div className="mini-progress">
                  <div style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
