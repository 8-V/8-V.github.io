function sqr(x) {
  return x * x;
}

window.onload = _ => {
  btn = [...document.all].filter(x => x.nodeName == 'BUTTON')[0];
};

cheats = _ => {
  document.querySelector('.cheat').classList.add('fullscreen');
  [...document.all].map(x => {
    x.animate(
      [{background: 'white'}, {background: 'black'}, {background: 'white'}],
      {
        duration: 1000,
        iterations: Infinity,
      },
    );
  });
};
