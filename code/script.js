// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const findOut = document.getElementById('filter')
const winOrLose = document.getElementById('winOrLose')
const winOrLoseText = document.getElementById('winOrLoseText')
const playAgain = document.getElementById('playAgain')
const counter = document.getElementById('counter')
const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const winOrLoseAudio = document.getElementById('winOrLoseAudio')

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: ['facial hair', 'pet']
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['hat'],
    other: ['smoker', 'facial hair']
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: ['facial hair']
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: ['smoker']
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'hat'],
    other: ['smoker', 'facial hair']
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'hat'],
    other: ['smoker', 'facial hair']
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'white',
    eyes: 'hidden',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'green',
    accessories: [],
    other: ['facial hair']
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'hat'],
    other: []
  },
]

// Global variables
let secret
let currentQuestion
let charactersInPlay
let CountFindOutGuesses = 0  
let timerInterval


// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}

// Randomly selects a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
}

// This function to start (and restart) the game
const start = () => {
  if (winOrLose.style.display === 'block') {
    winOrLose.style.display = 'none'
    winOrLoseAudio.innerHTML = ''
    board.style.display = 'flex'
  } else {
    winOrLose.style.display = 'none' 
    board.style.display = 'flex'}
  console.log('Starts the game and generates board')
     // Makes the page with win or lose go away when pressing Play Again
  charactersInPlay = CHARACTERS    // Here we're setting charactersInPlay array to be all the characters to start with
  generateBoard()
  setSecret()
  questions.selectedIndex = 0
  CountFindOutGuesses = 0
  counter.innerHTML = 0
  startTimer()
}

const startTimer = () => {
  clearInterval(timerInterval);

  let seconds = 0 
  let minutes = 0 
  let hours = 0

    
  timerInterval = setInterval(() => {
    timer.innerHTML =
      "Time elapsed: " +
      (hours ? hours + ':' : '') +
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    seconds++

      if (seconds == 60) {
        minutes++
        seconds = 0
      }

      if (minutes == 60) {
        hours++
        minutes = 0
      }
    }, 1000)
}

// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label

  // This variable stores what option group (category) the question belongs to.
  // We also need a variable that stores the actual value of the question we've selected.
   const value = questions.options[questions.selectedIndex].value
  

  currentQuestion = {
    category: category,
    value: value
  }
  console.log ('Question selected', currentQuestion)
}

// This function should be invoked when you click on 'Find Out' button.
const checkQuestion = () => {
  const { category, value } = currentQuestion
  
  console.log('Checking question', currentQuestion)
  // Compares the currentQuestion details with the secret person details in a different manner based on category (hair/eyes or accessories/others).
  // Checking if to keep or remove people based on that
  // Then invokes filterCharacters
  if (category === 'hair' || category === 'eyes')  {
    if (value === secret.hair || value === secret.eyes) {
      filterCharacters(true)
    } else {
      filterCharacters(false)
    }
  } else if (category === 'accessories' || category === 'other') {
   if( secret.accessories.includes(value) || secret.other.includes(value)) {
    filterCharacters(true)
  } else {
    filterCharacters(false)
   }
  }
  
}

// It'll filter the characters array and redraw the game board.
const filterCharacters = (keep) => {
  CountFindOutGuesses += 1   // Adds number of guesses
  console.log('Filtering characters and counting guesses')

  if (CountFindOutGuesses > 5) {
    alert(`No more chances, make a guess on a person now!`)
  } else { 
    counter.innerText = CountFindOutGuesses

  const { category, value } = currentQuestion
  // Shows the correct alert message for different categories
  // Determine what is the category and filter by category to keep or remove based on the keep variable.
  if (category === 'accessories') {
    if (keep) {
      alert(
        `Yes, ${value} is correct! Keep all the people with that accessory.`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
    } else {
      alert(
        `No, ${value} was wrong! Remove all people with that accessory.`
      )
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
    }
  } else if (category === 'other') {
    if (keep) {
      alert(
        `Yes, ${value} is correct! Keep the ${value}.`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
    } else {
      alert(
        `No, ${value} was wrong! Remove the ${value}.`
      )
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
    }
  } else if (category === 'hair') {
    if (keep) {
      alert (
        `Yes, the person has ${value} ${category} ! Keep all people with ${value} ${category}`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category] === value)
    } else {
      alert(
        `No, the person doesn't have ${value} ${category}! Remove all people with ${value} ${category}`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== value)
    }
  } else if (category === 'eyes') {
    if (keep) {
      alert (
        `Yes, the person has ${value} ${category}! Keep all people with ${value} ${category}`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category] === value)
    } else {
      alert(
        `No, the person doesn't have ${value} ${category}! Remove all people with ${value} ${category}`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== value)
    } 
   }
  }
  // Invokes the function to redraw the board with the remaining people.
  generateBoard()
}

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = (personToConfirm) => {
  const madeGuess = confirm(`Are you brave enough to guess on ${personToConfirm}?`) // store the interaction from the player in a variable.
  console.log('Guess button is clicked')
 if (madeGuess) {
  checkMyGuess(personToConfirm)   // If the player wants to guess, invoke the checkMyGuess function
} else {
  alert('Chicken are we? Okay, guess again later')
  }
}

// If you confirm, this function is invoked
const checkMyGuess = (personToCheck) => {
  if (personToCheck === secret.name) {                    // 1. Check if the personToCheck is the same as the secret person's name
    console.log('Win!')
    winOrLose.style.display = 'block',                    // 3. Show the win or lose section
    winOrLoseText.innerHTML = `You are the winner! ${secret.name} is correct!`      // 2. Set a Message to show in the win or lose section accordingly
    winOrLoseAudio.innerHTML = `<audio src="./sounds/short-choir-6116.mp3" type="audio/mp3" autoplay></audio>`     // Playing winning sound. 
    board.style.display = 'none'                          // 4. Hide the game board
  } else {
    console.log('You lost the game')
    winOrLose.style.display = 'block',
    winOrLoseText.innerHTML = `What a loser! The secret person was ${secret.name}.`
    winOrLoseAudio.innerHTML = `<audio src="./sounds/crash-glass-sound-effect-24-11503.mp3" type="audio/mp3" autoplay></audio>`
    board.style.display = 'none'
  }
}

// Invokes the start function when website is loaded
start()

// All the event listeners
restartButton.addEventListener('click', start)
questions.addEventListener('change', selectQuestion)
findOut.addEventListener('click', checkQuestion)
playAgain.addEventListener('click', start)

