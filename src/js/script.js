// ---- YEAR ----
document.getElementById('yr').textContent = new Date().getFullYear();
 
// ---- CURSOR SPOTLIGHT ----
const spotlight = document.getElementById('cursor-spotlight');
document.addEventListener('mousemove', (e) => {
  spotlight.style.left = e.clientX + 'px';
  spotlight.style.top = e.clientY + 'px';
});

// ---- INTERACTIVE STARFIELD ----
(function(){
  const c = document.getElementById('stars-canvas');
  const ctx = c.getContext('2d');
  let stars=[], W, H;
  let mouse = { x: null, y: null };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resize(){
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initStars(); });
  
  function initStars(){
    stars = [];
    for(let i = 0; i < 250; i++){
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        baseX: Math.random() * W,
        baseY: Math.random() * H,
        r: Math.random() * 1.8 + 0.3,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.005,
        speed: Math.random() * 0.2 + 0.05
      });
    }
  }
  initStars();
  
  function draw(){
    ctx.clearRect(0, 0, W, H);
    
    stars.forEach(s => {
      s.a += s.da;
      if(s.a > 1 || s.a < 0.2) s.da = -s.da;
      
      let drawX = s.x;
      let drawY = s.y;
      
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - s.x;
        let dy = mouse.y - s.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDist = 150;
        
        if (distance < maxDist) {
          let force = (maxDist - distance) / maxDist;
          let angle = Math.atan2(dy, dx);
          drawX -= Math.cos(angle) * force * 30 * (s.r / 2);
          drawY -= Math.sin(angle) * force * 30 * (s.r / 2);
        }
      }
      
      s.y -= s.speed;
      if (s.y < -10) {
        s.y = H + 10;
        s.x = Math.random() * W;
      }

      ctx.beginPath();
      ctx.arc(drawX, drawY, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226,232,240,${s.a * 0.8})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
 
// ---- ORB MOUSE ----
document.addEventListener('mousemove',e=>{
  const orb=document.getElementById('mainOrb');
  if(!orb)return;
  const wrap=document.getElementById('orbWrap');
  const r=wrap.getBoundingClientRect();
  const cx=r.left+r.width/2, cy=r.top+r.height/2;
  const dx=(e.clientX-cx)/r.width*20, dy=(e.clientY-cy)/r.height*20;
  orb.style.transform=`translate(${dx}px,${dy}px)`;
});
 
// ---- TYPEWRITER ----
(function(){
  const el=document.getElementById('typewriter');
  const words=['Web Developer','Software Engineering','AI Agent Builder','Prompt Engineering'];
  let wi=0,ci=0,deleting=false;
  function tick(){
    const w=words[wi];
    const display=deleting?w.slice(0,ci-1):w.slice(0,ci+1);
    ci=deleting?ci-1:ci+1;
    el.innerHTML=display+'<span class="cursor-blink">|</span>';
    if(!deleting&&ci===w.length){setTimeout(()=>{deleting=true;setTimeout(tick,80)},1500);return}
    if(deleting&&ci===0){deleting=false;wi=(wi+1)%words.length;setTimeout(tick,400);return}
    setTimeout(tick,deleting?50:100);
  }
  setTimeout(tick,1200);
})();
 
// ---- HAMBURGER ----
document.getElementById('hamburger').addEventListener('click',()=>{
  document.getElementById('nav-links').classList.toggle('open');
});
document.querySelectorAll('#nav-links nav a').forEach(a=>{
  a.addEventListener('click',()=>document.getElementById('nav-links').classList.remove('open'));
});
 
// ---- SCROLL REVEAL ----
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      revObs.unobserve(e.target);
    }
  });
}, {threshold: 0.15, rootMargin: '0px 0px -50px 0px'});
revealElements.forEach(r => revObs.observe(r));
 
// ---- TERMINAL ----
(function(){
  const body=document.getElementById('terminalBody');
  const inp=document.getElementById('termInput');
  const history=[];let hIdx=-1;
 
  function print(html,cls='t-out'){
    const d=document.createElement('div');
    d.className='t-line '+cls;d.innerHTML=html;
    body.appendChild(d);
    body.scrollTop=body.scrollHeight;
  }
  function printCmd(cmd){print('<span class="t-prompt">noon@mc:~$</span> <span class="t-cmd">'+cmd+'</span>')}
  function printEmpty(){print('&nbsp;')}
 
  const CMDS={
    help:()=>{
      print('Available commands:','t-accent');
      print('  <span class="t-cmd">whoami</span>         — About me as a developer');
      print('  <span class="t-cmd">tech</span>           — Tech stack overview');
      print('  <span class="t-cmd">tech --frontend</span> — Frontend skills');
      print('  <span class="t-cmd">tech --backend</span>  — Backend skills');
      print('  <span class="t-cmd">tech --database</span> — Database skills');
      print('  <span class="t-cmd">tech --ai</span>       — AI & Cloud skills');
      print('  <span class="t-cmd">status</span>         — Current availability');
      print('  <span class="t-cmd">projects</span>       — List all projects');
      print('  <span class="t-cmd">contact</span>        — Contact information');
      print('  <span class="t-cmd">clear</span>          — Clear terminal');
    },
    whoami:()=>{
      print('┌─────────────────────────────────────────┐','t-accent');
      print('│  <span class="t-accent">Noon</span> — Full-Stack Developer             │');
      print('├─────────────────────────────────────────┤','t-accent');
      print('│  🎓 Computer Science student             │');
      print('│  💡 Passionate about scalable systems    │');
      print('│  🤖 AI integration enthusiast            │');
      print('│  ☕ Java Spring Boot specialist          │');
      print('│  📍 Thailand (Remote-friendly)           │');
      print('│  🎯 Seeking internship opportunities     │');
      print('└─────────────────────────────────────────┘','t-accent');
    },
    'tech':()=>{
      print('Use a flag: <span class="t-cmd">tech --frontend</span>, <span class="t-cmd">--backend</span>, <span class="t-cmd">--database</span>, <span class="t-cmd">--ai</span>');
    },
    'tech --frontend':()=>{
      print('[Frontend]','t-info');
      print('React.js · Next.js · TypeScript · Tailwind CSS');
      print('HTML5 / CSS3 · Framer Motion · Responsive Design');
    },
    'tech --backend':()=>{
      print('[Backend]','t-info');
      print('Java · Spring Boot · Spring Security · Node.js');
      print('Python · RESTful APIs · JWT Auth · Microservices');
    },
    'tech --database':()=>{
      print('[Database]','t-info');
      print('MySQL · PostgreSQL · MongoDB · Redis');
      print('JPA/Hibernate · Query Optimization');
    },
    'tech --ai':()=>{
      print('[AI & Cloud]','t-info');
      print('Groq / OpenAI API · DeepFace · Computer Vision');
      print('AWS S3 · Docker · Git / GitHub Actions');
    },
    status:()=>{
      print('<span class="t-accent">●</span> SYSTEM STATUS — <span class="t-accent">ONLINE</span>');
      print('Availability : <span class="t-accent">Open for Internships</span>');
      print('Mode         : Full-time / Part-time');
      print('Location     : Thailand | Remote OK');
      print('Response time: &lt; 24 hours');
    },
    projects:()=>{
      print('[Mission Logs]','t-info');
      print('1. <span class="t-accent">Photo Finder</span>         — AI facial recognition platform');
      print('2. <span class="t-accent">Finance Tracker</span>      — Java + MySQL backend system');
      print('3. <span class="t-accent">Email Tone Polisher</span>  — AI-powered email refinement');
      print('→ See <a href="#projects" style="color:var(--accent)">Projects section</a> for details');
    },
    contact:()=>{
      print('[Contact]','t-info');
      print('✉  <span class="t-accent">noon@example.com</span>');
      print('⌥  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style="color:var(--accent)">github.com/noon-dev</a>');
      print('⊞  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style="color:var(--accent)">linkedin.com/in/noon-dev</a>');
    },
    clear:()=>{body.innerHTML='';return}
  };
 
  print('<span class="t-accent">▶ Mission Control Terminal v1.0.0</span>','t-accent');
  print('Welcome, operator. System initialized.');
  print('Type <span class="t-cmd">help</span> to see available commands.');
  printEmpty();
 
  inp.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
      const cmd=inp.value.trim();
      if(!cmd)return;
      history.unshift(cmd);hIdx=-1;
      printEmpty();printCmd(cmd);
      const fn=CMDS[cmd];
      if(fn)fn();
      else print('<span class="t-err">Command not found: '+cmd+'</span> — type <span class="t-cmd">help</span>');
      printEmpty();
      inp.value='';
      body.scrollTop=body.scrollHeight;
    }
    if(e.key==='ArrowUp'){
      hIdx=Math.min(hIdx+1,history.length-1);
      if(history[hIdx])inp.value=history[hIdx];
      e.preventDefault();
    }
    if(e.key==='ArrowDown'){
      hIdx=Math.max(hIdx-1,-1);
      inp.value=hIdx>=0?history[hIdx]:'';
      e.preventDefault();
    }
    if(e.key==='Tab'){
      e.preventDefault();
      const val=inp.value;
      const matches=Object.keys(CMDS).filter(k=>k.startsWith(val));
      if(matches.length===1)inp.value=matches[0];
    }
  });
 
  document.querySelector('.terminal-wrap').addEventListener('click',()=>inp.focus());
})();
 
// ---- GITHUB GRAPH ----
(async function(){
  const g = document.getElementById('ghGraph');
  const username = 'WoranutKhwanpongdee'; // 📝 TODO: เปลี่ยนเป็น GitHub Username จริงของคุณ
  
  try {
    // 1. เรียกข้อมูลจาก Community Proxy API
    const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    
    // 2. แปลงข้อมูลและกรองเอาแค่ 182 วันล่าสุด (26 weeks) ให้พอดีกับช่องที่คุณเตรียมไว้
    let days = data.contributions.flat().slice(-182);
    g.innerHTML = ''; 
    
    // 3. วาด DOM ใหม่ด้วยข้อมูลการ Commit จริงๆ
    days.forEach(day => {
      const d = document.createElement('div');
      let levelClass = '';
      // เทียบสเกลสีตามจำนวนการ Commit
      if (day.contributionCount > 0 && day.contributionCount <= 3) levelClass = 'l1';
      else if (day.contributionCount > 3 && day.contributionCount <= 6) levelClass = 'l2';
      else if (day.contributionCount > 6 && day.contributionCount <= 10) levelClass = 'l3';
      else if (day.contributionCount > 10) levelClass = 'l4';
      
      d.className = `gh-cell ${levelClass}`;
      d.title = `${day.contributionCount} contributions on ${day.date}`; // เพิ่ม Tooltip ตอนเอาเมาส์ชี้
      g.appendChild(d);
    });
  } catch (err) {
    console.warn('GitHub API failed, using fallback:', err);
    // Fallback: ถ้าเน็ตหลุดหรือ API พัง ให้สุ่มเหมือนเดิมเว็บจะได้ไม่โล่ง
    const levels=['','l1','l2','l3','l4'];
    for(let i=0;i<182;i++){
      const d=document.createElement('div');
      const r=Math.random();
      d.className='gh-cell '+(r>0.6?levels[Math.floor(Math.random()*4)+1]:'');
      g.appendChild(d);
    }
  }
})();
 
// ---- PROJECTS DATA ----
const projects=[
  {
    num:'01',
    title:'Photo Finder',
    desc:'AI-powered facial recognition platform that enables users to search and identify photos using advanced computer vision and machine learning algorithms.',
    tags:['Python','DeepFace','React.js','FastAPI','AWS S3','OpenCV'],
    problem:'Organizing thousands of photos is a manual, time-consuming task. Photo Finder automates this by matching faces across albums in seconds.',
    solution:'Integrated DeepFace library for facial embeddings, backed by a FastAPI service with AWS S3 storage. React frontend provides real-time feedback.',
    arch:`[Upload UI] → [FastAPI Backend]\n      ↓                    ↓\n  [AWS S3 Storage]  [DeepFace Engine]\n      ↓                    ↓\n  [Photo DB]  ←  [Face Embedding Index]`,
    code:`<span class="cmt"># Facial recognition core</span>\n<span class="kw">from</span> deepface <span class="kw">import</span> DeepFace\n \n<span class="kw">def</span> <span class="fn">find_similar_faces</span>(img_path: <span class="type">str</span>) -> <span class="type">list</span>:\n    <span class="str">"""Find matching faces in database."""</span>\n    results = DeepFace.find(\n        img_path=img_path,\n        db_path=<span class="str">"./photo_db"</span>,\n        model_name=<span class="str">"Facenet512"</span>,\n        distance_metric=<span class="str">"cosine"</span>,\n        enforce_detection=<span class="kw">False</span>\n    )\n    <span class="kw">return</span> results`,
    github:'https://github.com/',
    demo:'#',
    img:'https://image.qwenlm.ai/public_source/601bef2c-dd80-4c4d-937f-e12869ad38ef/17fa8756f-f1b8-4647-b597-85e737d19322.png'
  },
  {
    num:'02',
    title:'Personal Finance Tracker',
    desc:'A backend-heavy financial management system built with Java Spring Boot and MySQL, featuring real-time analytics, budget tracking, and automated expense categorization.',
    tags:['Java','Spring Boot','MySQL','Spring Security','JPA','REST API'],
    problem:'Most finance apps lack fine-grained control over data and categories. This system gives full ownership with a robust backend and reporting engine.',
    solution:'Built a RESTful API with Spring Boot, JWT authentication, and JPA/Hibernate ORM. MySQL stores transactions with indexed queries for fast analytics.',
    arch:`[React Dashboard]\n      ↓\n[Spring Boot API] ← [JWT Auth]\n      ↓\n[MySQL Database]\n  ├── transactions\n  ├── categories\n  └── budgets`,
    code:`<span class="ann">@RestController</span>\n<span class="ann">@RequestMapping</span>(<span class="str">"/api/transactions"</span>)\n<span class="kw">public class</span> <span class="type">TransactionController</span> {\n    <span class="ann">@Autowired</span>\n    <span class="kw">private</span> <span class="type">TransactionService</span> service;\n \n    <span class="ann">@GetMapping</span>(<span class="str">"/summary"</span>)\n    <span class="kw">public</span> <span class="type">ResponseEntity</span>&lt;<span class="type">SummaryDTO</span>&gt; getSummary(\n        <span class="ann">@AuthenticationPrincipal</span> <span class="type">UserDetails</span> user,\n        <span class="ann">@RequestParam</span> <span class="type">String</span> month\n    ) {\n        <span class="kw">return</span> ResponseEntity.ok(\n            service.getMonthlySummary(user.getUsername(), month)\n        );\n    }\n}`,
    github:'https://github.com/',
    demo:'#',
    img:'https://image.qwenlm.ai/public_source/601bef2c-dd80-4c4d-937f-e12869ad38ef/1c647df83-67bb-4213-8c04-4ca43a427393.png'
  },
  {
    num:'03',
    title:'AI Email Tone Polisher',
    desc:'An intelligent web application that helps you polish and refine your email drafts. Built with Next.js and powered by the Groq API (Llama 3), this tool transforms rough ideas or raw text into professional, clear, and context-appropriate emails. Instantly switch between 8+ tones, and even get your draft "roasted" for tough-love feedback.',
    tags:['Next.js','TypeScript','Tailwind CSS v4','Groq API','Radix UI','Lucide Icons'],
    problem:'Writers often struggle with email tone—whether setting clear boundaries politely, writing collaborative updates, or sounding formal. Writing drafts from scratch is also time-consuming.',
    solution:'Built a Next.js application integrated with the Groq API (llama-3.1-8b-instant) to dynamically rewrite drafts into 8+ distinct tones. Added a "Roast My Email" feature that provides humorous, corporate-style criticism and suggestions.',
    arch:`[Email Draft Input]\n      ↓\n[Next.js App Router] → [Groq API Route]\n                            ↓\n                      [Llama 3 Model]\n                            ↓\n                 [Roast / Polished Output]`,
    code:`<span class="cmt">// Groq API chat completion with Llama 3</span>\n<span class="kw">export async function</span> <span class="fn">POST</span>(req: <span class="type">Request</span>) {\n  <span class="kw">const</span> { draft, tone, mode } = <span class="kw">await</span> req.json();\n  <span class="kw">const</span> prompt = mode === <span class="str">"roast"</span>\n    ? <span class="str">\`Roast this email like a sarcastic corporate boss: \${draft}\`</span>\n    : <span class="str">\`Rewrite this email in a \${tone} tone: \${draft}\`</span>;\n\n  <span class="kw">const</span> completion = <span class="kw">await</span> groq.chat.completions.create({\n    messages: [{ role: <span class="str">"user"</span>, content: prompt }],\n    model: <span class="str">"llama-3.1-8b-instant"</span>\n  });\n  <span class="kw">return</span> NextResponse.json({ result: completion.choices[0].message.content });\n}`,
    github:'https://github.com/',
    demo:'#',
    img:'assets/emailtone.png'
  }
];
 
// ---- RENDER PROJECTS ----
(function(){
  const grid=document.getElementById('projectsGrid');
  projects.forEach((p, idx)=>{
    const card=document.createElement('div');
    card.className='proj-card' + (idx % 2 === 1 ? ' reverse' : '');
    card.setAttribute('data-tilt', '');
    card.setAttribute('data-tilt-max', '3');
    card.setAttribute('data-tilt-glare', 'true');
    card.setAttribute('data-tilt-max-glare', '0.05');
    card.setAttribute('data-tilt-scale', '1.01');
    
    card.innerHTML=`
      <div class="proj-visual">
        <div class="browser-mockup" onclick="openLightbox('${p.img}')">
          <div class="browser-bar">
            <div class="b-dot red"></div>
            <div class="b-dot yellow"></div>
            <div class="b-dot green"></div>
            <div class="browser-url">noon.dev/${p.title.toLowerCase().replace(/\s+/g, '-')}</div>
          </div>
          <img class="browser-img" src="${p.img}" alt="${p.title} Preview" loading="lazy"/>
        </div>
      </div>
      <div class="proj-info">
        <div class="proj-title">${p.title}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-tags">${p.tags.map(t=>`<span class="proj-tag">${t}</span>`).join('')}</div>
        <div class="proj-links">
          <a class="btn-primary" href="${p.github}" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Code
          </a>
          <button class="btn-ghost" onclick="openModal(${idx})">Details</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  VanillaTilt.init(document.querySelectorAll(".proj-card"), {
    max: 3,
    speed: 400,
    glare: true,
    "max-glare": 0.05,
    scale: 1.01
  });
})();
 
// ---- LIGHTBOX ----
function openLightbox(imgSrc){
  document.getElementById('lightboxImg').src = imgSrc;
  document.getElementById('lightboxOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxOverlay').addEventListener('click', e=>{
  if(e.target===document.getElementById('lightboxOverlay')) closeLightbox();
});
function closeLightbox(){
  document.getElementById('lightboxOverlay').classList.remove('open');
  document.body.style.overflow='';
}

// ---- MODAL ----
function openModal(idx){
  const p=projects[idx];
  const content=document.getElementById('modalContent');
  content.innerHTML=`
    <h2>${p.title}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin:1rem 0">${p.tags.map(t=>`<span class="proj-tag">${t}</span>`).join('')}</div>
    <h3>Problem</h3>
    <p>${p.problem}</p>
    <h3>Solution</h3>
    <p>${p.solution}</p>
    <h3>Architecture</h3>
    <div class="arch-diagram">${p.arch}</div>
    <h3>Code Highlight</h3>
    <div class="code-block">${p.code}</div>
    <div style="display:flex;gap:0.75rem;margin-top:1.5rem;flex-wrap:wrap">
      <a class="btn-primary" href="${p.github}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      <a class="btn-ghost" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
document.getElementById('modalClose').addEventListener('click',closeModal);
document.getElementById('modalOverlay').addEventListener('click',e=>{
  if(e.target===document.getElementById('modalOverlay'))closeModal();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeModal();
    closeLightbox();
  }
});
function closeModal(){
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow='';
}

// ---- INIT TILT ON BENTO CARDS ----
VanillaTilt.init(document.querySelectorAll(".bento-card"), {
  max: 5,
  speed: 400,
  glare: true,
  "max-glare": 0.1
});