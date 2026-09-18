/* =========================
   ПИСЬМА
========================= */

const letters = {

    1: `
        <h2>Привет, Соня! 👋</h2>

        <p>
            Если ты это читаешь, значит ты всё-таки решила
            нажать на этот странный конверт 😂
        </p>
    `,

    2: `
        <h2>Небольшое сообщение 🩷</h2>

        <p>
            Тут нет какого-то особого повода.
            Просто иногда хочется сделать человеку
            что-нибудь приятное :)
        </p>
    `,

    3: `
        <h2>Очень важная информация ⚠️</h2>

        <p>
            Мы вместе учились, не забывай)
        </p>
    `,

    4: `
        <h2>И последнее ✨</h2>

        <p>
            Надеюсь, этот маленький сайт хотя бы
            немного поднял тебе настроение.
            Если да — значит всё получилось 💙
        </p>
    `
};


/* =========================
   ПЕРЕМЕННЫЕ
========================= */

let openedLetters = new Set();

const letterWindow =
    document.getElementById("letterWindow");

const letterContent =
    document.getElementById("letterContent");

const counter =
    document.getElementById("counter");

const secretContainer =
    document.getElementById("secretContainer");


/* =========================
   ОТКРЫТИЕ ПИСЬМА
========================= */

function openLetter(number, element) {

    /* Не открываем повторно */
    if (!openedLetters.has(number)) {

        openedLetters.add(number);

        element.classList.add("opened");

        counter.textContent =
            openedLetters.size;

        createHearts(element);

        vibrate();

        /* Показываем секрет после всех */
        if (openedLetters.size === 4) {

            setTimeout(() => {

                secretContainer.classList.add("visible");

            }, 700);
        }
    }

    letterContent.innerHTML =
        letters[number];

    letterWindow.classList.add("show");
}


/* =========================
   ЗАКРЫТИЕ ПИСЬМА
========================= */

function closeLetter() {

    letterWindow.classList.remove("show");
}


/* Закрытие по фону */

letterWindow.addEventListener(
    "click",
    function(event) {

        if (event.target === letterWindow) {

            closeLetter();
        }
    }
);


/* =========================
   СЕРДЕЧКИ
========================= */

function createHearts(element) {

    const rect =
        element.getBoundingClientRect();

    const symbols = [
        "💙",
        "🩷",
        "🤍",
        "✨",
        "💫"
    ];

    for (let i = 0; i < 14; i++) {

        const heart =
            document.createElement("div");

        heart.className = "flying";

        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        heart.style.left =
            (rect.left + rect.width / 2)
            + "px";

        heart.style.top =
            (rect.top + rect.height / 2)
            + "px";

        heart.style.setProperty(
            "--x",
            ((Math.random() - .5) * 180)
            + "px"
        );

        heart.style.animationDelay =
            (Math.random() * .25)
            + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 1600);
    }
}


/* =========================
   ВИБРАЦИЯ IPHONE
========================= */

function vibrate() {

    if ("vibrate" in navigator) {

        navigator.vibrate(20);
    }
}


/* =========================
   СЕКРЕТНЫЙ ФИНАЛ
========================= */

function openSecret() {

    const finalScreen =
        document.getElementById("finalScreen");

    finalScreen.classList.add("show");

    createFinalParticles();

    vibrate();
}


function closeSecret() {

    const finalScreen =
        document.getElementById("finalScreen");
     finalScreen.classList.remove("show");
}


/* =========================
   ЧАСТИЦЫ ФОНА
========================= */

function createParticles() {

    const container =
        document.getElementById("particles");

    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.animationDuration =
            (5 + Math.random() * 8)
            + "s";

        particle.style.animationDelay =
            (-Math.random() * 8)
            + "s";

        const size =
            2 + Math.random() * 5;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        container.appendChild(particle);
    }
}


/* =========================
   ФИНАЛЬНЫЕ ЧАСТИЦЫ
========================= */

function createFinalParticles() {

    const symbols = [
        "💙",
        "🩷",
        "🤍",
        "✨",
        "💫"
    ];

    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            const item =
                document.createElement("div");

            item.className = "flying";

            item.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

            item.style.left =
                Math.random() * 100 + "vw";

            item.style.top =
                (60 + Math.random() * 30)
                + "vh";

            item.style.setProperty(
                "--x",
                ((Math.random() - .5) * 250)
                + "px"
            );

            item.style.fontSize =
                (15 + Math.random() * 20)
                + "px";

            document.body.appendChild(item);

            setTimeout(() => {

                item.remove();

            }, 1500);

        }, i * 80);
    }
}


/* =========================
   ЗАПУСК
========================= */

createParticles();


/* =========================
   ESC НА КЛАВИАТУРЕ
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeLetter();
            closeSecret();
        }
    }
);