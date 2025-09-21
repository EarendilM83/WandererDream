/* =========================
   Talk bubble + heart toggle
   ========================= */
const BOY_LINES = [
  "გამარჯობა, ქეთი", "ან არ ვიცი ეს ტექსტი როგორ უნდა დამეწყო...", "როცა ვფიქრობდი როგორ მომელოცა დაბადების დღე, ეს ნამდვილად არ მქონია ჩაფიქრებული", "ვეცდები რაც შეიძლება კარგად გამოვიდეს.", "ეს ჩვენ ვართ.", "სადღაც ჩემი ფანტაზიის უსაფრთხო სამყაროში", "აქ ყველაფერი ისეა როგორც მე წარმოვიდგენდი", "შენ გვერდით ხარ, მე შენს სილუეტს ვუყურებ, შენ - ჩემსას", "ჩვენ ვუყურებთ ერთმანეთს და ვიცით რომ ერთმანეთისთვის ვართ შექმნილები. (შეიძლება შენ ჯერ არ იცი, მაგრამ არაუშავს)", "არ ვიცი ეს სიტყვები რამდენად კარგად გადმოსცემს იმას რასაც ვგრძნობ", "მაგრამ მე მინდა იცოდე, რომ შენ ჩემთვის ძალიან მნიშვნელოვანი ადამიანი ხარ", "ჩემი შთაგონების წყარო და სიმშვიდე მიუხედავად შენი ბობოქარი ხასიათისა.", "შენთან ერთად ვიცი რომ ყველაფერი შესაძლებელია.",
    "შენ და მე... ერთად, რაღაც უცნაურ და მშვენიერ სამყაროში. ჩემთვის კარგად ჟღერს ^^", "ალბათ ასე მახსენდება შენთან გატარებული ყველა ღამე", "მზის ჩასვლები, სიჩუმე, პერსეიდების წვიმა, ჩვენი წითელი კალციფერი და შენი თმის სურნელი",
  "შენი ხასიათი სეზონებს გავს. ნელა ნამდვილად არ იცვლება, მაგრამ დღეს ვფიქრობდი რომ პირველი წელია, როცა ყველა სეზონი ერთად გავიარეთ და მგონი შენი მუდსვინგებიც აღარ მაშინებს.", "ჩემთვის ეს ერთ-ერთი გამორჩეული წელი იყო შენთან ერთად.", "6 წლის წინ ვერც ვიფიქრებდი, რომ ბირბაიკთან შემთხვევით შეხვედრა ასე დასრულდებოდა", "და მე ძალიან ბედნიერი ვარ რომ ასე მოხდა.", "ეს დღე შენთვის ძალიან მნიშვნელოვანია და უკვე ჩემთვისაც", "ბოდიში რომ ამდენ ხანს ვერ მოგილოცე, ერორების სწორებამ დიდი დრო წაიღო :D", "მაგრამ ახლა აქ ვარ, შენს გვერდით, ამ პატარა სამყაროში, სადაც ყველაფერი შესაძლებელია...", "და მინდა რომ, ძალიან ბედნიერი იყო ^^",
  "არ ვიცი რა გველოდება ამ სამყაროში, მაგრამ იმ ენერგიების მეც მჯერა და ვიცი რომ ასე უბრალოდ არ მოვხვდებოდი აქ, ვერც შენ წაიკითხავდი ამას.","საითაც არ უნდა მიდიოდეს ეს გზა მე მინდა რომ შენთან ერთად გავიარო, ერთად ვნახოთ რა არის იქ, სადღაც ჩვენს მიღმა...",
  "დაბადების დღეს გილოცავ, ქეთი 🎈 ამ სამყაროში ამაღამ ბევრი ვარსკვლავი ჩამოვარდება. შეგიძლია ყველა სურვილი ჩაუთქვა ❤️"
];




(function initTalkUI(){
  // anchor on the boy; fallback to bottom center if not found
  const boy = document.querySelector('.boy');
  const anchor = boy || document.body;

  // Avoid duplicates if hot-reloading
  if (anchor.querySelector('#sbWrap') || anchor.querySelector('#attnHeart')) return;

  // Create heart button
  const heart = document.createElement('button');
  heart.id = 'attnHeart';
  heart.className = 'attn-heart';
  heart.type = 'button';
  heart.setAttribute('aria-label', 'Open message');
  heart.textContent = '❤️';

  // Create bubble
  const wrap = document.createElement('div');
  wrap.id = 'sbWrap';
  wrap.className = 'sb-wrap';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-modal', 'false');
  wrap.innerHTML = `
    <div class="sb-bubble">
      <button class="sb-close" type="button" aria-label="Close">×</button>
      <p class="sb-text" id="sbText"></p>
      <div class="sb-controls">
        <button class="sb-btn" id="sbPrev" type="button" aria-label="Previous">←</button>
        <span class="sb-progress" id="sbProg">1/${BOY_LINES.length}</span>
        <button class="sb-btn" id="sbNext" type="button" aria-label="Next">→</button>
      </div>
    </div>
  `;

  // Mount
  if (boy){
    boy.appendChild(heart);
    boy.appendChild(wrap);
  } else {
    // fallback position if .boy missing
    heart.style.position = 'fixed';
    heart.style.left = '50%';
    heart.style.bottom = '18vh';
    heart.style.transform = 'translateX(-50%)';
    document.body.appendChild(heart);

    wrap.style.position = 'fixed';
    wrap.style.left = '50%';
    wrap.style.bottom = '22vh';
    wrap.style.transform = 'translateX(-50%)';
    document.body.appendChild(wrap);
  }

  // Elements
  const textEl = wrap.querySelector('#sbText');
  const progEl = wrap.querySelector('#sbProg');
  const prevBtn = wrap.querySelector('#sbPrev');
  const nextBtn = wrap.querySelector('#sbNext');
  const closeBtn = wrap.querySelector('.sb-close');

  // State
  let i = 0, typing = false, timer = null;

  function updateProgress(){
    progEl.textContent = `${i+1}/${BOY_LINES.length}`;
    prevBtn.disabled = (i === 0);
    nextBtn.textContent = (i === BOY_LINES.length - 1) ? '❤' : '→';
  }

  function type(line, speed = 22){
    clearInterval(timer);
    textEl.textContent = '';
    typing = true;
    let k = 0;
    timer = setInterval(()=>{
      if (k >= line.length){
        clearInterval(timer);
        typing = false;
        return;
      }
      textEl.textContent += line.charAt(k++);
    }, speed);
  }

  function render(){ type(BOY_LINES[i]); updateProgress(); }

  function openBubble(){
    wrap.classList.add('is-open');
    heart.classList.remove('show');
    render();
    // focus for accessibility
    wrap.querySelector('.sb-bubble').focus?.({ preventScroll:true });
  }

  function closeBubble(){
    wrap.classList.remove('is-open');
    heart.classList.add('show');
    clearInterval(timer);
    typing = false;
  }

  function skipOrNext(){
    if (typing){
      clearInterval(timer);
      typing = false;
      textEl.textContent = BOY_LINES[i];
    } else if (i < BOY_LINES.length - 1){
      i++; render();
    }
  }

  function prev(){
    if (typing){
      clearInterval(timer);
      typing = false;
    }
    if (i > 0){ i--; render(); }
  }

  // Events
  heart.addEventListener('click', openBubble);
  closeBtn.addEventListener('click', closeBubble);
  nextBtn.addEventListener('click', skipOrNext);
  prevBtn.addEventListener('click', prev);

  window.addEventListener('keydown', (e)=>{
    const tag = (document.activeElement || {}).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (!wrap.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeBubble();
    if (e.key === 'ArrowRight') skipOrNext();
    if (e.key === 'ArrowLeft')  prev();
  });

  // Show heart after 5s
  setTimeout(()=> heart.classList.add('show'), 10000);
})();

document.addEventListener('DOMContentLoaded', () => {
  const a = document.getElementById('bgm');
  if (!a) return;
  a.volume = 0.16;     // set your default volume
  a.autoplay = true;   // ask the browser to autoplay

  // try immediately
  a.play().catch(() => { /* some browsers block until a gesture */ });

  // minimal fallback: first tap/click starts it (no UI needed)
  window.addEventListener('pointerdown', () => {
    a.play().catch(()=>{});
  }, { once: true });
});
