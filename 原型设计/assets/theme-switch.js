// 主题切换功能 - 统一脚本 v6.0
// 解决闪烁问题：在页面渲染前立即设置主题
(function() {
  // 立即执行：在页面渲染前设置主题，避免闪烁
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme || 'light';
  document.documentElement.setAttribute('data-theme', theme);

  // 更新切换按钮显示
  function updateThemeToggle(theme) {
    const buttons = document.querySelectorAll('.theme-toggle, .theme-switcher');
    
    buttons.forEach(btn => {
      const icon = btn.querySelector('.theme-icon, .icon');
      const text = btn.querySelector('.theme-text, .text');
      
      if (!icon && !text) return;
      
      if (theme === 'dark') {
        if (icon) icon.textContent = '☀️';
        if (text) text.textContent = '浅色';
      } else {
        if (icon) icon.textContent = '🌙';
        if (text) text.textContent = '深色';
      }
    });
  }

  // 切换主题
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeToggle(newTheme);
    
    // 通知 iframe 子页面切换主题
    const frame = document.getElementById('content-frame');
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage({ type: 'THEME_CHANGE', theme: newTheme }, '*');
    }
  }

  // 监听来自父页面的主题变化消息
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'THEME_CHANGE') {
      const theme = event.data.theme;
      document.documentElement.setAttribute('data-theme', theme);
      updateThemeToggle(theme);
    }
  });

  // DOM加载完成后更新按钮状态
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      updateThemeToggle(theme);
    });
  } else {
    updateThemeToggle(theme);
  }

  // 暴露全局函数供直接调用
  window.toggleTheme = toggleTheme;
})();
