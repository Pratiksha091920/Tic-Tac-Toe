let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new_btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true -> Player O, false -> Player X

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide"); // Hide message container
    msg.innerText = ""; // Clear previous message
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {  // Player O
            box.innerText = "O";
            turnO = false;
        } else {  // Player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "Game is withdrawn! No one wins.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let isDraw = true; // Assume draw unless proven otherwise

    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("winner", pos1val);
            showWinner(pos1val);
            return; // Stop checking further as we found a winner
        }
    }

    // Check if all boxes are filled
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false; // If an empty box is found, it's not a draw
        }
    });

    if (isDraw) {
        showDraw(); // Display draw message
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
