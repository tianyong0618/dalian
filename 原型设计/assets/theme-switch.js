// 主题切换功能 - 统一脚本 v3.0
// 基于人员画像(深色)和调解仲裁(浅色)样式设计
(function() {
  // 深色主题样式（人员画像风格）
  const darkStyles = {
    '--text-primary': '#e2e8f0',
    '--text-secondary': '#94a3b8',
    '--bg-primary': '#0a0e1a',
    '--bg-secondary': '#0f172a',
    '--bg-card': 'rgba(15, 23, 42, 0.8)',
    '--bg-stat': 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
    '--border-color': 'rgba(99, 102, 241, 0.2)',
    '--border-card': 'rgba(99, 102, 241, 0.15)',
    '--accent-color': '#6366f1',
    '--accent-gradient': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    '--tag-bg': 'rgba(99, 102, 241, 0.15)',
    '--tag-color': '#a5b4fc',
    '--btn-primary': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    '--btn-secondary': 'rgba(51, 65, 85, 0.8)',
    '--btn-secondary-border': 'rgba(99, 102, 241, 0.3)',
    '--table-header': 'rgba(30, 41, 59, 0.8)',
    '--navbar-bg': 'rgba(30, 41, 59, 0.6)',
    '--input-bg': 'rgba(30, 41, 59, 0.8)',
    '--input-border': 'rgba(99, 102, 241, 0.2)',
    '--hover-bg': 'rgba(99, 102, 241, 0.08)'
  };

  // 浅色主题样式（调解仲裁风格）
  const lightStyles = {
    '--text-primary': '#1f2937',
    '--text-secondary': '#6b7280',
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f9fafb',
    '--bg-card': '#ffffff',
    '--bg-stat': '#ffffff',
    '--border-color': '#e5e7eb',
    '--border-card': '#e5e7eb',
    '--accent-color': '#1677ff',
    '--accent-gradient': 'linear-gradient(135deg, #1677ff, #096dd9)',
    '--tag-bg': 'rgba(22, 119, 255, 0.1)',
    '--tag-color': '#1677ff',
    '--btn-primary': 'linear-gradient(135deg, #1677ff, #096dd9)',
    '--btn-secondary': '#ffffff',
    '--btn-secondary-border': '#d9d9d9',
    '--table-header': '#f5f5f5',
    '--navbar-bg': 'rgba(255, 255, 255, 0.85)',
    '--input-bg': '#ffffff',
    '--input-border': '#d9d9d9',
    '--hover-bg': '#f5f5f5'
  };

  // 初始化主题
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'light';
    
    document.documentElement.setAttribute('data-theme', theme);
    applyThemeStyles(theme);
    updateThemeToggle(theme);
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
    
    // 通知 iframe 子页面切换主题
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
    const styles = theme === 'dark' ? darkStyles : lightStyles;
    
    // 设置 CSS 变量
    Object.keys(styles).forEach(key => {
      body.style.setProperty(key, styles[key]);
    });
    
    // 设置基础背景和文字颜色
    body.style.backgroundColor = styles['--bg-primary'];
    body.style.color = styles['--text-primary'];
    
    // 更新导航栏
    document.querySelectorAll('.navbar, .spa-header, header').forEach(el => {
      el.style.background = styles['--navbar-bg'];
      el.style.borderColor = styles['--border-color'];
      if (theme === 'dark') {
        el.style.boxShadow = 'none';
      } else {
        el.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
      }
    });
    
    // 更新卡片
    document.querySelectorAll('.card, .data-source-card').forEach(el => {
      el.style.background = styles['--bg-card'];
      el.style.borderColor = styles['--border-card'];
    });
    
    // 更新统计卡片（深色主题特殊处理）
    document.querySelectorAll('.stat-card').forEach(el => {
      el.style.background = theme === 'dark' ? darkStyles['--bg-stat'] : '#ffffff';
      el.style.borderColor = theme === 'dark' ? 'rgba(99, 102, 241, 0.2)' : '#e5e7eb';
    });
    
    // 更新表格
    document.querySelectorAll('table').forEach(table => {
      table.querySelectorAll('th').forEach(th => {
        th.style.background = styles['--table-header'];
        th.style.color = styles['--text-primary'];
        th.style.borderColor = styles['--border-color'];
      });
      table.querySelectorAll('td').forEach(td => {
        td.style.color = styles['--text-secondary'];
        td.style.borderColor = styles['--border-color'];
      });
      table.querySelectorAll('tr').forEach(tr => {
        tr.onmouseover = function() {
          this.style.background = styles['--hover-bg'];
        };
        tr.onmouseout = function() {
          this.style.background = 'transparent';
        };
      });
    });
    
    // 更新表单元素
    document.querySelectorAll('input, select, textarea, .form-input, .form-select').forEach(el => {
      el.style.background = styles['--input-bg'];
      el.style.borderColor = styles['--input-border'];
      el.style.color = styles['--text-primary'];
    });
    
    // 更新按钮
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.style.background = styles['--btn-primary'];
    });
    
    document.querySelectorAll('.btn-secondary').forEach(btn => {
      btn.style.background = styles['--btn-secondary'];
      btn.style.borderColor = styles['--btn-secondary-border'];
      btn.style.color = styles['--text-primary'];
    });
    
    // 更新标签
    document.querySelectorAll('.tag').forEach(tag => {
      tag.style.background = styles['--tag-bg'];
      tag.style.color = styles['--tag-color'];
      tag.style.borderColor = theme === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(22, 119, 255, 0.2)';
    });
    
    // 更新徽章
    if (theme === 'dark') {
      document.querySelectorAll('.badge').forEach(badge => {
        badge.style.borderColor = 'currentColor';
      });
    }
    
    // 更新标题
    document.querySelectorAll('h1, h2, h3, h4, .navbar-logo').forEach(h => {
      h.style.color = styles['--text-primary'];
    });
    
    // 更新段落
    document.querySelectorAll('p').forEach(p => {
      p.style.color = styles['--text-secondary'];
    });
    
    // 更新下拉框选项
    document.querySelectorAll('option').forEach(opt => {
      opt.style.background = styles['--bg-secondary'];
      opt.style.color = styles['--text-primary'];
    });
    
    // 更新导航按钮
    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.classList.contains('active')) {
        btn.style.background = theme === 'dark' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(147, 51, 234, 0.3))' : 'rgba(22, 119, 255, 0.1)';
        btn.style.color = theme === 'dark' ? '#e0e7ff' : '#1677ff';
        btn.style.borderColor = theme === 'dark' ? 'rgba(99, 102, 241, 0.5)' : 'rgba(22, 119, 255, 0.3)';
      } else {
        btn.style.background = theme === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'transparent';
        btn.style.color = theme === 'dark' ? '#a5b4fc' : '#6b7280';
        btn.style.borderColor = theme === 'dark' ? 'rgba(99, 102, 241, 0.3)' : '#d9d9d9';
      }
    });
    
    // 更新 SPA 内容区
    document.querySelectorAll('.spa-content').forEach(el => {
      el.style.background = styles['--bg-secondary'];
    });
    
    // 更新模态框
    document.querySelectorAll('.modal-overlay').forEach(el => {
      el.style.background = theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)';
    });
    
    document.querySelectorAll('.modal').forEach(el => {
      el.style.background = theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : '#ffffff';
      el.style.borderColor = styles['--border-color'];
    });
    
    // 更新进度条
    document.querySelectorAll('.progress-bar').forEach(el => {
      el.style.background = theme === 'dark' ? 'rgba(51, 65, 85, 0.8)' : '#f0f0f0';
    });
    
    document.querySelectorAll('.progress-fill').forEach(el => {
      el.style.background = theme === 'dark' ? 'linear-gradient(90deg, #3b82f6, #6366f1)' : 'linear-gradient(90deg, #1677ff, #096dd9)';
    });
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
  });

  // 暴露全局函数供直接调用
  window.toggleTheme = toggleTheme;
  window.initTheme = initTheme;
})();
