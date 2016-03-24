var snakeBody = document.querySelectorAll('.snakeBody');
var container = document.querySelector('.container');
var map = document.querySelector('#map');
var hideCanvas = document.querySelector('#starsCanvas');
var startMinions = document.querySelector('.start-minions');
var startStarwars = document.querySelector('.start-starwars');
var body = document.querySelector("body");
var musicst1 = document.querySelector('#musicst1');
var musicst2 = document.querySelector('#musicst2');
var musicst3 = document.querySelector('#musicst3');
var musicst4 = document.querySelector('#musicst4');
var musicst5 = document.querySelector('#musicst5');
var musicmn1 = document.querySelector('#musicmn1');
var musicmn2 = document.querySelector('#musicmn2');
var musicmn3 = document.querySelector('#musicmn3');
var musicmn4 = document.querySelector('#musicmn4');
var musicmn5 = document.querySelector('#musicmn5');
var musicst_e = document.querySelector('#musicst_e');
var musicmn_e = document.querySelector('#musicmn_e');
var speed = 100;
var score = 0;
var taille = 20;
var dirX = taille;
var dirY = 0;
var dataCount = 1;
var posTabX = [];
var posTabY = [];
var body_nb;
var univers;
var minion = document.querySelector('#minion');
var starwars = document.querySelector('#starwars');
var title = document.querySelector("#titre");
var manche_gauche = document.querySelector('#manche_gauche');
var laser_gauche = document.querySelector('#laser_gauche');
var manche_droite = document.querySelector('#manche_droite');
var laser_droite = document.querySelector('#laser_droite');
var skip = document.querySelector("#skip");
var timer = 0;
var pause_current = 0;
var music_current = "st";

//btn_pulse
setTimeout(function() {
  setInterval(function() {
    $('.start-minions, .start-starwars').css({
        transform : 'scale(1.05)',
    });
    setTimeout(function() {
      $('.start-minions, .start-starwars').css({
          transform : 'scale(0.95)',
      });
    }, 500);
  }, 1000);
}, 1500);

//fonction de generationFood
function generate_food() {
  food = document.querySelector("#snakeFood");
  food_posx = ((Math.floor(Math.random() * 480)) * taille) % 460;
  food_posy = ((Math.floor(Math.random() * 480)) * taille) % 460;
  food_posx = food_posx + 20;
  food_posy = food_posx + 20;
  food.style.top = food_posy + "px";
  food.style.left = food_posx + "px";
  if (univers == minion) {
    food.setAttribute('src', "img/minion.png");
  } else {
    food.setAttribute('src', "img/trooper.png");
  }
}

//fonction generate_body
function generate_body() {
  snakeBody[dataCount] = document.createElement('img');
  snakeBody[dataCount].className = 'snakeBody';
  snakeBody[dataCount].setAttribute('data-snakeBody', dataCount);
  document.querySelector("#corps").appendChild(snakeBody[dataCount]);
  if (dataCount == 1) {
    snakeBody[dataCount].style.top = taille + "px";
    snakeBody[dataCount].style.left = taille + "px";
    if (univers == minion) {
      snakeBody[dataCount].setAttribute('src', "img/gru.png");
    } else {
      snakeBody[dataCount].setAttribute('src', "img/vador.png");
    }
    snakeBody[dataCount].style.zIndex = "2";
    snakeBody = document.querySelectorAll('.snakeBody');
    dataCount++;
  } else {
    snakeBody[dataCount].style.top = posTabY[body_nb] + "px";
    snakeBody[dataCount].style.left = posTabX[body_nb] + "px";
    if (univers == minion) {
      snakeBody[dataCount].setAttribute('src', "img/minion.png");
    } else {
      snakeBody[dataCount].setAttribute('src', "img/trooper.png");
    }
    snakeBody = document.querySelectorAll('.snakeBody');
    dataCount++;
  }
}
best_score_print();
score_print();

//fonction d'initialisation du jeu
function init() {
  snakeHead = document.querySelector("#snakeHead");
  menu = document.querySelector("#menu");
  menu.style.display = "none";
  generate_food();
  generate_body();
  time = setInterval(function() {
    deplacement(snakeHead, dirX, dirY);
  }, speed);
  if (univers == starwars) {
    musicst1.play();
    music_current = "st1";
  }
  else {
    musicmn1.play();
    music_current = "mn1";
  }
}

//fonction de mise en pause du jeu
function pause() {
  clearInterval(time);
  pause_btn = document.querySelector("#pause");
  resume_btn = document.querySelector("#resume");
  pause_btn.style.display = "none";
  resume_btn.style.display = "inline-block";
  musicst1.pause();
  musicst2.pause();
  musicst3.pause();
  musicst4.pause();
  musicst5.pause();
  musicmn1.pause();
  musicmn2.pause();
  musicmn3.pause();
  musicmn4.pause();
  musicmn5.pause();
}

//fonction retour au jeu
function resume() {
  time = setInterval(function() {
    deplacement(snakeHead, dirX, dirY);
  }, speed);
  resume_btn.style.display = "none";
  pause_btn.style.display = "inline-block";
  if ( music_current == "mn1"){
    musicmn1.play();
  }
  else if ( music_current == "mn2"){
    musicmn2.play();
  }
  else if ( music_current == "mn3"){
    musicmn3.play();
  }
  else if ( music_current == "mn4"){
    musicmn4.play();
  }
  else if ( music_current == "mn5"){
    musicmn5.play();
  }
  else if ( music_current == "st1"){
    musicst1.play();
  }
  else if ( music_current == "st2"){
    musicst2.play();
  }
  else if ( music_current == "st3"){
    musicst3.play();
  }
  else if ( music_current == "st4"){
    musicst4.play();
  }
  else if ( music_current == "st5"){
    musicst5.play();
  }
}

//fonction mort
function death() {
  clearInterval(time);
  musicst1.pause();
  musicst2.pause();
  musicst3.pause();
  musicst4.pause();
  musicst5.pause();
  musicmn1.pause();
  musicmn2.pause();
  musicmn3.pause();
  musicmn4.pause();
  musicmn5.pause();
  if (score > best_score) {
    localStorage.setItem("best_score", score);
  }
  document.querySelector("#game_over").style.display = "block";
}

//fonction replay
function replay() {
  location.reload();
}

//fonction de deplacement du serpent + mort
function deplacement(noeud) {
  snake_posx = (parseInt(noeud.style.left) + dirX + 520 ) % 520;
  noeud.style.left = snake_posx + "px";
  snake_posy = (parseInt(noeud.style.top) + dirY + 520) % 520;
  noeud.style.top = snake_posy + "px";
  posTabX.splice(0, 0, snake_posx);
  posTabY.splice(0, 0, snake_posy);
  if (posTabX.length > score + 1) {
    posTabX.pop();
    posTabY.pop();
  }
  if (snakeBody) {
    for (body_nb = 0; body_nb < snakeBody.length; body_nb++) {
      snakeBody[body_nb].style.top = posTabY[body_nb] + "px";
      snakeBody[body_nb].style.left = posTabX[body_nb] + "px";
    }
  }
  if (snake_posy == food_posy && snake_posx == food_posx) {
    score_print();
    generate_food();
    generate_body();
  }
  for (var i = 1; i < score; i++) {
    if (posTabX[i] == snake_posx && posTabY[i] == snake_posy) {
      death();
    }
  }
  if ( score > 10 ){
    if (snake_posy == 500 || snake_posy === 0 || snake_posx == 500 || snake_posx === 0){
      death();
    }
  }
}

//Fonction de controle au clavier
document.onkeydown = Command;
function Command(applyKey) {
  if (applyKey.keyCode == 38 && dirY != taille && timer === 0) { dirX = 0; dirY = -taille; }
  else if (applyKey.keyCode == 40 && dirY != -taille && timer === 0) { dirX = 0; dirY = taille; }
  else if (applyKey.keyCode == 37 && dirX != taille && timer === 0) { dirX = -taille; dirY = 0; }
  else if (applyKey.keyCode == 39 && dirX != -taille && timer === 0) { dirX = taille; dirY = 0; }
  else if ( applyKey.keyCode == 32 && pause_current === 0) {
    pause_current = 1;
    pause();
  }
  else if ( applyKey.keyCode == 32 && pause_current == 1 ) {
    pause_current = 0;
    resume();
  }
}

//Fonction score
function score_print() {
  score_area = document.querySelector("#score");
  score_area_map = document.querySelector("#score_map");
  score_area.innerHTML = score;
  score_area_map.innerHTML = score;
  evolution();
  score++;
}

//Fonction meilleur score
function best_score_print() {
  best_score = localStorage.getItem("best_score");
  if (best_score === null) {
    best_score = 1;
  }
  best_score_area = document.querySelector("#best_score");
  best_score_area.innerHTML = "RECORD " + (best_score - 1);
}

//Fonction lvl
function lvl_print(lvl) {
  lvl_area = document.querySelector("#lvl");
  lvl_area.innerHTML = "level : " + lvl;
}

//Lancement univer minion
startMinions.onclick = function() {
  musicmn_e.play();
  startMinions.style.display = 'none';
  startStarwars.style.display = 'none';
  body.style.backgroundImage = "none";
  minion.style.display = "none";
  starwars.style.display = "none";
  title.style.display = "none";
  skip.style.display = 'block';
  skip.onclick = function() {
    clearTimeout(opening_sequence);
    musicmn_e.play();
    univers_minion();
    map.style.display = 'block';
    lvl_print("Facile");
    skip.style.display = 'none';
  };
  opening_sequence = setTimeout( function(){
    musicst_e.play();
    univers_minion();
    map.style.display = 'block';
    lvl_print("Facile");
    skip.style.display = 'none';
  }, 50000);
};

//Lancement star wars
startStarwars.onclick = function() {
  hideCanvas.style.display = "block";
  musicst_e.play();
  startMinions.style.display = 'none';
  startStarwars.style.display = 'none';
  body.style.backgroundImage = "none";
  minion.style.display = "none";
  starwars.style.display = "none";
  title.style.display = "none";
  skip.style.display = 'block';
  (function() {
    var starsNumber = 500,
      canvas = document.getElementById('starsCanvas'),
      context = canvas.getContext('2d'),
      width = window.innerWidth,
      height = window.innerHeight,
      x = 100,
      y = 100,
      i = 0,
      t = 0,
      stars = [],
      colors;
    function redraw() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      context.scale(canvas.width, canvas.height);
    }
    window.addEventListener("resize", redraw);
    function Star() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.speed = 0;
      this.color = '#FFFFFF';
      this.size = Math.random();
    }
    function draw() {
      var star;
      canvas.width = width;
      canvas.height = height;
      for (t = 0; t < stars.length; t += 1) {
        star = stars[t];
        context.beginPath();
        context.fillStyle = star.color;
        context.arc(star.x, star.y, star.size, Math.PI * 2, false);
        context.fill();
        star.x -= star.speed;
        if (star.x < -star.size) { star.x = width + star.size; }
        if (star.size < 5) { star.speed = 1; }
        if (star.size < 4) { star.speed = 0.5; }
        if (star.size < 3) { star.speed = 0.25; }
      }
    }
    for (i = 0; i < starsNumber; i += 1) {
      stars.push(new Star());
    }
    setInterval(draw, 20);
  }());
  skip.onclick = function() {
    clearTimeout(opening_sequence);
    musicst_e.play();
    univers_starwars();
    document.querySelector('.starwars').style.display = "none";
    map.style.display = 'block';
    document.querySelector('#openingst_sound').pause();
    lvl_print("Droïde");
    skip.style.display = 'none';
  };
  opening_sequence = setTimeout( function(){
    musicst_e.play();
    univers_starwars();
    document.querySelector('.starwars').style.display = "none";
    map.style.display = 'block';
    document.querySelector('#openingst_sound').pause();
    lvl_print("Droïde");
    skip.style.display = 'none';
  }, 50000);
};

//design univers_starwars
function univers_starwars() {
  map.style.boxShadow = "0px 0px 20px yellow";
  manche_droite.style.display = "block";
  manche_gauche.style.display = "block";
  laser_droite.style.display = "block";
  laser_gauche.style.display = "block";
  univers = starwars;
}

//design univers_minion
function univers_minion() {
  map.style.boxShadow = "0px 0px 20px #fffe85";
  body.style.backgroundColor = "#fffe85";
  title.style.display = "none";
  minion.style.display = "none";
  starwars.style.display = "none";
  univers = minion;
}

//Fonction Evolution
function evolution() {
  if (univers == minion) {
    if (score < 3) {
    }
    else if (score < 5) {
      clearInterval(time);
      time = setInterval(function() {deplacement(snakeHead, dirX, dirY);}, 85);
      map.style.boxShadow = "0px 0px 10px #ffc385";
      musicmn1.pause();
      musicmn2.play();
      music_current = "mn2";
      lvl_print("moyen");
    }
    else if (score < 7) {
      clearInterval(time);
      time = setInterval(function() {deplacement(snakeHead, dirX, dirY);}, 70);
      map.style.boxShadow = "0px 0px 20px #ff9e85";
      musicmn2.pause();
      musicmn3.play();
      music_current = "mn3";
      lvl_print("difficile");
    }
    else if (score < 10) {
      clearInterval(time);
      time = setInterval(function() {deplacement(snakeHead, dirX, dirY);}, 55);
      map.style.boxShadow = "0px 0px 30px #ff8585";
      musicmn3.pause();
      musicmn4.play();
      music_current = "mn4";
      lvl_print("trés difficile");
    }
    else {
      clearInterval(time);
      time = setInterval(function() {deplacement(snakeHead, dirX, dirY);}, 40);
      map.style.boxShadow = "0px 0px 40px red";
      musicmn4.pause();
      musicmn5.play();
      music_current = "mn5";
      lvl_print("Impossible");
      document.querySelector('#pique').style.display = "block";
    }
  }
  if (univers == starwars) {
    if (score < 3) {
      lvl_area.style.color = "#fcde3a";
      lvl_area.style.fontFamily = "starwars";
    }
    else if (score < 5) {
      clearInterval(time);
      time = setInterval(function() {deplacement(snakeHead, dirX, dirY);}, 85);
      map.style.boxShadow = "0px 0px 10px purple";
      laser_droite.style.boxShadow = "0px 0px 10px purple";
      laser_gauche.style.boxShadow = "0px 0px 10px purple";
      laser_droite.style.backgroundColor = "purple";
      laser_gauche.style.backgroundColor = "purple";
      musicst1.pause();
      musicst2.play();
      music_current = "st2";
      lvl_print("padawan");
    }
    else if (score < 7) {
      clearInterval(time);
      time = setInterval(function() {deplacement(snakeHead, dirX, dirY);}, 70);
      map.style.boxShadow = "0px 0px 20px blue";
      laser_droite.style.boxShadow = "0px 0px 10px blue";
      laser_gauche.style.boxShadow = "0px 0px 10px blue";
      laser_droite.style.backgroundColor = "blue";
      laser_gauche.style.backgroundColor = "blue";
      musicst2.pause();
      musicst3.play();
      music_current = "st3";
      lvl_print("Jedi");
    }
    else if (score < 10) {
      clearInterval(time);
      time = setInterval(function() {deplacement(snakeHead, dirX, dirY);}, 55);
      map.style.boxShadow = "0px 0px 20px green";
      laser_droite.style.boxShadow = "0px 0px 10px green";
      laser_gauche.style.boxShadow = "0px 0px 10px green";
      laser_droite.style.backgroundColor = "green";
      laser_gauche.style.backgroundColor = "green";
      musicst3.pause();
      musicst4.play();
      music_current = "st4";
      lvl_print("Yoda");
    }
    else {
      clearInterval(time);
      time = setInterval(function() {deplacement(snakeHead, dirX, dirY);}, 40);
      map.style.boxShadow = "0px 0px 20px red";
      laser_droite.style.boxShadow = "0px 0px 10px red";
      laser_gauche.style.boxShadow = "0px 0px 10px red";
      laser_droite.style.backgroundColor = "red";
      laser_gauche.style.backgroundColor = "red";
      musicst4.pause();
      musicst5.play();
      music_current = "st5";
      lvl_print("Vador");
      document.querySelector('#pique').style.display = "block";
    }
  }
}

//reseaux sociaux
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1270624072953710',
    xfbml      : true,
    version    : 'v2.5'
  });
};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
var tweet = document.querySelector('#twitter');
tweet.setAttribute('data-text',"J'ai fait un score de " + score);

//opening sequence

StarWars = (function() {
  function StarWars(args) {
    this.el = $(args.el);
    this.audio = this.el.find('audio').get(0);
    this.start = $('.start');
    this.animation = this.el.find('.animation');
    this.reset();
    // Start the animation on click
    this.start.bind('click', $.proxy(function() {
      this.start.hide();
      this.audio.play();
      this.el.append(this.animation);
    }, this));
  }
  StarWars.prototype.reset = function() {
    this.start.show();
    this.cloned = this.animation.clone(true);
    this.animation.remove();
    this.animation = this.cloned;
  };
  return StarWars;
})();

new StarWars({
  el : '.starwars'
});
