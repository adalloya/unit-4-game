$(document).ready(function() {

    // Code out HTML View for Game
        //4 Clickable Character Boxes
            // Each has Name, image, and stats
        //Space for player character to appear
        //Space for enemy to appear
  
    //Create Variables
        // Characters
        // array of objects
        // each has different properties of health, attack power, counter attack power
    var characters = [ ];
    var playerPicked;
    var enemyPicked;
    var wins = 0;
    var i = 0;
  
    // Active Characters
    var playerActive;
    var playerBaseAttack;
    var enemyActive;
  
  
    // Start new game function
        // Sets all characters to be able to be picked by player with reset stats
        // Once picked, player character gets put into player area while the rest go into Enemies area
    function newGame() {
      $('.player').empty();
      $('.enemy').empty();
      $('.characterList').empty();
      $('.wins').html(wins);
      characters[0] = {
        name: 'Squirtle', 
        health: 150,
        attack: 10, 
        counter: 0, 
        pic: 'assets/images/1.gif',
        pic2: 'assets/images/12.png'

      };
      characters[1] = {
        name: 'Jigglypuff', 
        health: 100, 
        attack: 2.5, 
        counter: 0, 
        pic: 'assets/images/2.gif' 
      };
      characters[2] = {
        name: 'Charmander', 
        health: 180, 
        attack: 12.5, 
        counter: 0, 
        pic: 'assets/images/3.gif' };
      characters[3] = {
        name: 'Bulbasaur', 
        health: 120, 
        attack: 4, 
        counter: 0, 
        pic: 'assets/images/4.gif'
      };
      playerPicked = false;
      enemyPicked = true;
      
      $(characters).each(function(){
        $('.characterList').append('<div class="character col-xs-3 col-sm-3 col-md-2"><img class="pic 2"/><div class="name"></div><div class="stats"></div></div>')
  
      });
  
      $('.character').each(function() {
        $(this).attr('data-value',i);
        i++;
      });
      i = 0;
      
      $('.name').each(function() {
        $(this).html(characters[i].name);
        i++;
      });
      i = 0
  
      $('.pic').each(function(){
        $(this).attr('src', characters[i].pic);
        i++;
      });
      i = 0;
      $('.stats').each(function() {
        $(this).html('Health: ' + characters[i].health);
        i++;
      });
      i = 0;
      $('.pickCharacter').html('<h3>Welcome to Pokémon Stadium game </h3><h3> Please Choose a Pokéball with your favorite Pokémon to start the game !</h3>');
      playerPicked = false;
      enemyPicked = true;
    }
  
   // NEW GAME
  
    newGame();
  
    // POKEMON CHOOSE
  
  
    $('.characterList').on('click','.character', function() {
      
      var p;
  
      if ((playerPicked === false) && (enemyPicked)) {
  
        $('.pickCharacter').html('<h3>Now, select a Pokéball with the Pokémon you want to battle!</h3>');
        var playerInfo = $(this).html();
        p = $(this).attr('data-value');
        playerActive = characters[p];
        playerBaseAttack = playerActive.attack;
        playerBasehealth = playerActive.health;
        characters.splice(p, 1);     
  
        $(this).remove();
        $('.player').html(playerInfo);
        $('.character').each(function() {
          $(this).attr('data-value',i);
          i++;
        });
  
        $('.player .stats').html('Health: <progress id="health" value="'+ playerActive.health + '" max="'+ playerBasehealth +'"></progress>');
        i = 0;
        playerPicked = true;
        enemyPicked = false;
      }
  
      else if ((enemyPicked === false) && (playerPicked === true)) {
  
        $('.pickCharacter').html('<h3>Battle starts now! Click on the button attack to beging!</h3>');
        var enemyInfo = $(this).html();
        p = $(this).attr('data-value');
        enemyActive = characters[p];
        enemyBasehealth = enemyActive.health;
        characters.splice(p,1);
  
        $(this).remove();
        $('.enemy').html(enemyInfo);
        $('.character').each(function() {
          $(this).attr('data-value',i);
          i++;
        });
        $('.enemy .stats').html('Health: <progress id="health" value="'+ enemyActive.health + '" max="'+ enemyBasehealth +'"></progress>');
  
        i = 0;
        enemyPicked = true;
      }
      else if (enemyPicked && playerPicked) {
        return;
      }

    });
  
  
    // BATTLE
    var Playerwins=0;

    $('.attack').on('click', function() {

      if (enemyActive.health <= 0) {
        $('.enemy').html('');
        $('.pickCharacter').html('<h2>'+ playerActive.name +' has won! Choose the next Pokémon to battle!</h2>');
        enemyPicked = false;
        Playerwins++;
      }
  
       if (enemyActive.health > 0 && playerActive.health > 0){
        enemyActive.health = enemyActive.health - playerActive.attack;
        $('.enemy .stats').html('Health: <progress id="health" value="'+ enemyActive.health + '" max="'+ enemyBasehealth +'"></progress>');
        playerActive.attack = playerActive.attack + playerBaseAttack;
  
        playerActive.health = playerActive.health - enemyActive.attack;
        $('.player .stats').html('Health: <progress id="health" value="'+ playerActive.health + '" max="'+ playerBasehealth +'"></progress>');
    
        $('.pickCharacter').html("<h3>"+ playerActive.name + " has hitted "+ enemyActive.name + " with "+ playerActive.attack +" and it has recived "+ enemyActive.attack +" in damage. </h3>");
      }
  
      if (playerActive.health <= 0) {
        $('.pickCharacter').html('Sorry, '+playerActive.name+ ' has fainted! Please start a new game');
      }

      if (Playerwins === 3) {
        $('.play').html('<h3 class="won">Congratulations, '+playerActive.name+ ' has won! You are now a Pokémon Master <img class="titlelogo2" src="assets/images/win.gif">  <button type="button" class="btn btn-primary btn-block newGame"><span class="glyphicon glyphicon-flash" aria-hidden="true"></span> New Game</button></h3>');
      }
  
    });
  
    $('.newGame').on('click', function() {
      newGame();
      wins=0;
      enemyPicked = false;
    });
       
  
  
  });