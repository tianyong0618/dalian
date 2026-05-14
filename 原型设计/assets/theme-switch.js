// 主题切换功能 - 统一脚本 v2.0
(function() {
  // 初始化主题
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'light';
    
    document.documentElement.setAttribute('data-theme', theme);
    applyThemeStyles(theme);
  }

  // 切换主题
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeToggle(newTheme);
    applyThemeStyles(newTheme);
    
    // 如果有iframe，通知子页面切换主题
    const frame = document.getElementById('content-frame');
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage({ type: 'THEME_CHANGE', theme: newTheme }, '*');
    }
  }

  // 更新切换按钮显示
  function updateThemeToggle(theme) {
    const icon = document.querySelector('.theme-icon');
    const text = document.querySelector('.theme-text');
    const btn = document.querySelector('.theme-toggle');
    
    if (!icon || !text || !btn) return;
    
    if (theme === 'dark') {
      icon.textContent = '☀️';
      text.textContent = '浅色';
      btn.style.background = 'rgba(99, 102, 241, 0.15)';
      btn.style.borderColor = 'rgba(99, 102, 241, 0.3)';
      btn.style.color = '#a5b4fc';
    } else {
      icon.textContent = '🌙';
      text.textContent = '深色';
      btn.style.background = 'rgba(22, 119, 255, 0.1)';
      btn.style.borderColor = '#1677ff';
      btn.style.color = '#1677ff';
    }
  }

  // 应用主题样式
  function applyThemeStyles(theme) {
    const body = document.body;
    
    if (theme === 'dark') {
      // 深色主题
      body.style.setProperty('--text-primary', '#e2e8f0');
      body.style.setProperty('--text-secondary', '#94a3b8');
      body.style.setProperty('--bg-primary', '#0f172a');
      body.style.setProperty('--bg-secondary', '#1e293b');
      body.style.setProperty('--border-color', '#334155');
      body.style.backgroundColor = '#0f172a';
      body.style.color = '#e2e8f0';
      
      // 更新导航栏
      document.querySelectorAll('.navbar, .top-nav').forEach(el => {
        el.style.background = 'rgba(30, 41, 59, 0.8)';
        el.style.borderColor = 'rgba(99, 102, 241, 0.2)';
      });
      
      // 更新卡片
      document.querySelectorAll('.card, .stat-card, .feature-card, .data-source-card').forEach(el => {
        el.style.background = 'rgba(30, 41, 59, 0.8)';
        el.style.borderColor = 'rgba(99, 102, 241, 0.2)';
      });
      
      // 更新表格
      document.querySelectorAll('table').forEach(table => {
        table.querySelectorAll('th').forEach(th => {
          th.style.background = 'rgba(30, 41, 59, 0.8)';
          th.style.color = '#e2e8f0';
          th.style.borderColor = 'rgba(99, 102, 241, 0.2)';
        });
        table.querySelectorAll('td').forEach(td => {
          td.style.color = '#94a3b8';
          td.style.borderColor = 'rgba(99, 102, 241, 0.1)';
        });
      });
      
      // 更新表单元素
      document.querySelectorAll('input, select, textarea').forEach(el => {
        el.style.background = 'rgba(30, 41, 59, 0.8)';
        el.style.borderColor = 'rgba(99, 102, 241, 0.2)';
        el.style.color = '#e2e8f0';
      });
      
      // 更新按钮
      document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.style.background = 'rgba(51, 65, 85, 0.8)';
        btn.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        btn.style.color = '#e2e8f0';
      });
      
      // 更新标签
      document.querySelectorAll('.tag').forEach(tag => {
        tag.style.background = 'rgba(99, 102, 241, 0.15)';
        tag.style.color = '#a5b4fc';
        tag.style.borderColor = 'rgba(99, 102, 241, 0.3)';
      });
      
      // 更新标题
      document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        h.style.color = '#e2e8f0';
      });
      
      // 更新段落
      document.querySelectorAll('p').forEach(p => {
        p.style.color = '#94a3b8';
      });
      
      // 更新下拉框选项
      document.querySelectorAll('option').forEach(opt => {
        opt.style.background = '#1e293b';
        opt.style.color = '#e2e8f0';
      });
      
    } else {
      // 浅色主题
      body.style.setProperty('--text-primary', '#1f2937');
      body.style.setProperty('--text-secondary', '#4b5563');
      body.style.setProperty('--bg-primary', '#ffffff');
      body.style.setProperty('--bg-secondary', '#f9fafb');
      body.style.setProperty('--border-color', '#e5e7eb');
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#1f2937';
      
      // 更新导航栏
      document.querySelectorAll('.navbar, .top-nav').forEach(el => {
        el.style.background = 'rgba(255, 255, 255, 0.8)';
        el.style.borderColor = 'rgba(22, 119, 255, 0.1)';
      });
      
      // 更新卡片
      document.querySelectorAll('.card, .stat-card, .feature-card, .data-source-card').forEach(el => {
        el.style.background = 'white';
        el.style.borderColor = '#e5e7eb';
      });
      
      // 更新表格
      document.querySelectorAll('table').forEach(table => {
        table.querySelectorAll('th').forEach(th => {
          th.style.background = '#f3f4f6';
          th.style.color = '#1f2937';
          th.style.borderColor = '#e5e7eb';
        });
        table.querySelectorAll('td').forEach(td => {
          td.style.color = '#4b5563';
          td.style.borderColor = '#e5e7eb';
        });
      });
      
      // 更新表单元素
      document.querySelectorAll('input, select, textarea').forEach(el => {
        el.style.background = 'white';
        el.style.borderColor = '#e5e7eb';
        el.style.color = '#1f2937';
      });
      
      // 更新按钮
      document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.style.background = 'white';
        btn.style.borderColor = '#e5e7eb';
        btn.style.color = '#1f2937';
      });
      
      // 更新标签
      document.querySelectorAll('.tag').forEach(tag => {
        tag.style.background = 'rgba(22, 119, 255, 0.1)';
        tag.style.color = '#1677ff';
        tag.style.borderColor = 'rgba(22, 119, 255, 0.2)';
      });
      
      // 更新标题
      document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        h.style.color = '#1f2937';
      });
      
      // 更新段落
      document.querySelectorAll('p').forEach(p => {
        p.style.color = '#6b7280';
      });
      
      // 更新下拉框选项
      document.querySelectorAll('option').forEach(opt => {
        opt.style.background = 'white';
        opt.style.color = '#1f2937';
      });
    }
  }

  // 监听来自父页面的主题变化消息
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'THEME_CHANGE') {
      const theme = event.data.theme;
      document.documentElement.setAttribute('data-theme', theme);
      updateThemeToggle(theme);
      applyThemeStyles(theme);
    }
  });

  // DOM加载完成后初始化
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    // 如果页面中已经有主题切换按钮，更新其显示状态
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      updateThemeToggle(savedTheme);
    }
  });

  // 暴露全局函数供直接调用
  window.toggleTheme = toggleTheme;
  window.initTheme = initTheme;
})();
