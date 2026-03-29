<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VoxHire AI – README</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0d1117;
    --bg2: #161b22;
    --bg3: #21262d;
    --border: #30363d;
    --text: #e6edf3;
    --muted: #8b949e;
    --accent: #58a6ff;
    --accent2: #3fb950;
    --accent3: #f78166;
    --accent4: #d2a8ff;
    --accent5: #ffa657;
    --accent6: #79c0ff;
    --pill-bg: rgba(88,166,255,0.1);
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    line-height: 1.7;
    min-height: 100vh;
  }
  .mono { font-family: 'JetBrains Mono', monospace; }

  /* ── Header ── */
  .repo-header {
    border-bottom: 1px solid var(--border);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--bg);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .repo-path {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--muted);
  }
  .repo-path a { color: var(--accent); text-decoration: none; }
  .repo-path a:hover { text-decoration: underline; }
  .repo-actions {
    margin-left: auto;
    display: flex;
    gap: 8px;
  }
  .btn {
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--bg3);
    color: var(--text);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .btn-star { border-color: var(--accent5); color: var(--accent5); }
  .btn-fork { border-color: var(--accent2); color: var(--accent2); }

  /* ── Layout ── */
  .layout {
    display: grid;
    grid-template-columns: 1fr 280px;
    max-width: 1200px;
    margin: 0 auto;
    gap: 32px;
    padding: 32px 24px;
  }
  @media (max-width: 900px) {
    .layout { grid-template-columns: 1fr; }
    .sidebar { display: none; }
  }

  /* ── README Content ── */
  .readme-container {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
  }
  .readme-header {
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
  }
  .readme-header svg { color: var(--accent4); }
  .readme-body { padding: 40px 48px; }

  /* ── Hero ── */
  .hero {
    text-align: center;
    margin-bottom: 40px;
  }
  .hero-logo {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    background: linear-gradient(135deg, #1f6feb 0%, #8b5cf6 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    box-shadow: 0 0 40px rgba(88,92,246,0.3);
  }
  .hero h1 {
    font-size: 36px;
    font-weight: 800;
    background: linear-gradient(135deg, #58a6ff 0%, #d2a8ff 50%, #ffa657 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }
  .hero p {
    font-size: 17px;
    color: var(--muted);
    max-width: 620px;
    margin: 0 auto 24px;
    font-weight: 400;
  }
  .badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-bottom: 8px;
  }
  .badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 4px;
    font-weight: 500;
    border: 1px solid;
  }
  .badge-blue   { background: rgba(88,166,255,0.12); border-color: rgba(88,166,255,0.3); color: #79c0ff; }
  .badge-green  { background: rgba(63,185,80,0.12);  border-color: rgba(63,185,80,0.3);  color: #56d364; }
  .badge-purple { background: rgba(210,168,255,0.12);border-color: rgba(210,168,255,0.3);color: #d2a8ff; }
  .badge-orange { background: rgba(255,166,87,0.12); border-color: rgba(255,166,87,0.3); color: #ffa657; }
  .badge-red    { background: rgba(247,129,102,0.12);border-color: rgba(247,129,102,0.3);color: #f78166; }
  .badge-teal   { background: rgba(121,192,255,0.12);border-color: rgba(121,192,255,0.3);color: var(--accent6); }

  /* ── Section heading ── */
  .section-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--text);
    margin: 36px 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title .icon { font-size: 20px; }

  /* ── Feature grid ── */
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin: 16px 0;
  }
  .feature-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    transition: border-color .2s;
  }
  .feature-card:hover { border-color: rgba(88,166,255,0.5); }
  .feature-card .fc-icon { font-size: 22px; margin-bottom: 8px; }
  .feature-card .fc-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .feature-card .fc-desc  { font-size: 13px; color: var(--muted); line-height: 1.5; }

  /* ── Tech stack grid ── */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 16px 0;
  }
  .tech-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .tech-card .tc-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
  }
  .tech-card .tc-items { display: flex; flex-wrap: wrap; gap: 5px; }
  .tc-pill {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
  }

  /* ── Flow diagram (ASCII style) ── */
  .flow-block {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px 24px;
    margin: 16px 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: #cdd9e5;
    line-height: 1.9;
    overflow-x: auto;
  }
  .flow-block .flow-step { color: var(--accent); }
  .flow-block .flow-arrow { color: var(--muted); }
  .flow-block .flow-label { color: var(--accent4); }
  .flow-block .flow-sub   { color: var(--muted); font-size: 11px; }

  /* ── Code block ── */
  .code-block {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    margin: 16px 0;
  }
  .code-block-header {
    padding: 8px 16px;
    border-bottom: 1px solid var(--border);
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg2);
  }
  .code-block-header .lang {
    margin-left: auto;
    color: var(--accent2);
    font-size: 11px;
  }
  .code-block pre {
    padding: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.7;
    overflow-x: auto;
    color: #cdd9e5;
  }
  .kw  { color: #ff7b72; }
  .fn  { color: #d2a8ff; }
  .str { color: #a5d6ff; }
  .cm  { color: var(--muted); font-style: italic; }
  .num { color: #ffa657; }
  .prop{ color: #79c0ff; }

  /* ── API table ── */
  .api-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    margin: 16px 0;
    font-family: 'JetBrains Mono', monospace;
  }
  .api-table th {
    text-align: left;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    color: var(--muted);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    background: var(--bg3);
  }
  .api-table td {
    padding: 10px 14px;
    border-bottom: 1px solid rgba(48,54,61,0.5);
    vertical-align: top;
  }
  .api-table tr:last-child td { border-bottom: none; }
  .method {
    font-weight: 700;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .method-post { background: rgba(63,185,80,0.15); color: #56d364; }
  .method-get  { background: rgba(88,166,255,0.15); color: #79c0ff; }

  /* ── Schema block ── */
  .schema-block {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px 20px;
    margin: 16px 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.8;
  }
  .schema-block .sk  { color: #79c0ff; }
  .schema-block .sv  { color: #a5d6ff; }
  .schema-block .sc  { color: var(--muted); }
  .schema-block .st  { color: #ffa657; }

  /* ── Agent grid ── */
  .agent-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 16px 0;
  }
  .agent-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px;
    text-align: center;
    font-size: 12px;
    color: var(--muted);
  }
  .agent-card .ag-icon { font-size: 24px; margin-bottom: 6px; }
  .agent-card .ag-name { font-weight: 700; color: var(--text); font-size: 12px; margin-bottom: 2px; }

  /* ── Callout ── */
  .callout {
    border-radius: 8px;
    padding: 14px 18px;
    margin: 16px 0;
    font-size: 14px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    border-left: 3px solid;
  }
  .callout-info    { background: rgba(88,166,255,0.08); border-color: var(--accent); }
  .callout-warning { background: rgba(255,166,87,0.08); border-color: var(--accent5); }
  .callout-tip     { background: rgba(63,185,80,0.08);  border-color: var(--accent2); }
  .callout .ci { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .callout .ct { color: var(--muted); line-height: 1.5; }
  .callout .ct strong { color: var(--text); }

  /* ── Score display ── */
  .score-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 16px 0;
  }
  .score-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    text-align: center;
  }
  .score-card .sc-val { font-size: 28px; font-weight: 800; }
  .score-card .sc-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.7px; margin-top: 4px; font-family: 'JetBrains Mono', monospace; }

  /* ── ul lists ── */
  .md-list { list-style: none; margin: 12px 0; padding: 0; }
  .md-list li {
    padding: 4px 0 4px 20px;
    position: relative;
    font-size: 14px;
    color: var(--muted);
  }
  .md-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 12px;
    top: 5px;
  }
  .md-list li strong { color: var(--text); }

  /* ── Sidebar ── */
  .sidebar { display: flex; flex-direction: column; gap: 16px; }
  .side-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 16px;
    font-size: 13px;
  }
  .side-card h3 {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--muted);
    margin-bottom: 12px;
    font-family: 'JetBrains Mono', monospace;
  }
  .stat-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px solid rgba(48,54,61,0.5);
  }
  .stat-row:last-child { border-bottom: none; }
  .stat-row .sr-key { color: var(--muted); font-family: 'JetBrains Mono', monospace; font-size: 12px; }
  .stat-row .sr-val { color: var(--text); font-weight: 600; font-size: 12px; }
  .lang-bar { margin: 6px 0; }
  .lang-bar .lb-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 4px; font-family: 'JetBrains Mono', monospace; }
  .lb-track { height: 6px; background: var(--bg3); border-radius: 3px; overflow: hidden; }
  .lb-fill  { height: 100%; border-radius: 3px; }
  .toc-item { display: block; font-size: 13px; color: var(--muted); text-decoration: none; padding: 3px 0; transition: color .15s; }
  .toc-item:hover { color: var(--accent); }
  .toc-sub { padding-left: 12px; }
  .contrib-avatars { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
  .avatar {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 12px; border: 2px solid var(--bg2);
  }

  /* ── Footer ── */
  .readme-footer {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    text-align: center;
    font-size: 13px;
    color: var(--muted);
  }
  .readme-footer a { color: var(--accent); text-decoration: none; }

  p { font-size: 14px; color: var(--muted); margin: 8px 0; }
  hr { border: none; border-top: 1px solid var(--border); margin: 32px 0; }
</style>
</head>
<body>

<!-- ── GitHub-style top bar ── -->
<div class="repo-header">
  <span style="font-size:20px">🎙️</span>
  <span class="repo-path mono">
    <a href="#">your-username</a> / <a href="#"><strong>voxhire-ai</strong></a>
  </span>
  <div class="repo-actions">
    <button class="btn">👁 Watch <span style="color:var(--muted)">12</span></button>
    <button class="btn btn-star">⭐ Star <span style="color:var(--muted)">248</span></button>
    <button class="btn btn-fork">🍴 Fork <span style="color:var(--muted)">41</span></button>
  </div>
</div>

<!-- ── Main layout ── -->
<div class="layout">

  <!-- README -->
  <main>
    <div class="readme-container">
      <div class="readme-header">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.062 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"/></svg>
        README.md
      </div>
      <div class="readme-body">

        <!-- Hero -->
        <div class="hero">
          <div class="hero-logo">🎙️</div>
          <h1>VoxHire AI</h1>
          <p>Real-Time Interview Intelligence Platform — an AI-powered MERN application that simulates live interviews with voice interaction, behavioural analysis, and structured report generation.</p>

          <div class="badge-row">
            <span class="badge badge-blue">React.js</span>
            <span class="badge badge-green">Node.js</span>
            <span class="badge badge-orange">Express.js</span>
            <span class="badge badge-purple">MongoDB</span>
            <span class="badge badge-teal">Groq LLaMA 3</span>
            <span class="badge badge-red">Hugging Face</span>
          </div>
          <div class="badge-row">
            <span class="badge badge-green">MIT License</span>
            <span class="badge badge-blue">v1.0.0</span>
            <span class="badge badge-purple">PRs Welcome</span>
            <span class="badge badge-orange">Stars 248</span>
          </div>
        </div>

        <hr>

        <!-- What is VoxHire -->
        <div class="section-title"><span class="icon">🧠</span> What is VoxHire AI?</div>
        <p>VoxHire AI is a production-grade SaaS interview simulation platform that uses a multi-agent AI system to conduct, analyse, and report on mock interviews in real time. It supports <strong style="color:var(--text)">technical</strong>, <strong style="color:var(--text)">resume-based</strong>, and <strong style="color:var(--text)">scenario-based</strong> interview modes with voice-driven interaction.</p>

        <div class="feature-grid">
          <div class="feature-card">
            <div class="fc-icon">🎤</div>
            <div class="fc-title">Voice Interaction</div>
            <div class="fc-desc">Whisper STT transcribes answers in real time. Edge TTS speaks AI questions aloud.</div>
          </div>
          <div class="feature-card">
            <div class="fc-icon">📹</div>
            <div class="fc-title">Video Analysis</div>
            <div class="fc-desc">MediaPipe tracks eye contact, posture, and facial confidence during interviews.</div>
          </div>
          <div class="feature-card">
            <div class="fc-icon">🤖</div>
            <div class="fc-title">AI Question Engine</div>
            <div class="fc-desc">Groq LLaMA 3 dynamically generates skill-based, scenario, and resume-aware questions.</div>
          </div>
          <div class="feature-card">
            <div class="fc-icon">📊</div>
            <div class="fc-title">Structured Reports</div>
            <div class="fc-desc">Downloadable PDF reports with scores, behaviour analysis, strengths and improvement suggestions.</div>
          </div>
          <div class="feature-card">
            <div class="fc-icon">🛡️</div>
            <div class="fc-title">Anti-Cheat Security</div>
            <div class="fc-desc">Tab switch detection, face validation, and session tracking for exam integrity.</div>
          </div>
          <div class="feature-card">
            <div class="fc-icon">🕹️</div>
            <div class="fc-title">Multi-Agent System</div>
            <div class="fc-desc">8 specialised agents handle interviewing, speech, behaviour, scoring, and feedback.</div>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="section-title"><span class="icon">⚙️</span> Tech Stack</div>
        <div class="tech-grid">
          <div class="tech-card">
            <div class="tc-label">Frontend</div>
            <div class="tc-items">
              <span class="tc-pill badge-blue">React.js</span>
              <span class="tc-pill badge-teal">Tailwind CSS</span>
              <span class="tc-pill badge-purple">WebRTC</span>
              <span class="tc-pill badge-orange">Web Speech API</span>
            </div>
          </div>
          <div class="tech-card">
            <div class="tc-label">Backend</div>
            <div class="tc-items">
              <span class="tc-pill badge-green">Node.js</span>
              <span class="tc-pill badge-orange">Express.js</span>
              <span class="tc-pill badge-teal">REST APIs</span>
            </div>
          </div>
          <div class="tech-card">
            <div class="tc-label">Database</div>
            <div class="tc-items">
              <span class="tc-pill badge-green">MongoDB</span>
              <span class="tc-pill badge-orange">Mongoose</span>
            </div>
          </div>
          <div class="tech-card">
            <div class="tc-label">AI Models</div>
            <div class="tc-items">
              <span class="tc-pill badge-purple">Groq LLaMA 3</span>
              <span class="tc-pill badge-blue">Mixtral</span>
              <span class="tc-pill badge-teal">BERT</span>
              <span class="tc-pill badge-red">Whisper STT</span>
            </div>
          </div>
          <div class="tech-card">
            <div class="tc-label">Vision & Voice</div>
            <div class="tc-items">
              <span class="tc-pill badge-orange">MediaPipe</span>
              <span class="tc-pill badge-blue">Edge TTS</span>
            </div>
          </div>
          <div class="tech-card">
            <div class="tc-label">Observability</div>
            <div class="tc-items">
              <span class="tc-pill badge-purple">LangSmith</span>
              <span class="tc-pill badge-teal">Langflow</span>
            </div>
          </div>
        </div>

        <!-- Getting Started -->
        <div class="section-title"><span class="icon">🚀</span> Getting Started</div>

        <div class="callout callout-info">
          <span class="ci">ℹ️</span>
          <span class="ct"><strong>Prerequisites:</strong> Node.js ≥18, MongoDB ≥6, and a Groq API key are required before running this project.</span>
        </div>

        <div class="code-block">
          <div class="code-block-header">
            <span>📋</span> Clone & Install
            <span class="lang">bash</span>
          </div>
          <pre><span class="cm"># Clone the repository</span>
git clone https://github.com/your-username/voxhire-ai.git
cd voxhire-ai

<span class="cm"># Install backend dependencies</span>
cd server && npm install

<span class="cm"># Install frontend dependencies</span>
cd ../client && npm install</pre>
        </div>

        <div class="code-block">
          <div class="code-block-header">
            <span>🔑</span> Environment Variables (.env)
            <span class="lang">env</span>
          </div>
          <pre><span class="prop">MONGO_URI</span>=<span class="str">mongodb://localhost:27017/voxhire</span>
<span class="prop">GROQ_API_KEY</span>=<span class="str">your_groq_api_key_here</span>
<span class="prop">HF_API_KEY</span>=<span class="str">your_huggingface_api_key_here</span>
<span class="prop">LANGSMITH_API_KEY</span>=<span class="str">your_langsmith_key_here</span>
<span class="prop">PORT</span>=<span class="num">5000</span>
<span class="prop">JWT_SECRET</span>=<span class="str">your_jwt_secret_here</span></pre>
        </div>

        <div class="code-block">
          <div class="code-block-header">
            <span>▶</span> Run the Application
            <span class="lang">bash</span>
          </div>
          <pre><span class="cm"># Start backend (from /server)</span>
npm run dev

<span class="cm"># Start frontend (from /client)</span>
npm start

<span class="cm"># Or run both concurrently from root</span>
npm run dev:all</pre>
        </div>

        <!-- Architecture -->
        <div class="section-title"><span class="icon">🏗️</span> System Architecture</div>

        <div class="flow-block">
<span class="flow-label">┌─────────────────────────────────────────────────────────┐</span>
<span class="flow-label">│                    VOXHIRE AI PLATFORM                  │</span>
<span class="flow-label">└─────────────────────────────────────────────────────────┘</span>

<span class="flow-step">React Frontend</span>
  ├── <span class="flow-label">WebRTC Camera Feed</span>     <span class="flow-sub">→ MediaPipe Video Analysis</span>
  ├── <span class="flow-label">Web Speech API / Mic</span>   <span class="flow-sub">→ Whisper STT Transcription</span>
  ├── <span class="flow-label">Live Transcript Panel</span>  <span class="flow-sub">→ Real-time display</span>
  └── <span class="flow-label">Analysis Dashboard</span>    <span class="flow-sub">→ Confidence / Fluency / Comm scores</span>
          <span class="flow-arrow">↓ REST API calls</span>
<span class="flow-step">Express.js Backend</span>
  ├── <span class="flow-label">Interviewer Agent</span>     <span class="flow-sub">→ Groq LLaMA 3 question generation</span>
  ├── <span class="flow-label">Speech Agent</span>          <span class="flow-sub">→ Edge TTS voice output</span>
  ├── <span class="flow-label">Behaviour Agent</span>       <span class="flow-sub">→ Custom NLP analysis</span>
  ├── <span class="flow-label">Sentiment Agent</span>       <span class="flow-sub">→ HuggingFace BERT</span>
  ├── <span class="flow-label">Video Agent</span>           <span class="flow-sub">→ MediaPipe landmark tracking</span>
  ├── <span class="flow-label">Scoring Agent</span>         <span class="flow-sub">→ Aggregated score calculation</span>
  ├── <span class="flow-label">Feedback Agent</span>        <span class="flow-sub">→ Structured feedback generation</span>
  └── <span class="flow-label">Report Agent</span>          <span class="flow-sub">→ PDF report builder</span>
          <span class="flow-arrow">↓ Mongoose ORM</span>
<span class="flow-step">MongoDB</span>
  ├── <span class="flow-label">users</span>         <span class="flow-label">interviews</span>         <span class="flow-label">reports</span>
        </div>

        <!-- API Reference -->
        <div class="section-title"><span class="icon">🔌</span> API Reference</div>
        <table class="api-table">
          <thead>
            <tr>
              <th>Method</th><th>Endpoint</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><span class="method method-post">POST</span></td><td>/api/start-interview</td><td style="color:var(--muted)">Initialise a new interview session</td></tr>
            <tr><td><span class="method method-post">POST</span></td><td>/api/process-answer</td><td style="color:var(--muted)">Submit and analyse a user answer</td></tr>
            <tr><td><span class="method method-post">POST</span></td><td>/api/generate-report</td><td style="color:var(--muted)">Compile and generate the interview report</td></tr>
            <tr><td><span class="method method-post">POST</span></td><td>/api/upload-resume</td><td style="color:var(--muted)">Upload and parse resume for question generation</td></tr>
            <tr><td><span class="method method-get">GET</span></td><td>/api/history</td><td style="color:var(--muted)">Fetch all interview sessions for the user</td></tr>
            <tr><td><span class="method method-get">GET</span></td><td>/api/report/:id</td><td style="color:var(--muted)">Retrieve a specific report by ID</td></tr>
          </tbody>
        </table>

        <!-- MongoDB Schema -->
        <div class="section-title"><span class="icon">🗄️</span> MongoDB Schema</div>
        <div class="schema-block">
<span class="cm">// Interview Collection</span>
{
  <span class="sk">_id</span>: <span class="st">ObjectId</span>,
  <span class="sk">userId</span>: <span class="st">ObjectId</span>,
  <span class="sk">type</span>: <span class="sv">"technical" | "resume" | "scenario"</span>,
  <span class="sk">difficulty</span>: <span class="sv">"easy" | "medium" | "hard"</span>,
  <span class="sk">duration</span>: <span class="st">Number</span>,          <span class="sc">// minutes</span>
  <span class="sk">techStack</span>: [<span class="sv">"React"</span>, <span class="sv">"Node.js"</span>],
  <span class="sk">transcript</span>: [{ <span class="sk">q</span>: <span class="st">String</span>, <span class="sk">a</span>: <span class="st">String</span>, <span class="sk">ts</span>: <span class="st">Date</span> }],
  <span class="sk">scores</span>: {
    <span class="sk">confidence</span>: <span class="st">Number</span>,  <span class="sk">fluency</span>: <span class="st">Number</span>,  <span class="sk">communication</span>: <span class="st">Number</span>
  },
  <span class="sk">createdAt</span>: <span class="st">Date</span>
}

<span class="cm">// Report Collection</span>
{
  <span class="sk">interviewId</span>: <span class="st">ObjectId</span>,
  <span class="sk">overview</span>: <span class="st">String</span>,
  <span class="sk">strengths</span>: [<span class="st">String</span>],
  <span class="sk">weaknesses</span>: [<span class="st">String</span>],
  <span class="sk">suggestions</span>: [<span class="st">String</span>],
  <span class="sk">behaviourAnalysis</span>: <span class="st">Object</span>,
  <span class="sk">answerEvaluation</span>: [<span class="st">Object</span>],
  <span class="sk">pdfUrl</span>: <span class="st">String</span>
}
        </div>

        <!-- Multi-Agent System -->
        <div class="section-title"><span class="icon">🤖</span> Multi-Agent System</div>
        <p>VoxHire AI uses 8 specialised agents orchestrated via the backend to simulate an intelligent, multi-dimensional interviewer.</p>
        <div class="agent-grid">
          <div class="agent-card"><div class="ag-icon">🎙️</div><div class="ag-name">Interviewer</div>Generates & asks questions</div>
          <div class="agent-card"><div class="ag-icon">🔊</div><div class="ag-name">Speech</div>Edge TTS voice output</div>
          <div class="agent-card"><div class="ag-icon">🧠</div><div class="ag-name">Behaviour</div>NLP response analysis</div>
          <div class="agent-card"><div class="ag-icon">💬</div><div class="ag-name">Sentiment</div>BERT emotion scoring</div>
          <div class="agent-card"><div class="ag-icon">📷</div><div class="ag-name">Video</div>MediaPipe tracking</div>
          <div class="agent-card"><div class="ag-icon">📈</div><div class="ag-name">Scoring</div>Aggregate score calc</div>
          <div class="agent-card"><div class="ag-icon">💡</div><div class="ag-name">Feedback</div>Structured suggestions</div>
          <div class="agent-card"><div class="ag-icon">📄</div><div class="ag-name">Report</div>PDF generation</div>
        </div>

        <!-- Interview Flow -->
        <div class="section-title"><span class="icon">🔄</span> Interview Flow</div>
        <ul class="md-list">
          <li><strong>Setup:</strong> User selects interview type (Technical / Resume / Scenario), duration, and difficulty.</li>
          <li><strong>Technical Mode:</strong> User inputs tech stack → AI generates skill-based and scenario questions.</li>
          <li><strong>Resume Mode:</strong> User uploads resume → AI extracts data → personalised questions generated.</li>
          <li><strong>Live Session:</strong> AI speaks question → user answers via mic → Whisper transcribes → real-time analysis runs.</li>
          <li><strong>Analysis:</strong> Confidence, fluency, and communication scores computed per answer.</li>
          <li><strong>Report:</strong> After session ends, a PDF report with all scores, strengths, weaknesses and suggestions is generated.</li>
        </ul>

        <!-- Security -->
        <div class="section-title"><span class="icon">🔒</span> Security & Integrity</div>
        <div class="callout callout-warning">
          <span class="ci">⚠️</span>
          <span class="ct"><strong>Anti-Cheat System:</strong> VoxHire AI actively monitors for tab switching, multiple faces, and abnormal session activity. Violations are logged and flagged in the report.</span>
        </div>
        <ul class="md-list">
          <li><strong>Tab Switch Detection</strong> — Page Visibility API tracks focus loss events.</li>
          <li><strong>Face Validation</strong> — MediaPipe confirms a single face is visible throughout.</li>
          <li><strong>Session Tracking</strong> — JWT-secured sessions with timestamps and audit logs.</li>
        </ul>

        <!-- Pages / UI -->
        <div class="section-title"><span class="icon">🖥️</span> Frontend Pages</div>
        <ul class="md-list">
          <li><strong>Landing Page</strong> — Feature overview, CTA, and sign-in.</li>
          <li><strong>Interview Setup</strong> — Type, duration, difficulty, and tech stack selection.</li>
          <li><strong>Live Interview Screen</strong> — Camera feed, live transcript, and real-time analysis panel.</li>
          <li><strong>Dashboard</strong> — Overview stats and quick-start.</li>
          <li><strong>History</strong> — All past interviews with view/download options.</li>
          <li><strong>Report Page</strong> — Full structured report with PDF download.</li>
        </ul>

        <!-- Report sample scores -->
        <div class="section-title"><span class="icon">📊</span> Sample Report Output</div>
        <div class="score-grid">
          <div class="score-card">
            <div class="sc-val" style="color:#56d364">87</div>
            <div class="sc-label">Confidence</div>
          </div>
          <div class="score-card">
            <div class="sc-val" style="color:#79c0ff">74</div>
            <div class="sc-label">Fluency</div>
          </div>
          <div class="score-card">
            <div class="sc-val" style="color:#d2a8ff">91</div>
            <div class="sc-label">Communication</div>
          </div>
        </div>

        <div class="callout callout-tip">
          <span class="ci">✅</span>
          <span class="ct"><strong>PDF Export:</strong> Reports can be downloaded from both the Report page and the History page as fully formatted PDFs.</span>
        </div>

        <!-- Observability -->
        <div class="section-title"><span class="icon">🔍</span> Observability with LangSmith</div>
        <p>All AI prompt chains are traced with LangSmith for debugging, performance monitoring, and quality analysis of AI responses throughout the interview flow.</p>

        <!-- Folder structure -->
        <div class="section-title"><span class="icon">📁</span> Project Structure</div>
        <div class="code-block">
          <div class="code-block-header"><span>📂</span> Directory Layout <span class="lang">tree</span></div>
          <pre>voxhire-ai/
<span class="prop">├── client/</span>                 <span class="cm"># React frontend</span>
│   ├── src/
│   │   ├── pages/           <span class="cm"># Landing, Setup, Live, Dashboard, History, Report</span>
│   │   ├── components/      <span class="cm"># Camera, Transcript, AnalysisPanel, ReportCard</span>
│   │   └── hooks/           <span class="cm"># useWebRTC, useSpeech, useInterview</span>
<span class="prop">├── server/</span>                 <span class="cm"># Node.js + Express backend</span>
│   ├── routes/              <span class="cm"># interview, report, history, upload</span>
│   ├── agents/              <span class="cm"># interviewer, speech, behaviour, sentiment...</span>
│   ├── models/              <span class="cm"># User, Interview, Report (Mongoose)</span>
│   └── middleware/          <span class="cm"># auth, tabDetection, faceValidation</span>
<span class="prop">└── README.md</span></pre>
        </div>

        <!-- Future Enhancements -->
        <div class="section-title"><span class="icon">🔮</span> Roadmap</div>
        <ul class="md-list">
          <li><strong>Live Video Interview</strong> — Zoom-like real-time peer interviewing.</li>
          <li><strong>AI Avatar Interviewer</strong> — Animated 3D avatar with lip sync.</li>
          <li><strong>Resume Learning Roadmap</strong> — AI-generated skill improvement plan based on resume gaps.</li>
          <li><strong>Multilingual Support</strong> — Interview and transcription in multiple languages.</li>
          <li><strong>Browser Extension</strong> — Overlay assistant for real interview sessions.</li>
        </ul>

        <!-- Contributing -->
        <div class="section-title"><span class="icon">🤝</span> Contributing</div>
        <p>Contributions are welcome! Please open an issue before submitting a PR. Check <a href="#" style="color:var(--accent)">CONTRIBUTING.md</a> for our code style and branching conventions.</p>

        <div class="code-block">
          <div class="code-block-header"><span>🌿</span> Create a feature branch <span class="lang">bash</span></div>
          <pre>git checkout -b feature/your-feature-name
git commit -m <span class="str">"feat: add your feature"</span>
git push origin feature/your-feature-name</pre>
        </div>

        <div class="readme-footer">
          <p>Built with ❤️ using the <strong style="color:var(--text)">MERN Stack</strong> + <strong style="color:var(--text)">Groq</strong> + <strong style="color:var(--text)">Hugging Face</strong></p>
          <p style="margin-top:6px">Licensed under <a href="#">MIT License</a> · <a href="#">Report a Bug</a> · <a href="#">Request a Feature</a></p>
        </div>

      </div><!-- /readme-body -->
    </div><!-- /readme-container -->
  </main>

  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="side-card">
      <h3>About</h3>
      <p style="font-size:13px; line-height:1.5; margin-bottom:12px">AI-powered mock interview platform with real-time behavioural analysis, voice interaction, and structured PDF reports.</p>
      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px">
        <span class="badge badge-blue" style="font-size:10px">ai</span>
        <span class="badge badge-green" style="font-size:10px">mern-stack</span>
        <span class="badge badge-purple" style="font-size:10px">interview</span>
        <span class="badge badge-orange" style="font-size:10px">nlp</span>
        <span class="badge badge-teal" style="font-size:10px">groq</span>
        <span class="badge badge-red" style="font-size:10px">webrtc</span>
      </div>
    </div>

    <div class="side-card">
      <h3>Stats</h3>
      <div class="stat-row"><span class="sr-key">⭐ Stars</span><span class="sr-val">248</span></div>
      <div class="stat-row"><span class="sr-key">🍴 Forks</span><span class="sr-val">41</span></div>
      <div class="stat-row"><span class="sr-key">👁 Watchers</span><span class="sr-val">12</span></div>
      <div class="stat-row"><span class="sr-key">📝 Issues</span><span class="sr-val">7 open</span></div>
      <div class="stat-row"><span class="sr-key">🔀 PRs</span><span class="sr-val">3 open</span></div>
    </div>

    <div class="side-card">
      <h3>Languages</h3>
      <div class="lang-bar">
        <div class="lb-label"><span>JavaScript</span><span>68%</span></div>
        <div class="lb-track"><div class="lb-fill" style="width:68%; background:#f1e05a;"></div></div>
      </div>
      <div class="lang-bar">
        <div class="lb-label"><span>Python</span><span>18%</span></div>
        <div class="lb-track"><div class="lb-fill" style="width:18%; background:#3572A5;"></div></div>
      </div>
      <div class="lang-bar">
        <div class="lb-label"><span>CSS</span><span>10%</span></div>
        <div class="lb-track"><div class="lb-fill" style="width:10%; background:#563d7c;"></div></div>
      </div>
      <div class="lang-bar">
        <div class="lb-label"><span>Shell</span><span>4%</span></div>
        <div class="lb-track"><div class="lb-fill" style="width:4%; background:#89e051;"></div></div>
      </div>
    </div>

    <div class="side-card">
      <h3>Table of Contents</h3>
      <a class="toc-item" href="#">🧠 What is VoxHire AI</a>
      <a class="toc-item" href="#">⚙️ Tech Stack</a>
      <a class="toc-item" href="#">🚀 Getting Started</a>
      <a class="toc-item" href="#">🏗️ Architecture</a>
      <a class="toc-item" href="#">🔌 API Reference</a>
      <a class="toc-item" href="#">🗄️ MongoDB Schema</a>
      <a class="toc-item" href="#">🤖 Multi-Agent System</a>
      <a class="toc-item" href="#">🔄 Interview Flow</a>
      <a class="toc-item" href="#">🔒 Security</a>
      <a class="toc-item" href="#">📁 Project Structure</a>
      <a class="toc-item" href="#">🔮 Roadmap</a>
    </div>

    <div class="side-card">
      <h3>Contributors</h3>
      <div class="contrib-avatars">
        <div class="avatar" style="background:rgba(88,166,255,0.2); color:#79c0ff;">VH</div>
        <div class="avatar" style="background:rgba(63,185,80,0.2); color:#56d364;">AI</div>
        <div class="avatar" style="background:rgba(210,168,255,0.2); color:#d2a8ff;">MK</div>
        <div class="avatar" style="background:rgba(255,166,87,0.2); color:#ffa657;">SR</div>
      </div>
    </div>

    <div class="side-card">
      <h3>License</h3>
      <p style="font-size:13px; color:var(--muted)">MIT License — free to use, modify, and distribute.</p>
    </div>
  </aside>

</div><!-- /layout -->
</body>
</html>
