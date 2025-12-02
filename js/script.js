// Minimal JS for mode toggle and send animation
(function(){
  var canvas   = document.querySelector('.canvas');
  var pastBtn  = document.querySelector('.past-btn');
  var futureBtn= document.querySelector('.future-btn');
  var wrapper  = document.querySelector('.postcard-wrapper');
  var message  = document.getElementById('message');
  var sendBtn  = document.getElementById('sendBtn');
  var envelope = document.querySelector('.envelope');

  function setMode(mode){
    if(!canvas) return;
    canvas.setAttribute('data-mode', mode);
    if(message){
      message.placeholder = mode==='past' ? 'Write to your past self...' : 'Write to your future self...';
    }
    // Toggle pressed state indicator for both buttons
    if(pastBtn){ pastBtn.setAttribute('aria-pressed', mode==='past' ? 'true' : 'false'); }
    if(futureBtn){ futureBtn.setAttribute('aria-pressed', mode==='future' ? 'true' : 'false'); }
  }

  function restartAnimation(){
    if(!wrapper) return;
    // trigger postcard send
    wrapper.classList.remove('anim-send');
    void wrapper.offsetWidth;
    wrapper.classList.add('anim-send');

    // message rides with postcard when it has content
    if(message && message.value.trim() !== ''){
      message.classList.add('message-sync');
    }

    // envelope tilt at start
    if(envelope){
      envelope.classList.remove('is-bouncing','resetting');
      void envelope.offsetWidth;
      envelope.classList.add('is-tilting');
    }

    // end of send
    wrapper.addEventListener('animationend', function handler(){
      wrapper.removeEventListener('animationend', handler);
      wrapper.classList.remove('anim-send');
      if(message){
        message.value = '';
        message.classList.remove('message-sync');
      }
      if(envelope){
        // simple bounce then reset using timeouts (no extra listeners)
        envelope.classList.remove('is-tilting');
        envelope.classList.add('is-bouncing');
        setTimeout(function(){
          envelope.classList.remove('is-bouncing');
          envelope.classList.add('resetting');
          setTimeout(function(){
            envelope.classList.remove('resetting');
          }, 750);
        }, 600);
      }

      // Fade the active postcard back in
      var mode = (canvas && canvas.getAttribute('data-mode')) === 'future' ? 'future' : 'past';
      var activePostcard = document.querySelector('.postcard.' + mode);
      if(activePostcard){
        activePostcard.classList.add('fade-back');
        activePostcard.addEventListener('animationend', function endFade(){
          activePostcard.removeEventListener('animationend', endFade);
          activePostcard.classList.remove('fade-back');
        });
      }
    });
  }

  pastBtn  && pastBtn.addEventListener('click',  function(){ setMode('past');   });
  futureBtn&& futureBtn.addEventListener('click', function(){ setMode('future'); });
  sendBtn  && sendBtn.addEventListener('click',  restartAnimation);

  setMode('past');
})();
