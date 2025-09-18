$(document).ready(function(){

  // Ações do usuário que mostram e/ou escondem o logotipo.
  // Por padrão, mostra no topo e fim da página.
  // Remova ou reescreva de acordo com o projeto.
   
  // Variaveis globais
  var escolha = '';
  var cartas;
  var vezes = 0;
  var vermelhas = 6;
  var pretas = 4;
  var jogadas = 0;
  var bonus1 = 0;
  var bonus2 = 0;
  var ganhou = false;
  var quem_ganhou = ''; 
  var bonus_1 = 0;   
  var bonus_2 = 0;;
  var partidas = 0;  
  var jogo = 0;
  var total = 0;
  $(window).scroll(function(){

    var nav = $("nav");
    var scroll = $(window).scrollTop();

    // Mostra o nav quando a página está no topo
    if(scroll == 0){
      nav.fadeIn();
    //Mostra a nav quando a página chega no fim
    // } else if (scroll == $(document).height() - $(window).height()) {
    //  nav.fadeIn();
    //Esconde a nav
    }

	else {
      nav.fadeOut();
    }

  });

  
    /*---------------------------------------------- Quando Clica em cada carta.  ----------------------------------------*/
    $('.flip-container .flipper').click( carta);

    function carta(){	 
       console.log('Entrei aqui');	
	   //Caso nenhuma opção seja de Aposta 1 for marcada, não executa o resto da função, pois retorna 0.
	   if(escolha === ''){
		//Apresenta a mensagem e depois de um tempo ela desaparece.   
		$('.mensagem').show();
		setTimeout(function(){$('.mensagem').hide();},2000);
		return (0);
	   }
		    
	   //Desabilita a caixa de aposta após o primeiro clique.	
       $( ".naipe" ).addClass( "ui-state-disabled" );
       $( ".numero_jogada" ).addClass( "ui-state-disabled" );
	   //Esconde a mensagem que pede a aposta.
       $('.mensagem').hide();
       $(this).addClass("flip");
	   //Atualiza o número de vezes.
       vezes++;
       console.log(vezes)
	   //Atualiza o número de partidas.
       partidas++;
	   //Pega o id da carta que foi clicada.
       cartas = $(this).attr('id');
	   
	   //Se o id 
       if(cartas < 7){
         vermelhas--;
       }

       if(cartas<7 && escolha=="vermelhas"){
        jogo = jogo+2;
          $('#jogo').text(jogo);
       }
        if(cartas>6 && escolha=="pretas"){
        jogo = jogo+3;
          $('#jogo').text(jogo);
       }


       
	   if(cartas > 6){
         pretas--;
  
       }

       //Checar se ganhou
       if(vermelhas == 0){
         ganhou = true;
         quem_ganhou = 'vermelhas';
       }
        
	   if(pretas == 0){
         ganhou = true;
         quem_ganhou = 'pretas';
       }              

       $('#'+cartas).off('click');
        
	   if(escolha == quem_ganhou){
         bonus_1 = parseInt(bonus_1) + 20;
         $('.mensagem2').show();
         $('.avancarEtapa3').show();
         $('#bonus1').text(bonus_1);
         $('.linha_bonus1').addClass('sombra2');
         $('.teste3').addClass('sombra2');
       }
		
       if(quem_ganhou != escolha && ganhou){
         $('.mensagem3').show();
         $('.avancarEtapa3').show();
       }

       if(ganhou && vezes == jogadas && jogadas==4){
         bonus_2 = parseInt(bonus_2) + 20;
         $('#bonus2').text(bonus_2);
         $('.linha_bonus2').addClass('sombra2');
         $('.teste2').addClass('sombra2');
       } 

       if(ganhou && vezes == jogadas && jogadas==5){
         bonus_2 = parseInt(bonus_2) + 18;
         $('#bonus2').text(bonus_2);
         $('.linha_bonus2').addClass('sombra2');
         $('.teste2').addClass('sombra2');
       } 

       if(ganhou && vezes == jogadas && jogadas==6){
         bonus_2 = parseInt(bonus_2) + 16;
         $('#bonus2').text(bonus_2);
         $('.linha_bonus2').addClass('sombra2');
         $('.teste2').addClass('sombra2');
       } 

       if(ganhou && vezes == jogadas && jogadas==7){
         bonus_2 = parseInt(bonus_2) + 14;
         $('#bonus2').text(bonus_2);
         $('.linha_bonus2').addClass('sombra2');
         $('.teste2').addClass('sombra2');
       } 

       if(ganhou && vezes == jogadas && jogadas==8){
         bonus_2 = parseInt(bonus_2) + 12;
         $('#bonus2').text(bonus_2);
         $('.linha_bonus2').addClass('sombra2');
         $('.teste2').addClass('sombra2');
       } 

       if(ganhou && vezes == jogadas && jogadas==9){
         bonus_2 = parseInt(bonus_2) + 10;
         $('#bonus2').text(bonus_2);
         $('.linha_bonus2').addClass('sombra2');
         $('.teste2').addClass('sombra2');
       } 
       
                        
       //Atualiza probabilidades
       $('#porcentagem_verm').text(parseInt((vermelhas/(10-vezes))*100) + "%");
       $('#porcentagem_pret').text(parseInt((pretas/(10-vezes))*100) + "%");

       if(ganhou)
         resultado();
    }	
  
    /*---------------------------------------------- Avançar etapa 2. ----------------------------------------------------*/
    $(".avancarEtapa2").on("click", function(){
     var etapaAtual = $(this).parents(".etapa1");
      etapaAtual.hide();
      $(".etapa2").fadeIn("slow");
      $(".etapa3").fadeIn("slow");
      $('body').css('background-image','none');
      embaralha();
      setTimeout(function(){
        $("#manual").fadeIn();},750);
    });
	
    /*---------------------------------------------- Botão nova aposta----------------------------------------------------*/
    $('.avancarEtapa3').click(function(){
      console.log(jogadas)
      $(this).hide();
      vezes = 0;
      vermelhas = 6;
      pretas = 4;
      ganhou = false;
      quem_ganhou = '';
      escolha = '';
      jogo=0;
      bonus_1=0;
      bonus_2=0;
      $('.teste3').removeClass('sombra2');
      $('.teste2').removeClass('sombra3');
      $('.teste2').removeClass('sombra2');
      $('.linha_bonus2').removeClass('sombra3');
      $('.mensagem').show();
      setTimeout(function(){$('.mensagem').hide();},2000);
      $('.indice').text('');
      $('#bonus1').text("0");
      $('#bonus2').text("0");
      $('#jogo').text('0');
      $('#escolha').removeAttr('disabled');
	    $('#escolha').val('');
      $('#porcentagem_verm').text('60%');
      $('#porcentagem_pret').text('40%');
      $('.mensagem2').hide();
      $('.mensagem3').hide();
      $('.melancia').removeClass('sombra');
      $('.maca').removeClass('sombra');
      $('.link2').text('Naipe');
      $('.linha_bonus1').removeClass('sombra2');
      $('.linha_bonus2').removeClass('sombra2');
      $( ".naipe" ).removeClass( "ui-state-disabled" );
       $( ".numero_jogada" ).removeClass( "ui-state-disabled" );
      $('.ui-widget-content').show();                  
      setTimeout( function() {embaralha();}, 200 );
      $('.flip-container .flipper').removeClass('flip');
	  console.log('habilitei');
    $('.numero_jogada').click(function(){
      jogadas = $(this).attr('id');
      $('.indice').text(jogadas);
      console.log(jogadas)
       $this = $(this),
        $next.slideToggle();
        $this.parent().toggleClass('open');
        $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    });
	  $('.flipper').on('click', carta);
    });  
 
    /*---------------------------------------------- Função que embaralha.------------------------------------------------*/
    function embaralha(){
   
       for (var $x = $(".droppable-area1 li"), i = $x.length - 1 , j, temp ; i >= 0 ; i--){
  	     j = Math.floor(Math.random()*(i+1));
	     temp = $x[i];
		 $x[i] = $x[j];
		 $x[j] = temp; 
	   }

	   $x.each(function(i, li){
	     $(".droppable-area1").append(li);
	   });
		
       $(function(){
          var $x = $(".droppable-area1 li");
            
		  Array.prototype.sort.call($x, function(){return Math.round(Math.random())< 0.5;});
          
		  $x.each(function(i, li){
            $(".droppable-area1").append(li); });
    
	      setTimeout(function(){
			$(".droppable-area1" ).find( "li" ).eq( 0 ).show();},200);
    
	      setTimeout(function(){
            $( ".droppable-area1" ).find( "li" ).eq( 1 ).show();},300);
		  
          setTimeout(function(){
			$( ".droppable-area1" ).find( "li" ).eq( 2 ).show();},350);
					
		  setTimeout(function(){
			$( ".droppable-area1" ).find( "li" ).eq( 3 ).show();},400);
		
		  setTimeout(function(){
            $( ".droppable-area1" ).find( "li" ).eq( 4 ).show();},450);
					
          setTimeout(function(){
            $(".droppable-area1" ).find( "li" ).eq( 5 ).show();},500);
					
          setTimeout(function(){
            $(".droppable-area1" ).find( "li" ).eq( 6 ).show();},550);
					
          setTimeout(function(){
		    $(".droppable-area1" ).find( "li" ).eq( 7 ).show();},600);
					
          setTimeout(function(){
		    $(".droppable-area1" ).find( "li" ).eq( 8 ).show();},650);
					
          setTimeout(function(){
			$(".droppable-area1" ).find( "li" ).eq( 9 ).show();},700);
        });

        $("#resposta1").animate({left: '700px'},200);
        $("#resposta1").animate({left: '30%', top: '50%'},300);
        $("#resposta2").animate({left: '700px'},400);
        $("#resposta2").animate({left: '32%'},420);
        $("#resposta3").animate({left: '700px'},600);
        $("#resposta3").animate({left: '34%'},500);
        $("#resposta4").animate({left: '700px'},800);
        $("#resposta4").animate({left: '36%'},520);
        $("#resposta5").animate({left: '700px'},1000);
        $("#resposta5").animate({left: '38%'},600);
        $("#resposta6").animate({left: '700px'},1200);
        $("#resposta7").animate({left: '700px'},1400);
	    $("#resposta8").animate({left: '700px'},1600);
        $("#resposta9").animate({left: '700px'},1800);
        $("#resposta10").animate({left: '700px'},2000);
        $("#resposta11").animate({left: '700px'},2200);
        $("#resposta12").animate({left: '700px'},2400);
        $("#resposta13").animate({left: '700px'},2400);
        $("#resposta14").animate({left: '700px'},2400);
        $("#resposta15").animate({left: '700px'},2400);
        $("#resposta16").animate({left: '700px'},2400);
        $("#resposta17").animate({left: '700px'},2400);
        $("#resposta18").animate({left: '700px'},2400);

        setTimeout(myFunction, 700);

    } 
  
    /*---------------------------------------------- Quando ele aposta no número de jogadas-------------------------------*/
    $('.numero_jogada').click(function(){
      jogadas = $(this).attr('id');
      $('.indice').text(jogadas);
      console.log(jogadas)
    });

	/*---------------------------------------------- Quando ele aposta no naipe--------------------------------------*/
    $('.naipe').click(function(){
      escolha = $(this).attr('id');
      console.log(escolha)
      if(escolha=="vermelhas"){
        $('.maca').addClass('sombra');
        $('.melancia').removeClass('sombra');
        $('.link2').text('Maçã (0,48%)')
      }
     if(escolha=="pretas"){
        $('.melancia').addClass('sombra');
        $('.maca').removeClass('sombra');
        $('.link2').text('Melancia (0,48%)')
      }
	});	
	
	function myFunction(){
      $('.ui-widget-content').hide();
    }
        
    $('.close, #manual').click(function(){
      $("#manual").hide();
    });
		
	$('.close2, #entenda').click(function(){
      $("#entenda").hide();
    });
		
    $('.close3, #sugestao').click(function(){
      $("#sugestao").hide();
    });

    $('.instrucao').click(function(){
      $("#manual").show();
      $("#entenda").hide();
      $("#sugestao").hide();
    });

    $('.entenda').click(function(){
      $("#entenda").show();
      $("#manual").hide();
      $("#sugestao").hide();
    });

    $('.sugestao').click(function(){
      $("#sugestao").show();
      $("#entenda").hide();
      $("#manual").hide();
    });
	
      
    //Quando ganhar.
    function resultado(){
      total=total + (jogo + bonus_1 + bonus_2);
      $('.flipper').off('click');
      $('#total').text(total);
    };



	
	
	$(function() {
		
	  var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        // Variables privadas
        var links = this.el.find('.link');
        var fechar = $('.flip-container');
        var fechar2 = $('.naipe');
        var fechar3 = $('.numero_jogada');
        var fechar4 = $('.instrucao, .entenda, .sugestao');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
         fechar.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
         fechar2.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
         fechar3.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
         fechar4.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
        console.log("entrei no accordion")
      }

      Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this),
        $next = $this.next();
        $next.slideToggle();
        $this.parent().toggleClass('open');

		if(!e.data.multiple) {
          $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
      } 

      var accordion = new Accordion($('#accordion'), false);
    });

 });