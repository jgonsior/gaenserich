window.sr = ScrollReveal( {
  reset: true,
  opacity: 0.2,
  duration: 500,
  mobile: false
}
);

sr.reveal('.background');

sr.reveal('section');
sr.reveal('#a1 h2', 50);

sr.reveal('#contacts li', 50);
