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