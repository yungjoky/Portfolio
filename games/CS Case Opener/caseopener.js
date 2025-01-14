const knives = [
    "images/Kukri_Knife_Fade.png",
    "images/Kukri_Knife_Crimson_Web.png",
    "images/Survival_Knife_Fade.png",
    "images/Classic_Knife_Crimson_Web.png",
    "images/Talon_Knife_Marble_Fade.png",
    "images/Paracord_Knife_Fade.png",
    "images/Skeleton_Knife_Crimson_Web.png"
];
const knifeNames = [
    "Kukri Knife | Fade",
    "Kukri Knife | Crimson Web",
    "Survival Knife | Fade",
    "Classic Knife | Crimson Web",
    "Talon Knife | Marble Fade",
    "Paracord Knife | Fade",
    "Skeleton Knife | Crimson Web",
];

const items = [
    "images/Scrawl.png",
    "images/Ensnared.png",
    "images/Foresight.png",
    "images/NecroJr.png",
    "images/Lifted_Spirits.png",
    "images/Poltrygeist.png",
    "images/Spirit_Board.png",
    "images/Space_Cat.png",
    "images/Dream_Glade.png",
    "images/Night_Terror.png",
    "images/Zombie_Offensive.png",
    "images/Ticket_To_Hell.png",
    "images/Melondrama.png",
    "images/Rapid_Eye_Movement.png",
    "images/Abyssal_Apparition.png",
    "images/Nightwish.png",
    "images/Starlight_Protector.png",
    "images/ExclusiveRare.jpg"
];

const itemNames = [
    "Five-SeveN | Scrawl",
    "MAC-10 | Ensnared",
    "MAG-7 | Foresight",
    "MP5-SD | Necro Jr.",
    "P2000 | Lifted Spirits",
    "SCAR-20 | Poultrygeist",
    "Sawed-Off | Spirit Board",
    "PP-Bizon | Space Cat",
    "G3SG1 | Dream Glade",
    "M4A1-S | Night Terror",
    "XM1014 | Zombie Offensive",
    "USP-S | Ticket to Hell",
    "Dual Berettas | Melondrama",
    "FAMAS | Rapid Eye Movement",
    "MP7 | Abyssal Apparition",
    "AK-47 | Nightwish",
    "MP9 | Starlight Protector",
    "Special Item"
];

function getRandomKnife() {
    const randomIndex = Math.floor(Math.random() * knives.length);
    return {
        name: knifeNames[randomIndex],
        image: knives[randomIndex]
    };
}
function triggerConfetti() {
    var end = Date.now() + (5 * 1000);

    // go Buckeyes!
    var colors = ['#ffd700', '#FFD700'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

class Roulette {

    constructor() {
        this.SIZE = 128;
        this.LENGTH = 80;
        this.DURATION =  8000;

        this.progress = 0;

        this.startTime = 0;
        this.lastItem = 0;

        this.level = 0;
        
        this.roulette = document.getElementById("roulette");
        this.items = this.roulette.children;
    }

    init(images) {
        if (!Array.isArray(images)) {
            console.log("You need to pass images as an array!");
        }

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        for (let i = 0; i < 6; i++) {
            const item = this.items[i];
            
            item.style.position = 'absolute';
            item.style.transform = `translateX(${i * this.SIZE}px)`;
            item.lastChild.src = this.getItem();
        }
    }

    start() {
        this.level = 0;
        this.progress = 0;
        this.lastItem = Math.floor(Math.random() * items.length); // Randomly select an item
        this.startTime = Date.now();

        for (let i = 0; i < 6; i++) {
            this.items[i].value = 0;
        }

        window.requestAnimationFrame(() => this.update());
    }

    update() {
        this.progress = (Date.now() - this.startTime) / this.DURATION;

        if (this.progress > 1) {
            this.progress = 1;
            this.render();
            this.displayResult();
            return;
        }

        this.render();

        window.requestAnimationFrame(() => this.update());
    }

    render() {
        const off = this.interpolator(this.progress) * this.SIZE * this.LENGTH;
        const WIDTH = this.SIZE * 6;

        for (let i = 0; i < 6; i++) {
            const item = this.items[i];
            const base = (i + 1) * this.SIZE - off;
            const index = -Math.floor(base / WIDTH);
            const value = ((base % WIDTH) + WIDTH) % WIDTH - this.SIZE;
            
            item.style.transform = `translateX(${value}px)`;

            if (item.value != index) {
                this.level += index - item.value;

                item.value = index;
                item.lastChild.src = this.getItem();

                if (this.level == this.LENGTH - 3) {
                    item.lastChild.src = this.getItem(this.lastItem);
                }
            }
        }
    }

    interpolator(val) {
        return Math.pow(Math.sin(val * Math.PI / 2), 2.6);
    }

    getItem(val) {
        val = typeof val !== "undefined" ? val : Math.floor(Math.random() * items.length);
        return items[val];
    }

    displayResult() {
        const winningItem = items[this.lastItem];
        const winningItemName = itemNames[this.lastItem];
        const resultDiv = document.getElementById("result");
        const congratsDiv = document.getElementById("congratulations");
        
        // Determine rarity and style
        let rarityClass = 'blue-win';
        if (winningItem === "images/ExclusiveRare.jpg") {
            const knife = getRandomKnife();
            rarityClass = 'legendary-win';
            congratsDiv.innerHTML = `
                <div class="confetti"></div>
                <h2 class="legendary-text">Congratulations!</h2>
                <h3>You just won a ${knife.name}</h3>
                <img src="${knife.image}" alt="${knife.name}" class="won-item">
                <button id="continuePlaying" class="legendary-button">Continue Playing</button>
            `;
            triggerConfetti();
        } else {
            // Check index ranges for different rarities
            if (this.lastItem >= 7 && this.lastItem <= 11) rarityClass = 'purple-win';
            if (this.lastItem >= 12 && this.lastItem <= 14) rarityClass = 'pink-win';
            if (this.lastItem >= 15 && this.lastItem <= 16) rarityClass = 'red-win';
            
            congratsDiv.innerHTML = `
                <div class="confetti"></div>
                <h2>Congratulations!</h2>
                <h3>You just won:</h3>
                <img src="${winningItem}" alt="${winningItemName}" class="won-item">
                <p>${winningItemName}</p>
                <button id="continuePlaying">Continue Playing</button>
            `;
        }
        
        resultDiv.className = 'result ' + rarityClass;
        document.body.classList.add('blur-background');
        resultDiv.classList.remove('hidden');
        
        // Continue button
          // Continue button
          document.getElementById("continuePlaying").onclick = () => {
            resultDiv.setAttribute('class', 'hidden'); 
            document.body.classList.remove("blur-background");
            congratsDiv.innerHTML = '';
        };
    }
}

const roulette = new Roulette();
roulette.init(items);

const btnStart = document.getElementById("roulette-start");

btnStart.onclick = () => roulette.start();