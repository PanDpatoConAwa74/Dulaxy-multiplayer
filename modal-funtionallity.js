window.onload = function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
};

document.addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';  
});

