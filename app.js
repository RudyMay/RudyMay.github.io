



let lifes=3;
const jet = document.getElementById("jet");//Manipulacion del diente
const board = document.getElementById("board"); //manipulacion del canvas


let valuestring;
const movimiento=10;

   let imgArray = new Array();
  let imgfondo;

  imgArray[0] = new Image();
  imgArray[0].src = "imgs/dulces/3.png";;
  imgArray[1] = new Image();
  imgArray[1].src = 'imgs/dulces/5.png';
  imgArray[2] = new Image();
  imgArray[2].src = 'imgs/dulces/8.png';
  imgArray[3] = new Image();
  imgArray[3].src = 'imgs/dulces/9.png';
  imgArray[4] = new Image();
  imgArray[4].src = 'imgs/dulces/10.png';
  imgArray[5] = new Image();
  imgArray[5].src = "imgs/dulces/15.png";
  imgArray[6] = new Image();
  imgArray[6].src = 'imgs/dulces/17.png';





jet.style.position='absolute';
jet.style.left=0; 



//timer
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
setInterval(setTime, 1000);

function setTime()
{
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
  let valuestring;
  let valString;
    valString = val + "";
    if(valString.length < 2)
    {   
       valuestring= "0" + valString;
        
    }
    else
    { 
         valuestring= valString;
    }
    
    return valuestring
    
}










window.addEventListener('keydown', (e)=>{
  let left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  switch(e.key){
     case 'ArrowLeft':

      if(left>0){
        jet.style.left=parseInt(jet.style.left)-movimiento +'px';
      }

       break;
        
       case 'ArrowRight':
        if(left<=550){
          jet.style.left=parseInt(jet.style.left)+movimiento+'px';
        }
        

        
        
        break;  
  }


});


window.addEventListener("keyup", (e) => {
  
  
 
  if (e.key == "ArrowUp" || e.keyCode == 32) {
    //32 is for space key
    const bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);
    console.log('bala');





    let movebullet = setInterval(() => {
      let candies = document.getElementsByClassName("candies");

      
      
      for (let i = 0; i < candies.length; i++) {
        let candy = candies[i];
        if (candy != undefined) {
          let candybound = candy.getBoundingClientRect();
          let bulletbound = bullet.getBoundingClientRect();
          
         

          



          //revisamos que el dulce y la bala esten en la misma posicion, si es true eliminamos el dulce
          if (
            bulletbound.left >= candybound.left &&
            bulletbound.right <= candybound.right &&
            bulletbound.top <= candybound.top &&
            bulletbound.bottom <= candybound.bottom
          ) {
            candy.parentElement.removeChild(candy); //elimina el dulce;
           
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
          
            

        }
      }
      //obtenemos el valor de la propiedad botom del bullet
      let bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //mueve las balas hacia arriba  y alinea las balas con el diente
      bullet.style.bottom = bulletbottom + 5 + "px";
      bullet.style.left =parseInt(jet.style.left)+ 15+'px';
      
      
        //evitamos que las balas se salgan del canvas
      if(bulletbottom >850){
        clearInterval(movebullet);
      }
      
    },500);
  }
});


let intervalo=1000;

let generardulces=setInterval(generatecandies, intervalo);

function generatecandies () {
 

  let candy = document.createElement("div");
  candy.classList.add("candies");

  



  //obtenemos la propiedad left para generar los siguientes dulces
 
  //generate value between 0 to 450 where 450 => board width - rock width
  candy.style.left = Math.floor(Math.random() * 550) + "px";

  board.appendChild(candy);

 clearInterval(generardulces);

 if(secondsLabel.innerText==="30" ){
    console.log("changing generate speed");
    intervalo=600;

    let lvl=document.querySelector('.level h1')
    lvl.innerHTML="Level 2";
    board.style.backgroundImage="url" + "(" + "imgs/bobble_glow_pink.png" + ")";


    
    
  }
    
    generardulces=setInterval(generatecandies, intervalo);




};


let intervalo2=500;
let moverdulces= setInterval(moverocks,intervalo2);

 function moverocks() {
  let candies = document.getElementsByClassName("candies");
  
  
  
 


  if (candies != undefined) {

    let candy
    
    for (let i = 0; i < candies.length; i++) {
      //se incrementa el top de cada dulce para moverlas en el dom
       candy = candies[i]; //obtenemos cada dulce
 
       

      /* console.log({left});
      //console.log(candy);
      
      
      console.log({left2}) */


      let candytop = parseInt(
        window.getComputedStyle(candy).getPropertyValue("top")
      );

      

    
     

     

       

      //475 => boardheight - rockheight + 25
      

      candy.style.top = candytop + 33 + "px";
      if(candytop>650){
        candy.parentElement.removeChild(candy);
      }

      

      if(overlaps(candy,jet)){
        
          alert("game over" + "haz durado: "+ minutesLabel.innerText+"minutos" + "y " + secondsLabel.innerText +"segundos");
       
        
        
        clearInterval(moverdulces);
        
        



        window.location.reload();

      }

    }
    
    candy.style.background= "url" + "(" + imgArray[parseInt(Math.random()*7,0)].src + ")";
    candy.style.backgroundSize="50px 50px";
   
    

    
   
   
    
  }
   
    clearInterval(moverdulces);

    if(minutesLabel.innerText==="01" ){
       console.log("changing movement speed");
       intervalo2=400;
       let lvl=document.querySelector('.level h1');
       lvl.innerText="Level 3"
       board.style.backgroundImage="url" + "(" + "imgs/bobble_glow_purple.png" + ")";
       
       
     }
       
       moverdulces=setInterval(moverocks, intervalo2);
  
  


};




function overlaps(a, b) {

  
  let candies = document.getElementsByClassName("candies");

      let candy
      let jetbound = jet.getBoundingClientRect();
      let overlaping
      for (let i = 0; i < candies.length; i++) {
         candy = candies[i];
        if (candy != undefined) {

          

          const rect1 = a.getBoundingClientRect();
          const rect2 = b.getBoundingClientRect();
          const isInHoriztonalBounds =
            rect1.x < rect2.x + rect2.width && rect1.x + rect1.width-30 > rect2.x;
            
          const isInVerticalBounds =
            rect1.y < rect2.y + rect2.height && rect1.y + rect1.height-30 > rect2.y;
          const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;

         
          overlaping=isOverlapping;
        }


        overlaping=overlaping;
      }
      return overlaping;
}



  




/* const choque = () =>{
  let candies = document.getElementsByClassName("candies");

      let candy
      let jetbound = jet.getBoundingClientRect();
      
      for (let i = 0; i < candies.length; i++) {
         candy = candies[i];
        if (candy != undefined) {
          let candybound = candy.getBoundingClientRect();
          
          
           console.log("jet left " +jetbound.left);
            console.log("dulce left "+candybound.left);
             console.log("dulce top " + candybound.top)
            console.log("jet top " + jetbound.top)
            console.log("jet bottom"  + jetbound.bottom);
            console.log("candy bottom " + candybound.bottom); 
         
          
         


          //revisamos que el dulce y la bala esten en la misma posicion, si es true eliminamos el dulce
          if (
            candybound.x>=jetbound.x && candybound.y >=jetbound.y

          ) {

            console.log("choque")
             console.log("jet left " +jetbound.left);
            console.log("dulce left "+candybound.left);
            console.log("dulce top " + candybound.top)
            console.log("jet top " + jetbound.top)
            console.log("jet bottom"  + jetbound.bottom);
            console.log("candy bottom " + candybound.bottom);
            //puntaje
           
          }
          
            

        }
      } 



} */



  
  






