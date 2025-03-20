// keyboardControl.js

function keyboardControl()
{
    window.onkeydown = function(event)
    {
        if (event.code === 'Space')
        {
            // prevent the default spacebar action (scrolling)
            event.preventDefault();
            
            let video = ge('theVideo');

            if (video.paused)
            {
                video.play();
            }
            else
            {
                video.pause();
            }
        }

        // Left arrow pressed
        else if (event.code === 'ArrowLeft')
        {
            // Prevent default left arrow behavior
            event.preventDefault();

            let video = ge('theVideo');
            video.currentTime -= 1;
        }

        else if (event.code === 'ArrowRight')
        {
            // Prevent default left arrow behavior
            event.preventDefault();

            let video = ge('theVideo');
            video.currentTime += 1;
        }
    };
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2025
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

