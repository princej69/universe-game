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
    1: { // Chapter
      1: 0, // Evolution in chapter
      2: 0,
      3: 0,
      4: 0,
    }
  },
  firstTime: true,
  lastTick: Date.now()
}

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
    if(game.intellect.count >= costs[chap][evo][0]){
      if(game.evo[chap][evo] > maxes[chap][evo]) return;
      if(game.evo[chap][evo] == 0) showDialog(`Chapter ${chap}.${evo}`,`${story[chap][evo-1]}`)
      game.evo[chap][evo]++
      game.intellect.count -= costs[chap][evo][0]
      //document.getElementById("ohSound").play()
      if(game.intellect.auto) intellectClick()
    } else {
      toast("Not enough resources or mastered.")
    }
  } catch (e) {
    showDialog("Error",`Error occured: ${e}`)
    console.error("Error occured, check game.")
  }
}

function save() {
  toast("Game Saved")
}

function luck() {
  let rand = Math.random()
  
  if (rand < 0.02) { // 2% Chance
    showDialog("h","bdfnnemd")
  }
}

showTab("resources")
if(game.firstTime)showDialog("Quick Tutorial","At the beginning, your main action is to click on “Intellect” button. When you have enough Intellect, go to Evolution tab and upgrade your first Evolution.\n\nAs part of Early Access, you are given 2x speed, filled Intellects and a free Intellect Automation\n\nClick anywhere to close the dialog.")
game.firstTime=false
document.getElementById("lastTick").innerText = game.lastTick
