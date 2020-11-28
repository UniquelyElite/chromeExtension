let img = new Image();
img.src = 'heart.png';
let can = document.getElementById('backgroundCanvas')
let ctx = can.getContext('2d');
let settings = document.getElementById('settings');
let overlay = document.getElementById('settingsOverlay');
let exit = document.getElementById('exit');
let black = document.getElementById('blackout');
let settingsOpen = false;
try {
    can = chrome.storage.sync.get(['save'])
} catch (error) {
}

can.addEventListener('click', (event) => {

    //To get the x and y synced with the mouse click
    let bounds = can.getBoundingClientRect();
    let x = event.pageX - bounds.left - scrollX;
    let y = event.pageY - bounds.top - scrollY;
    x /=  bounds.width; 
    y /=  bounds.height; 
    x *= can.width;
    y *= can.height;
    //Just for fine tuning it lol
    x -= 4
    y -= 3

    ctx.drawImage(img, x, y, 10, 10);
})
addEventListener('keydown', (event) => {
    if (event.key == 'Enter'){
        let search = document.getElementById('search').value
        window.location.href = `https://www.google.com/search?q=${search}`;
    }
})
settings.addEventListener('click', (event) => {
    if (!settingsOpen) {
        settingsOpen = true;
        black.style.display = 'inline';
        overlay.style.display = 'inline';
    }
})
exit.addEventListener('click', (event) => {
    settingsOpen = false;
    black.style.display = 'none';
    overlay.style.display = 'none';
})
black.addEventListener('click', (event) => {
    settingsOpen = false;
    black.style.display = 'none';
    overlay.style.display = 'none';
})

function save() {
    let img = new Image();
    img.src = can.toDataURL();

    chrome.storage.sync.set({save: img})
}
/*
        chrome.storage.sync.set({key: value}, function() {
          console.log('Value is set to ' + value);
        });
      
        chrome.storage.sync.get(['key'], function(result) {
          console.log('Value currently is ' + result.key);
        });

        try {
            nonExistentFunction();
        } catch (error) {
            console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        }
*/