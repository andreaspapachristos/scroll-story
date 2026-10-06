document.addEventListener("DOMContentLoaded", () => {

    const stories = [

        {
            title: "ΕΓΩ",

            text:
                "Είμαι ο Ανδρεάς. Μου αρέσει να δημιουργώ, να μαθαίνω και να εξελίσσομαι, " +
                "Πιστεύω ότι η εμπειρία έχει αξία όταν συνδυάζεται με περιέργεια και διάθεση για κάτι καινούργιο.",

            image: 0
        },

        {
            title: "ΔΗΜΙΟΥΡΓΩ",

            text:
                "Από μια ιδέα σε κάτι πραγματικό" +
                "Η τεχνολογία είναι ένας από τους τρόπους με τους οποίους εκφράζομαι" +
                "Μου αρέσει να σχεδιάζω, προγραμματίζω και να πειραματίζομαι με νέες ιδέες" +
                "από web εφαρμογές μέχρι αυτοματισμούς και cloud υποδομές.",

            image: 1
        },

        {
            title: "ΚΙΝΟΥΜΑΙ",

            text:
                "Το σώμα χρειάζεται κίνηση." +
                "Η κολύμβηση και η άσκηση αποτελού σημαντικό κομμάτι της καθεμάρινοτητας μου. " +
                "Με ενδιαφέρει η όλη η διαδικασία: η συνέπεια, η προσπάθεια, " +
                "και η μικρή βελτίωση που έρχεται κάθε φορά.",

            image: 2
        },

        {
            title: "ΕΞΕΛΙΣΣΟΜΑΙ",

            text:
                "Δεν πιστεύω ότι η εξέλιξη έχει ηλικία." +
                "Μπορείς να ξεκινήσεις κάτι καινούργιο, " +
                "να μάθεις μια νέα τεχνολογία, " +
                "να βάλεις έναν διαφορετικό στόχο και να εκπλήξεις τον εαυτό σου.",

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
    ================================= */

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