/* Interações principais: menu, tema, tour, revelação em scroll, tooltip, lightbox, formulário (salva rascunho/validação) */
(() => {
  const root = document.documentElement;
  const nav = document.getElementById('main-nav');
  const menuToggle = document.getElementById('menu-toggle') || document.getElementById('menu-toggle');
  const menuBtn = document.getElementById('menu-toggle');
  const menuButton = document.getElementById('menu-toggle');
  const menu = document.getElementById('main-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = localStorage.get
