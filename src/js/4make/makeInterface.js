// makeInterface.js

function makeInterface()
{
    ba(makeTitleOfApp());

    //-//

    ba(ce('hr'));

    //-//

    let mainDiv = ce('div');
    mainDiv.style.display = 'flex';
    mainDiv.style.flexDirection = 'row';
    ba(mainDiv);

    //-//

    let subDiv = ce('div');
    mainDiv.append(subDiv);

    //-//

    // theVideo
    let theVideo = ce('video');
    theVideo.id = 'theVideo';
    theVideo.src =`src/media/video/001.mp4`;
    theVideo.controls = true;
    theVideo.style.width = 300 + 'px';
    // normal timeupdate handler
    theVideo.ontimeupdate = function()
    {
        if (!isSpecialPlay) // only update during normal play
        {
            ge('theSlider').value = (theVideo.currentTime / theVideo.duration) * 100;

            ge('timecodeInput').value = ge('theVideo').currentTime.toFixed(3);
        }
    };
    mainDiv.append(theVideo);

    //-//

    let controlsContainer = ce('div');
    mainDiv.append(controlsContainer);

    //-//

    // Slider
    let theSlider = ce('input');
    theSlider.type = 'range';
    theSlider.id = 'theSlider';
    theSlider.value = 0;
    theSlider.min = 0;
    theSlider.max = ge('theVideo').duration;
    theSlider.style.width = 100 + '%';
    theSlider.oninput = function()
    {
        ge('theVideo').currentTime = (theSlider.value / 100) * ge('theVideo').duration;
    };
    controlsContainer.append(theSlider);

    //-//

    let timecodeInput = ce('input');
    timecodeInput.id = 'timecodeInput';
    timecodeInput.value = ge('theVideo').currentTime.toFixed(3);
    controlsContainer.append(timecodeInput);

    //-//

    controlsContainer.append(ce('br'));

    //-//

    // Play Button
    let playButton = ce('button');
    playButton.className = 'ourButton';
    playButton.textContent = 'Play';
    playButton.onclick = function()
    {
        // reset the special play flag
        isSpecialPlay = false;
        theVideo.play();
    };
    controlsContainer.append(playButton);

    //-//

    // Pause Button
    let pauseButton = ce('button');
    pauseButton.className = 'ourButton';
    pauseButton.textContent = 'Pause';
    pauseButton.onclick = function()
    {
        theVideo.pause();
    };
    controlsContainer.append(pauseButton);

    //-//

    let specialPlayContainer = ce('div');
    specialPlayContainer.style.position = 'relative';
    specialPlayContainer.style.left = ge('theVideo').getBoundingClientRect().right;
    specialPlayContainer.style.bottom = ge('theVideo').getBoundingClientRect().top + 250;
    controlsContainer.append(specialPlayContainer);

    //-//

    // Start Frame Input
    let startFrameInput = ce('input');
    startFrameInput.id = 'startFrameInput';
    specialPlayContainer.append(startFrameInput);

    //-//

    // Start Button
    let startButton = ce('button');
    startButton.className = 'ourButton';
    startButton.textContent = 'Start';
    startButton.onclick = function()
    {
        ge('startFrameInput').value = ge('theVideo').currentTime.toFixed(3);
    };
    specialPlayContainer.append(startButton);

    //-//

    specialPlayContainer.append(ce('br'));

    //-//

    // End Frame Input
    let endFrameInput = ce('input');
    endFrameInput.id = 'endFrameInput';
    specialPlayContainer.append(endFrameInput);

    //-//

    // End Button
    let endButton = ce('button');
    endButton.className = 'ourButton';
    endButton.textContent = 'End';
    endButton.onclick = function()
    {
        ge('endFrameInput').value = ge('theVideo').currentTime.toFixed(3);
    };
    specialPlayContainer.append(endButton);

    //-//

    specialPlayContainer.append(ce('br'));

    //-//

    // Special Play Button
    let specialPlayButton = ce('button');
    specialPlayButton.className = 'ourButton';
    specialPlayButton.textContent = 'Play';
    specialPlayButton.onclick = function()
    {
        isSpecialPlay = true; // Set flag to indicate special play

        // Set the video to start time and play
        theVideo.currentTime = parseFloat(startFrameInput.value);
    
        theVideo.play();

        // Update time only during special play
        theVideo.ontimeupdate = function()
        {
            ge('timecodeInput').value = theVideo.currentTime.toFixed(3);

            ge('theSlider').value = (theVideo.currentTime / theVideo.duration) * 100;

            if (theVideo.currentTime >= parseFloat(endFrameInput.value))
            {
                // Pause at the end time
                theVideo.pause();

                // Reset flag when special play ends
                isSpecialPlay = false;

                // Restore normal timeupdate handler
                theVideo.ontimeupdate = function()
                {
                    ge('theSlider').value = (theVideo.currentTime / theVideo.duration) * 100;

                    ge('timecodeInput').value = ge('theVideo').currentTime;
                };
            }
        };
    };
    specialPlayContainer.append(specialPlayButton);

    //-//

    specialPlayContainer.append(ce('hr'));

    //-//

    // add entry
    let addEntryButton = ce('button');
    addEntryButton.className = 'ourButton';
    addEntryButton.textContent = 'Add';
    addEntryButton.onclick = function()
    {
        let startFrame = ge('startFrameInput').value;

        let endFrame = ge('endFrameInput').value;

        let theEntry = 
        {
            start: startFrameInput.value,
            end: endFrameInput.value
        };

        entries.push(theEntry);

        ge('entriesText').value = JSON.stringify(entries);
    };
    specialPlayContainer.append(addEntryButton);

    //-//

    specialPlayContainer.append(ce('hr'));

    //-//

    let entriesText = ce('textarea');
    entriesText.id = 'entriesText';
    specialPlayContainer.append(entriesText);
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

