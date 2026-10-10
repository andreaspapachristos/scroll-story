document.addEventListener("DOMContentLoaded", () => {

    const stories = [

        {
            title: "Who I Am",

            text:
                "I believe that life is made of small moments, meaningful experiences, and the things we choose to pursue with passion. I am curious by nature, always looking for something new to learn, create, or understand. I enjoy technology, creativity, travelling, and the simple satisfaction of seeing an idea become something real.", 
                

            image: 0
        },

        {
            title: "Technology & Creativity",

            text:
                "Technology has always been more than a tool for me. It is a way of thinking, experimenting, and creating. From programming and web development to discovering new technologies, I enjoy understanding how things work and finding better ways to make them work. I like building things from scratch and turning ideas into practical, elegant solutions.",

            image: 1
        },

        {
            title: "Beyond the Screen",

            text:
                "There is a whole world outside technology. I enjoy staying active, swimming, exploring new places, and challenging myself with new experiences. I believe that keeping the mind curious and the body active creates a balance that makes everyday life more interesting and rewarding",

            image: 2
        },

        {
            title: "Always Moving Forward",

            text:
                "I don't believe in standing still. There is always something new to learn, another challenge to take on, or another idea worth exploring. For me, progress is not about being perfect; it is about remaining curious, improving little by little, and enjoying the journey along the way.",

            image: 3
        }

    ];


    const title =
        document.getElementById("story-title");

    const text =
        document.getElementById("story-text");

    const number =
        document.querySelector(".section-number");

    const images =
        document.querySelectorAll(".story-image");

    const dots =
        document.querySelectorAll(".dot");

    const progressBar =
        document.querySelector(".progress-bar");


    let currentIndex = 0;

    let isAnimating = false;


    /* =================================
       CREATE FLIP CHARACTERS
    ================================= */

    function createCharacters(
        element,
        finalText,
        type
    ) {

        element.innerHTML = "";

        const fragment =
            document.createDocumentFragment();


        for (
            let i = 0;
            i < finalText.length;
            i++
        ) {

            const character =
                finalText[i];


            /*
             * Space
             */

            if (character === " ") {

                const space =
                    document.createElement("span");

                space.className =
                    "flip-space";

                fragment.appendChild(space);

                continue;
            }


            /*
             * Character
             */

            const span =
                document.createElement("span");

            span.className =
                "flip-character";

            span.textContent =
                character;


            /*
             * Το paragraph έχει
             * πιο ήπιο stagger.
             */

            const delay =
                type === "title"
                    ? i * 55
                    : i * 18;


            span.style.animationDelay =
                `${delay}ms`;


            fragment.appendChild(span);

        }


        element.appendChild(fragment);
    }


    /* =================================
       IMAGE
    ================================= */

    function changeImage(index) {

        images.forEach(
            (image, i) => {

                image.classList.toggle(
                    "active",
                    i === index
                );

            }
        );
    }


    /* =================================
       DOTS
    ================================= */

    function updateDots(index) {

        dots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === index
                );

            }
        );
    }


    /* =================================
       PROGRESS
    ================================= */

    function updateProgress(index) {

        const value =
            (
                index /
                (stories.length - 1)
            ) * 100;


        progressBar.style.width =
            `${value}%`;
    }


    /* =================================
       CHANGE STORY
    ================================= */

    function changeStory(index) {

        if (
            index === currentIndex ||
            isAnimating
        ) {
            return;
        }


        if (
            index < 0 ||
            index >= stories.length
        ) {
            return;
        }


        isAnimating = true;

        currentIndex = index;


        const story =
            stories[index];


        /*
         * Number
         */

        number.textContent =
            String(index + 1)
                .padStart(2, "0");


        /*
         * Image
         */

        changeImage(
            story.image
        );


        /*
         * Dots
         */

        updateDots(index);


        /*
         * Progress
         */

        updateProgress(index);


        /*
         * TITLE
         */

        createCharacters(
            title,
            story.title,
            "title"
        );


        /*
         * PARAGRAPH
         */

        createCharacters(
            text,
            story.text,
            "text"
        );


        /*
         * Περιμένουμε να ολοκληρωθεί
         * το μεγαλύτερο animation.
         */

        const titleDuration =
            story.title.length * 55 + 400;

        const textDuration =
            story.text.length * 18 + 350;


        const duration =
            Math.max(
                titleDuration,
                textDuration
            );


        setTimeout(
            () => {

                isAnimating = false;

            },
            duration
        );

    }


    /* =================================
       MOUSE WHEEL
    ================================= 

    window.addEventListener(
        "wheel",
        event => {

            if (isAnimating) {
                return;
            }


            if (event.deltaY > 0) {

                changeStory(
                    currentIndex + 1
                );

            }


            else if (event.deltaY < 0) {

                changeStory(
                    currentIndex - 1
                );

            }

        },
        {
            passive: true
        }
    );


    /* =================================
       DOT CLICK
    ================================= */
        /* =================================
       MOUSE WHEEL + MOBILE TOUCH
    ================================= */

    window.addEventListener(
        "wheel",
        event => {

            if (isAnimating) {
                return;
            }

            if (event.deltaY > 0) {
                changeStory(currentIndex + 1);
            } else if (event.deltaY < 0) {
                changeStory(currentIndex - 1);
            }

        },
        {
            passive: true
        }
    );


    /* =================================
       TOUCH SWIPE (MOBILE / TABLET)
    ================================= */

    let touchStartX = 0;
    let touchStartY = 0;

    const swipeThreshold = 50;

    window.addEventListener(
        "touchstart",
        event => {

            if (event.touches.length !== 1) {
                return;
            }

            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchend",
        event => {

            if (isAnimating || event.changedTouches.length !== 1) {
                return;
            }

            const touchEndX = event.changedTouches[0].clientX;
            const touchEndY = event.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Αγνοούμε μικρές κινήσεις και οριζόντια swipes.
            if (
                Math.abs(deltaY) < swipeThreshold ||
                Math.abs(deltaY) < Math.abs(deltaX)
            ) {
                return;
            }

            // Swipe προς τα πάνω: επόμενο story.
            if (deltaY < 0) {
                changeStory(currentIndex + 1);
            }

            // Swipe προς τα κάτω: προηγούμενο story.
            else {
                changeStory(currentIndex - 1);
            }

        },
        {
            passive: true
        }
    );


/* Αντικατάστησε το .stories-container
   με τον πραγματικό selector σου. */



    dots.forEach(
        dot => {

            dot.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            dot.dataset.index
                        );

                    changeStory(index);

                }
            );

        }
    );


    /* =================================
       KEYBOARD
    ================================= */

    window.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "ArrowDown" ||
                event.key === "ArrowRight"
            ) {

                changeStory(
                    currentIndex + 1
                );

            }


            if (
                event.key === "ArrowUp" ||
                event.key === "ArrowLeft"
            ) {

                changeStory(
                    currentIndex - 1
                );

            }

        }
    );


    /* =================================
       INITIAL STATE
    ================================= */

    createCharacters(
        title,
        stories[0].title,
        "title"
    );


    createCharacters(
        text,
        stories[0].text,
        "text"
    );


    updateProgress(0);

});
