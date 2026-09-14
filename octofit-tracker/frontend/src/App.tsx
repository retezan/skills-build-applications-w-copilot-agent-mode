import { useState } from 'react'
import './App.css'

type Activity = { name: string; detail: string; points: number }

const initialActivities: Activity[] = [
  { name: 'Morning run', detail: '5.2 km · 32 min', points: 84 },
  { name: 'Mobility flow', detail: '20 min · Recovery', points: 42 },
]

function App() {
  const [activities, setActivities] = useState(initialActivities)
  const [isLogging, setIsLogging] = useState(false)
  const totalPoints = activities.reduce((total, activity) => total + activity.points, 0)

  const logActivity = () => {
    setActivities((current) => [
      { name: 'Strength session', detail: '30 min · Full body', points: 68 },
      ...current,
    ])
    setIsLogging(false)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="OctoFit home"><span className="brand-mark">O</span><span>OctoFit</span></a>
        <nav aria-label="Primary navigation"><a className="active" href="#overview">Overview</a><a href="#activity">Activity</a><a href="#teams">Teams</a></nav>
        <button className="avatar" type="button" aria-label="Open profile">JD</button>
      </header>

      <section className="intro" id="overview">
        <div><p className="eyebrow">Monday, September 14</p><h1>Keep your momentum.</h1><p className="intro-copy">A clear view of your movement, your team, and the next good choice.</p></div>
        <button className="primary-button" type="button" onClick={() => setIsLogging(true)}>Log activity <span aria-hidden="true">+</span></button>
      </section>

      <section className="stat-grid" aria-label="Weekly stats">
        <article className="stat-card highlight"><span className="stat-label">Weekly points</span><strong>{totalPoints}</strong><span className="stat-note">+18% from last week</span></article>
        <article className="stat-card"><span className="stat-label">Active streak</span><strong>6 <small>days</small></strong><span className="stat-note">Best this month</span></article>
        <article className="stat-card"><span className="stat-label">Team rank</span><strong>#04</strong><span className="stat-note">Out of 18 teams</span></article>
      </section>

      <section className="content-grid">
        <article className="panel" id="activity">
          <div className="panel-heading"><div><p className="eyebrow">Your movement</p><h2>Recent activity</h2></div><button className="text-button" type="button">View all</button></div>
          <div className="activity-list">{activities.map((activity, index) => <div className="activity-row" key={`${activity.name}-${index}`}><span className="activity-icon">{index === 0 ? 'R' : 'M'}</span><span className="activity-info"><strong>{activity.name}</strong><small>{activity.detail}</small></span><span className="points">+{activity.points}</span></div>)}</div>
        </article>
        <article className="panel team-panel" id="teams">
          <div className="panel-heading"><div><p className="eyebrow">The pace setters</p><h2>Team leaderboard</h2></div><span className="live-dot">Live</span></div>
          <ol className="leaderboard"><li><span>01</span><strong>North Star</strong><b>1,284</b></li><li><span>02</span><strong>Early Risers</strong><b>1,201</b></li><li className="current"><span>04</span><strong>Good Form</strong><b>1,064</b></li></ol>
        </article>
      </section>

      {isLogging && <div className="dialog-backdrop" role="presentation" onClick={() => setIsLogging(false)}><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={(event) => event.stopPropagation()}><p className="eyebrow">Quick entry</p><h2 id="dialog-title">Log a strength session?</h2><p>This adds a 30 minute full-body session to today.</p><div className="dialog-actions"><button className="secondary-button" type="button" onClick={() => setIsLogging(false)}>Cancel</button><button className="primary-button" type="button" onClick={logActivity}>Add activity</button></div></section></div>}
    </main>
  )
}

export default App
