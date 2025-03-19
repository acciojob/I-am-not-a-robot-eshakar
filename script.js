//your code here
document.addEventListener('DOMContentLoaded', function() {
    // Image sources (you can replace these with your own images)
    const imageSources = [
        'https://picsum.photos/id/237/300/300',  // Dog
        'https://picsum.photos/id/1084/300/300', // Walrus
        'https://picsum.photos/id/1074/300/300', // Bird
        'https://picsum.photos/id/1069/300/300', // Architecture
        'https://picsum.photos/id/1025/300/300'  // Panda
    ];
    
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
        
        // Choose a random image to duplicate
        duplicateImageIndex = Math.floor(Math.random() * imageSources.length);
        
        // Create array with 6 images (5 unique + 1 duplicate)
        let gameImages = [...imageSources];
        gameImages.push(imageSources[duplicateImageIndex]);
        
        // Shuffle the images
        shuffleArray(gameImages);
        
        // Create image tiles
        gameImages.forEach((src, index) => {
            const tileDiv = document.createElement('div');
            tileDiv.className = 'image-tile';
            tileDiv.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Image ${index + 1}`;
            
            tileDiv.appendChild(img);
            imagesContainer.appendChild(tileDiv);
            imageElements.push(tileDiv);
            
            // Add click event
            tileDiv.addEventListener('click', () => handleTileClick(tileDiv, index));
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
        const firstImageSrc = imageElements[selectedTiles[0]].querySelector('img').src;
        const secondImageSrc = imageElements[selectedTiles[1]].querySelector('img').src;
        
        verifyButton.style.display = 'none';
        
        if (firstImageSrc === secondImageSrc) {
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