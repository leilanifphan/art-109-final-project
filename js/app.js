// Minimal JS to toggle past/future postcards and send animation
(function(){
  var canvas = document.querySelector('.canvas');
  var pastBtn = document.querySelector('.past-btn');
  var futureBtn = document.querySelector('.future-btn');
  var wrapper = document.querySelector('.postcard-wrapper');
  var message = document.getElementById('message');
  var sendBtn = document.getElementById('sendBtn');

  function setMode(mode){
    if(!canvas) return;
    canvas.setAttribute('data-mode', mode);
    pastBtn && pastBtn.setAttribute('aria-pressed', mode==='past');
    futureBtn && futureBtn.setAttribute('aria-pressed', mode==='future');
    if(message){
      message.placeholder = mode==='past' ? 'Write to your past self...' : 'Write to your future self...';
    }
  }

  function restartAnimation(){
    if(!wrapper) return;
    wrapper.classList.remove('anim-send');
    void wrapper.offsetWidth; // reflow
    wrapper.classList.add('anim-send');
    wrapper.addEventListener('animationend', function handler(){
      wrapper.removeEventListener('animationend', handler);
      if(message) message.value='';
      wrapper.classList.remove('anim-send');
    });
  }

  if(pastBtn) pastBtn.addEventListener('click', function(){ setMode('past'); });
  if(futureBtn) futureBtn.addEventListener('click', function(){ setMode('future'); });
  if(sendBtn) sendBtn.addEventListener('click', restartAnimation);

  // Accessibility: allow keyboard toggle using arrow keys
  document.addEventListener('keydown', function(e){
    if(e.key==='ArrowLeft') setMode('past');
    if(e.key==='ArrowRight') setMode('future');
  });

  // Init
  setMode('past');
})();
