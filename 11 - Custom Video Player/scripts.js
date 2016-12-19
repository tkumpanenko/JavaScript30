const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const toggle = player.querySelector('.toggle');
const skipBtn = player.querySelectorAll('[data-skip]');
const range = player.querySelectorAll('input[type=range]');
const progress = player.querySelector('.progress');
const filled = player.querySelector('.progress__filled');

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('load', handleProgress);
video.addEventListener('timeupdate', handleProgress);

let mouseDown = false;
progress.addEventListener('click', setPosition);
progress.addEventListener('mousedown', ev => mouseDown = true);
progress.addEventListener('mouseup', ev => mouseDown = false);
progress.addEventListener('mousemove', ev => {mouseDown && setPosition(ev)});

function setPosition(ev){
	let pos = ev.offsetX/progress.offsetWidth;
	filled.style.flexBasis = `${pos*100}%`;
	video.currentTime = pos*video.duration;
}

skipBtn.forEach(btn => {
	btn.textContent = btn.dataset.skip+'s';
	btn.addEventListener('click', skip)
});

function handleProgress(){
	let progress = this.currentTime/this.duration*100;
	filled.style.flexBasis = `${progress}%`
}

range.forEach(item => {
	item.addEventListener('change', rangeChange);
	// item.addEventListener('mousemove', rangeChange);
});

function rangeChange(){
	let method = this.name;
	video[method] = this.value;
}

function skip(){
	let step = parseFloat(this.dataset.skip);
	video.currentTime += step;
}


function togglePlay(){
	video.paused ? video.play() : video.pause();
}

function updateButton(ev){
	let icon = ev.type === 'pause' ? '►' : '■';
	toggle.textContent = icon;
}