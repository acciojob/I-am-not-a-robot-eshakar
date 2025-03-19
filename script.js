document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const imagesContainer = document.getElementById('imagesContainer');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const messageHeading = document.getElementById('h');
    const resultParagraph = document.getElementById('para');
    
    // State variables
    let selectedTiles = [];
    let duplicateImageIndex;
    let imageElements = [];
    
    // Initialize the game
    initGame();
    
    // Function to initialize the game
    function initGame() {
        // Clear previous state
        imagesContainer.innerHTML = '';
        selectedTiles = [];
        imageElements = [];
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';
        resultParagraph.textContent = '';
        resultParagraph.className = '';
        
        // Define the image classes we'll use
        const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
        
        // Choose a random image to duplicate
        duplicateImageIndex = Math.floor(Math.random() * imageClasses.length);
        
        // Create array with 6 images (5 unique + 1 duplicate)
        let gameImages = [...imageClasses];
        gameImages.push(imageClasses[duplicateImageIndex]);
        
        // Shuffle the images
        shuffleArray(gameImages);
        
        // Create image tiles
        gameImages.forEach((imgClass, index) => {
            const img = document.createElement('img');
            img.className = imgClass;
            img.alt = `Image ${index + 1}`;
            img.dataset.index = index;
            
            imagesContainer.appendChild(img);
            imageElements.push(img);
            
            // Add click event
            img.addEventListener('click', () => handleTileClick(img, index));
        });
    }
    
    // Function to handle tile clicks
    function handleTileClick(tile, index) {
        // Check if the tile is already selected
        if (selectedTiles.includes(index)) {
            return;
        }
        
        // Add to selected tiles
        selectedTiles.push(index);
        tile.classList.add('selected');
        
        // Show reset button after first click
        if (selectedTiles.length === 1) {
            resetButton.style.display = 'inline-block';
        }
        
        // Show verify button after second click
        if (selectedTiles.length === 2) {
            verifyButton.style.display = 'inline-block';
        } else if (selectedTiles.length > 2) {
            // Hide verify button if more than 2 tiles are selected
            verifyButton.style.display = 'none';
        }
    }
    
    // Reset button click handler
    resetButton.addEventListener('click', function() {
        // Clear selections but keep the same images
        selectedTiles = [];
        imageElements.forEach(tile => {
            tile.classList.remove('selected');
        });
        
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';
        resultParagraph.textContent = '';
        resultParagraph.className = '';
    });
    
    // Verify button click handler
    verifyButton.addEventListener('click', function() {
        const firstImageClass = imageElements[selectedTiles[0]].className.split(' ')[0]; // Get the base class without 'selected'
        const secondImageClass = imageElements[selectedTiles[1]].className.split(' ')[0];
        
        verifyButton.style.display = 'none';
        
        if (firstImageClass === secondImageClass) {
            resultParagraph.textContent = 'You are a human. Congratulations!';
            resultParagraph.className = 'success';
        } else {
            resultParagraph.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
            resultParagraph.className = 'error';
        }
    });
    
    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});