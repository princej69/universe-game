setInterval(()=>{
  // variables
  game.lastTick = Date.now()
  ///intellect
   
  game.intellect.max = 20+
   (game.evo[1][1]*3)+
   (game.evo[1][3]*5);
  
  game.intellect.cooldown = 6-
   (game.evo[1][2]*0.5);
  // ui
  document.getElementById("lastTick").innerText = game.lastTick;
  /// resources
  document.getElementById("intecount").innerText = `${game.intellect.count}/${game.intellect.max}`;
  document.getElementById("intebar22").style.width = `${(game.intellect.count/game.intellect.max)*100}%`;
  /// evo
  //document.getElementById("evo0101c").innerText = `${game.evo[1][1]}/${maxes[1][0]}`
  for (let i = 1; i < 4; i++) {
    document.getElementById(`evo1-${i}c`).innerText = `${game.evo[1][i]}/${maxes[1][i-1]}`
  }
  /// story
  for (let i = 1; i < 7; i++) {
    document.getElementById(`c1v${i}`).innerHTML = (game.evo[1][i] > 0 ? story[1][i-1] : "<span class='lockedParagraph'>Paragraph Locked<span>")
  }
},100)

setInterval(()=>{
  save()
},10000)
setInterval(()=>{
  luck( )
},1000)

if(game.intellect.auto)intellectClick()