let game = {
  intellect: {
    count: 20,
    max: 20,
    cooldown: 6,
    dis: false,
    auto: true,
  },
  
  templeSpirit: {
    quickMind: 2
  },
  
  evo: {
    1: [ // Chapter
      0, // Evolution in chapter
      0,
      0,
      0,
      0,
    ]
  },
  
  firstTime: true,
  lastTick: Date.now(),
  lastVersion: 6
}
let gameVersion = 6

let ohSound = new Audio("oh.wav")

function intellectClick() {
  let progsec = 0
  try{
  if(game.intellect.count < game.intellect.max){
    if(!game.intellect.dis) {
      let inter = setInterval(()=>{
        progsec+=0.05*game.templeSpirit.quickMind
        document.getElementById("intebar2").style.width = `${(progsec/game.intellect.cooldown)*100}%`
        if(game.intellect.count < game.intellect.max){
          document.getElementById("intecool").innerText = `${(game.intellect.cooldown-progsec).toFixed(1)}s`
        }else{
          document.getElementById("intecool").innerText = `MAX`
        }
      },50)
      game.intellect.dis=true
      setTimeout(()=>{
        game.intellect.count++
        game.intellect.dis=false
        progsec = 0
        clearInterval(inter)
        if(game.intellect.auto)intellectClick()
        //clearInterval(inter)
        document.getElementById("intebar2").style.width = `${(progsec/game.intellect.cooldown)*100}%`
        document.getElementById("intecool").innerText = `${(game.intellect.cooldown-progsec).toFixed(1)}s`
      },game.intellect.cooldown*1000/game.templeSpirit.quickMind)
    }
  }else{
    intellectClick()
  }
  }catch(e){  }
}

function addZero(n,z) {
  let s = ""
  for (let i = n.length; i < z; i++) {
    s += "0";
  }
  return s + n
}

function buyEvo(chap,evo) {
  try {
    /*if(maxes[chap][evo] <= game.evo[chap][evo-1]) {
      toast("Upgrade already mastered.")
      return;
      
      game.evo[chap][evo-1] >= maxes[chap][evo]
    }*/
    if(game.evo[chap][evo-1] < maxes[chap][evo-1]){
      if(game.intellect.count < costs[chap][evo-1][0]){
        toast("Not enough resources")
      } else {
        if(game.evo[chap][evo-1] == 0) showDialog(`Chapter ${chap}.${evo}`,`${story[chap][evo-1]}`)
        game.evo[chap][evo-1]++
        game.intellect.count -= costs[chap][evo-1][0]
        //document.getElementById("ohSound").play()
        if(game.intellect.auto) intellectClick()
        ohSound.play()
      }
    } else {
      toast("Upgrade already mastered")
    }
  } catch (e) {
    showDialog("Error",`Error occured: ${e}`)
    console.error("Error occured, check game.")
  }
}

function save() {
  let jsonString = JSON.stringify(game)
  localStorage.setItem("universeGameSave",jsonString)
}
function load() {
  if(localStorage.getItem("universeGameSave")) {
     let gameCheck = JSON.parse(localStorage.getItem("universeGameSave"))
     document.getElementById("loadtext").innerText="Loading Save"
     game = gameCheck
     
     game.intellect.dis = false;
  }
}

function luck() {
  let rand = Math.random()
  
  if (rand < 0.01) { // 1% Chance
    showDialog("You got message","Nothing happened.")
  }
}

showTab("resources")

setTimeout(()=>{
    load()
    document.getElementById("loadingScreen").remove()
    if(game.firstTime)showDialog("Quick Tutorial","At the beginning, your main action is to click on “Intellect” button. When you have enough Intellect, go to Evolution tab and upgrade your first Evolution.\n\nAs part of Early Access, you are given 2x speed, filled Intellects and a free Intellect Automation\n\nThis game is currently riddled with bugs. \"Game Saved\" doesn't actually save your game, it is purely for bragging.\n\nClick anywhere to close the dialog.")
    game.firstTime=false
    document.getElementById("lastTick").innerText = game.lastTick
    if(game.lastVersion<gameVersion)showDialog("Game Update",`You last played this game on ${new Date(game.lastTick)}, when Build ${game.lastVersion} was still around. Some features may not work as expected, possibly due to missing game values.`)
    game.lastVersion = gameVersion
    if(game.intellect.auto) intellectClick()
},1000)

document.getElementById("loadtext").innerText="Final Touches"

function checky(func) {
  return `${func} is ${func}!`;
}

