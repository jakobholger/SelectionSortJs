// Setup canvas
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Generate random number list
let unsortedArray = [];
let arrayLength = 500;
let boxWidth = canvas.width / arrayLength;

for (let i = 0; i < arrayLength; i++) {
    unsortedArray.push(Math.floor(Math.random() * canvas.height));
}

let numsArray = []
for(let i=0;i<arrayLength;i++){
    numsArray.push(i)
}


let numsIndex;
let finalArray = []
for(let i=0;i<arrayLength;i++){
    numsIndex = Math.floor(Math.random()*numsArray.length)
    finalArray.push(numsArray[numsIndex])

    if(numsArray.length != 1)
        numsArray.splice(numsIndex,1)
}


let i = 0;
let j = 0;
let min_idx = 0;

function drawArray(array) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let k = 0; k < array.length; k++) {
        ctx.fillRect(k * boxWidth, canvas.height, boxWidth, -array[k]);
    }
}

async function animate() {
    for (i = 0; i < arrayLength - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < arrayLength; j++) {
            if (finalArray[j] < finalArray[min_idx])
                min_idx = j;
        }
        // Swap the found minimum element with the first element
        let temp = finalArray[min_idx];
        finalArray[min_idx] = finalArray[i];
        finalArray[i] = temp;

        drawArray(finalArray);

        await new Promise(resolve => setTimeout(resolve, 0)); // Delay for animation
    }

    // Ensure the last element is drawn
    drawArray(finalArray);
}

drawArray(finalArray);
animate();
