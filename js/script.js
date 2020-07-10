
window.addEventListener("DOMContentLoaded", () => {

// Tabs
	const tabContent = document.querySelectorAll(".tabcontent"),
	tabsParent = document.querySelector(".tabheader__items"),
	tabItem = document.querySelectorAll(".tabheader__item");

	function hideAllTabs(){
		tabContent.forEach(item => {
		item.style.display = "none";
	});

	tabItem.forEach(item => {
		item.classList.remove("tabheader__item_active");
	});
	}

	function showTabContent(i = 0){
		tabContent[i].style.display = "block";
		tabItem[i].classList.add("tabheader__item_active");
	}

	tabsParent.addEventListener("click", (event) => {
	let target = event.target;
	if(target && target.classList.contains("tabheader__item")){
		tabItem.forEach((item, index) => {
			if (target == item){
				hideAllTabs();
				showTabContent(index);
			}
		});
	}
	});

	hideAllTabs();
	showTabContent();

// Timers

	const deadline = "2020-07-10T13:14";

	function calcDiffer(endtime){
		const milliseconds = Date.parse(endtime) - Date.parse(new Date()),
					days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
					hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24),
					minutes = Math.floor((milliseconds / (1000 * 60)) % 60),
					seconds = Math.floor((milliseconds / 1000) % 60);

		return {
			days,
			hours,
			minutes,
			seconds,
			milliseconds
		};
	}

	function setZero(data){
		if (data >= 0 && data < 10){
			return `0${data}`;
		} else{
			return data;
		}
	}

	function setTime(selector, endtime){
		const timer = document.querySelector(selector),
					days = timer.querySelector("#days"),
					hours = timer.querySelector("#hours"),
					minutes = timer.querySelector("#minutes"),
					seconds = timer.querySelector("#seconds");
		let timerId;

		updateTime();

		function updateTime(){
			const time = calcDiffer(endtime);
			days.innerHTML = setZero(time.days);
			hours.innerHTML = setZero(time.hours);
			minutes.innerHTML = setZero(time.minutes);
			seconds.innerHTML = setZero(time.seconds);

			if (time.milliseconds <= 0){
				if (timerId){
					clearInterval(timerId);
				}
				days.innerHTML = 0;
				hours.innerHTML = 0;
				minutes.innerHTML = 0;
				seconds.innerHTML = 0;
			}
		}

		timerId = setInterval(updateTime, 1000);
	}

	setTime(".timer", deadline);
});