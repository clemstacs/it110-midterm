document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    const newQuoteButton = document.getElementById("btn");
    const copyButton = document.getElementById("copy-btn");
    const shareButton = document.getElementById("share-btn");

    const API_URL = "https://api.animechan.io/v1/quotes/random";

    let currentQuote = "";
    let currentCharacter = "";
    let currentAnime = "";

    async function getRandomQuote() {
        newQuoteButton.disabled = true;
        newQuoteButton.textContent = "Loading...";
        quoteElement.textContent = "Loading anime quote...";
        authorElement.textContent = "";

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const result = await response.json();
            const data = result.data;

            if (!data || !data.content) {
                throw new Error("No quote received from the API.");
            }

            currentQuote = data.content;
            currentCharacter =
                data.character?.name || "Unknown Character";
            currentAnime =
                data.anime?.name || "Unknown Anime";

            quoteElement.textContent = `“${currentQuote}”`;
            authorElement.textContent =
                `${currentCharacter} · ${currentAnime}`;

        } catch (error) {
            console.error("Error fetching anime quote:", error);

            quoteElement.textContent =
                "Unable to load a quote. Please try again.";
            authorElement.textContent = "";

            currentQuote = "";
            currentCharacter = "";
            currentAnime = "";

        } finally {
            newQuoteButton.disabled = false;
            newQuoteButton.textContent = "New Quote";
        }
    }

    // Copy the current quote
    async function copyQuote() {
        if (!currentQuote) {
            alert("Please load a quote first.");
            return;
        }

        const text =
            `“${currentQuote}” — ${currentCharacter} (${currentAnime})`;

        try {
            await navigator.clipboard.writeText(text);
            copyButton.textContent = "Copied!";

            setTimeout(() => {
                copyButton.textContent = "Copy";
            }, 1500);

        } catch (error) {
            window.prompt("Copy your quote:", text);
        }
    }

    // Share the current quote
    async function shareQuote() {
        if (!currentQuote) {
            alert("Please load a quote first.");
            return;
        }

        const text =
            `“${currentQuote}” — ${currentCharacter} (${currentAnime})`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Random Anime Quote",
                    text: text
                });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Sharing failed:", error);
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(text);
                alert("Quote copied! You can now share it.");
            } catch (error) {
                window.prompt("Copy this quote to share:", text);
            }
        }
    }

    // Button event listeners
    newQuoteButton.addEventListener("click", getRandomQuote);
    copyButton.addEventListener("click", copyQuote);
    shareButton.addEventListener("click", shareQuote);

    // Display a quote when the page opens
    getRandomQuote();
});

// ---------- Click the character to cycle through 4 pictures ----------
const character = document.querySelector('.anime-character-container');

if (character) {                          // only runs on app.html
    const totalImages = 4;
    let current = 1;

    character.classList.add('char-1');    // start on the 1st image

    character.addEventListener('click', () => {
        character.classList.remove('char-' + current);
        current = (current % totalImages) + 1;   // 1 → 2 → 3 → 4 → 1
        character.classList.add('char-' + current);
    });
}
