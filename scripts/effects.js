// Cursor trail effect
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

// Interactive card effects
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
        
        const rotateX = (y - 50) * 0.1;
        const rotateY = (50 - x) * 0.1;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0)';
    });
});

// Add glitch effect to hero title
document.querySelector('.hero-title')?.setAttribute('data-text', document.querySelector('.hero-title')?.textContent || '');

// Add section dividers
document.querySelectorAll('section').forEach(section => {
    if (!section.previousElementSibling?.classList.contains('section-divider')) {
        const divider = document.createElement('div');
        divider.className = 'section-divider';
        section.parentNode.insertBefore(divider, section);
    }
});