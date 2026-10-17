/**
 * Modern Web Application Lab Logic
 * Features:
 * - Theme Toggle (Dark / Light) with LocalStorage persistence
 * - Say Hello dynamic message (Lab requirement)
 * - CI/CD Pipeline status simulation and ping
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const helloBtn = document.querySelector('#helloBtn');
  const refreshStatusBtn = document.querySelector('#refreshStatusBtn');
  const statusEl = document.querySelector('#status');
  const themeToggleBtn = document.querySelector('#themeToggleBtn');
  const htmlRoot = document.documentElement;

  // 1. Initialize Theme from localStorage or system preference
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  } else {
    htmlRoot.setAttribute('data-theme', 'dark');
  }

  // Theme Toggle Event
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', targetTheme);
      localStorage.setItem('site-theme', targetTheme);
    });
  }

  // 2. Say Hello button handler (Lab Exercise Requirement)
  if (helloBtn && statusEl) {
    const greetingMessages = [
      'Hello from GitHub Pages! 👋 (CI/CD Pipeline Operational)',
      'ยินดีต้อนรับสู่เว็บแอปพลิเคชัน มหาวิทยาลัยบูรพา ✨',
      'Continuous Deployment Success! Code is live on GitHub Pages 🚀',
      'All automated checks passed cleanly! ✅'
    ];
    let msgIndex = 0;

    helloBtn.addEventListener('click', () => {
      statusEl.style.opacity = '0';
      setTimeout(() => {
        statusEl.textContent = greetingMessages[msgIndex % greetingMessages.length];
        statusEl.style.opacity = '1';
        msgIndex++;
      }, 150);
    });
  }

  // 3. Status Ping button
  if (refreshStatusBtn && statusEl) {
    refreshStatusBtn.addEventListener('click', () => {
      statusEl.style.opacity = '0';
      setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString('th-TH');
        statusEl.textContent = `Pipeline Ping OK at ${timestamp} (Latency: 14ms)`;
        statusEl.style.opacity = '1';
      }, 150);
    });
  }
});
