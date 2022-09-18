const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');

//a global variable of all possible selections. it demonstrates which emoji or selection is greater than the other
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '👊🏻',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋🏻',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌🏻',
        beats: 'paper'
    }
]


selectionButtons.forEach(function(selectionButton){
    selectionButton.addEventListener("click", function(e){
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection) 
    })
})


function makeSelection(selection){
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)
  //  console.log(computerSelection)
}

function incrementScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

//we want the selections to stack up from the top
function addSelectionResult(selection, winner){
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div) //help stack selection from the top
}

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name
}

//computers choice which is a random selections
function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}