let cols = document.getElementsByClassName('collapse');
for (let i = 0; i < cols.length; i++) {
	let block = cols[i].nextElementSibling;
	cols[i].addEventListener("click", (event) => {
		block.style.display === 'none' || block.style.display === '' ? block.style.display = 'block' : block.style.display = 'none';
	});
}

let nav = document.querySelector('nav');
let mmopen = document.querySelector('nav .menu span');
let mmenu = document.getElementById('mmenu');
mmopen.addEventListener("click", (event) => {
	if (mmenu.style.display === 'none' || mmenu.style.display === '') {
		mmenu.style.display = 'block';
		nav.style.height = mmenu.offsetHeight + 16 + 'px';
	}
	else {
		mmenu.style.display = 'none';
		nav.style.height = '2.5rem';
	}
});
window.addEventListener("resize", (event) => {
	let mmenu = document.getElementById('mmenu');
	window.innerWidth > 768 ? mmenu.style.display = 'block' : mmenu.style.display = 'none';
});