document.addEventListener("DOMContentLoaded", () => {

  
  const cards = document.querySelectorAll('.card');
  const slider = document.querySelector('.slider');
  const dotsContainer = document.querySelector('.dots');
  
  if (!cards.length || !slider || !dotsContainer) return;

  let index = 0;
  let startX = 0;
  let autoSlide;

  /* 🔘 สร้าง dot อัตโนมัติ */
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.addEventListener('click', () => {
      index = i;
      update();
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function update() {
    cards.forEach((card, i) => {
      card.className = 'card';
      if (i === index) card.classList.add('active');
      if (i === index - 1) card.classList.add('prev');
      if (i === index + 1) card.classList.add('next');
      if (i < index - 1) card.classList.add('far-prev');
      if (i > index + 1) card.classList.add('far-next');
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(next, 3500);
  }

  function next() {
    index = (index + 1) % cards.length;
    update();
    resetAutoSlide();
  }

  function prev() {
    index = (index - 1 + cards.length) % cards.length;
    update();
    resetAutoSlide();
  }

  /* 🎮 ปุ่ม */
  window.next = next;
  window.prev = prev;

  /* 👉 swipe มือถือ */
  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlide);
  });

  slider.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) next();
    if (endX - startX > 50) prev();
  });

  resetAutoSlide();
  update();
});


document.addEventListener("DOMContentLoaded", () => {
  const bg = document.querySelector('.bg-hearts');
  if (!bg) {
    console.error('❌ ไม่เจอ .bg-hearts');
    return;
  }

  const hearts = ['💗','💖','💞','💕','💘'];

  function spawnHeart(x = Math.random() * window.innerWidth) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    h.style.left = x + 'px';
    h.style.fontSize = 18 + Math.random() * 18 + 'px';
    h.style.animationDuration = 8 + Math.random() * 6 + 's';

    bg.appendChild(h);
    setTimeout(() => h.remove(), 15000);
  }

  /* ลอยอัตโนมัติ */
  setInterval(spawnHeart, 800);

  /* 🖱️ ตามเมาส์ */
  let t;
  document.addEventListener('mousemove', e => {
    if (t) return;
    t = setTimeout(() => {
      spawnHeart(e.clientX);
      t = null;
    }, 120);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("paperPopup");
  const textEl = document.getElementById("paperText");
  const closeBtn = document.getElementById("closeEnvelope");

 const text = `
[title]สวัสดีวันวาเลนไทน์ปีแรกของเรานะครับ วิชญาดา 💕[/title]

เค้ารักเธอทุกวันเลยนะ ไม่ใช่แค่วันนี้วันเดียว  
เค้าอยากบอกว่าเค้าดีใจมาก ๆ ที่ได้เจอเธอ  
ดีใจที่มีเธออยู่ในชีวิต และได้ใช้ทุกวันไปกับเธอ  

[heart]ขอบคุณในความน่ารักของเธอในทุก ๆ วัน[/heart]  
ขอบคุณที่เกิดมาให้เค้าได้รัก  
และขอบคุณมากจริง ๆ ที่รักเค้านะ 🤍  

ถึงบางครั้งเราจะทะเลาะกันบ้าง  
หรือมีเรื่องที่ไม่เข้าใจกันบ้าง  
แต่เธอก็ยังคอยอยู่ข้าง ๆ และรักเค้าเสมอ  

[end]เค้ารักเธอมากนะ กฤษฎา[/end]  
ถ้า “ตลอดไป” มีอยู่จริง  
เค้าขอให้มันเกิดขึ้นกับความรักของเรานะครับ 🌷💞
`;


  let i = 0;
  let typingTimer = null;
  let opened = false;

  /* ✉️ คลิกซอง */
  envelope.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    // เปิดซอง
    envelope.classList.add("open");

    // หน่วงให้ flap เปิดก่อน
    setTimeout(() => {
      overlay.classList.add("show");
      document.body.style.overflow = "hidden";
      startTyping();
    }, 450);
  });

  /* ⌨️ typing */
  function startTyping() {
  textEl.innerHTML = "";
  i = 0;

  typingTimer = setInterval(() => {
    const current = text.slice(0, i + 1);
    textEl.innerHTML = formatText(current);
    i++;
    if (i >= text.length) clearInterval(typingTimer);
  }, 60);
}

  /* ❌ ปิด popup */
  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", e => {
    if (e.target === overlay) closePopup();
  });

  function closePopup() {
    overlay.classList.remove("show");
    envelope.classList.remove("open");
    document.body.style.overflow = "";

    clearInterval(typingTimer);
    paperText.textContent = "";
    opened = false;
  }
});




function formatText(str) {
  return str
    .replace(/\n/g, "<br>")
    .replace(/\[title\](.*?)\[\/title\]/g, '<span class="txt-title">$1</span>')
    .replace(/\[heart\](.*?)\[\/heart\]/g, '<span class="txt-heart">$1</span>')
    .replace(/\[end\](.*?)\[\/end\]/g, '<span class="txt-end">$1</span>');
}
