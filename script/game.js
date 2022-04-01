let g1 = document.getElementById("granja1"),
	g2 = document.getElementById("granja2"),
	papel1 = g1.getContext("2d"),
	papel2 = g2.getContext("2d"),
	cajaVacas = document.getElementById("tvacas"),
	cajaCerdos = document.getElementById("tcerdos"),
	boton = document.getElementById("boton"),
	tvacas, tcerdos, anim;

let fondo = {},
	vaca = {},
 	cerdo = {},
	check = {};

let posVacas = new Array(2),//crea array de tamaño 2 para las 2 granjas
 	posCerdos = new Array(2);

let teclas={
	UP:38,     
	DOWN:40,
	LEFT:37,
	RIGHT:39
};

fondo.imagen = new Image();
fondo.imagen.src = "images/tile.png";   
fondo.imagen.addEventListener("load", cargarFondo);

boton.addEventListener("click", jugar);
g2.addEventListener("click", seleccion);

function aleatorio(min,max)
{
	let resultado;
	resultado = Math.floor(Math.random()*(max-min+1))+min;
	return resultado;
}

function seleccion(evento)
{
	reconoceAnimal(evento, posVacas);
	reconoceAnimal(evento, posCerdos);	
}

function reconoceAnimal(evento, posAnim)
{
	let clickX = evento.offsetX,//almacena la posicion x del click
		clickY = evento.offsetY,//almacena la posicion y del click
		i,
		limIzq, limDer, limSup, limInf;

	//let mifuncion = (evento) => {moverAnimal(evento, posAnim);};

	console.log(clickX, clickY);
	for(i = 0; i < posAnim[1].length; i++)//reconoce el animal seleccionado
	{
		limIzq = posAnim[1][i][0];
		limDer = posAnim[1][i][0] + 80;
		limSup = posAnim[1][i][1];
		limInf = posAnim[1][i][1] + 80;

		if(clickX >= limIzq && clickX <= limDer && clickY >= limSup && clickY <= limInf)//si el click esta en el animal, almacena dicha animal
		{
			anim = i;//almacena el animal seleccionado
			console.log("animal seleccionado " + anim);
			addEventListener("keyup", function handler(evento){moverAnimal(evento, posAnim); this.removeEventListener("keyup", handler)});//agrega un escuchador de eventos al animal seleccionada
			break;
		}
		/*else
			removeEventListener("keyup", mifuncion);*///quita el escuchador de eventos a la anterior animal seleccionado
	}	
}

function moverAnimal(evento, posAnim)
{
	let posAnim1;

	if (posAnim == posVacas)
		posAnim1 = posCerdos;
	else
		posAnim1 = posVacas;

	switch(evento.keyCode)
	{
		case teclas.UP:
			moverDir(posAnim, posAnim1, 1, "negativo");
		break;
		case teclas.DOWN:
			moverDir(posAnim, posAnim1, 1, "positivo");
		break;
		case teclas.LEFT:
			moverDir(posAnim, posAnim1, 0, "negativo");
		break;				
		case teclas.RIGHT:
			moverDir(posAnim, posAnim1, 0, "positivo");
		break;
	}
	dibujarAvance();
}

function moverDir(posAnim, posAnim1, dir, sentido)
{
	operacionAvance(posAnim, dir, sentido);
	if (sentido == "positivo")
		sentido = "negativo";
	else
		sentido = "positivo";

	for(let i = 0; i < posAnim[1].length; i++)//compara el movimiento del animal con las posiciones de las demas animales de la misma especie
	{
		if(anim != i)//si el animal seleccionado es diferente al animal de la iteracion
		{
			if(posAnim[1][anim][0] == posAnim[1][i][0] && posAnim[1][anim][1] == posAnim[1][i][1])//si el movimiento del animal es igual a las posiciones de las demas animales de su misma especie revierte el movimiento en sentido contrario
			{
				operacionAvance(posAnim, dir, sentido);
				break;
			}
		}
	}
	for(let i = 0; i < posAnim1[1].length; i++)//compara el movimiento del animal con las posiciones de los otros animales de diferente especie
	{
		if(posAnim[1][anim][0] == posAnim1[1][i][0] && posAnim[1][anim][1] == posAnim1[1][i][1])//si el movimiento del animal es igual a las posiciones de las otra especies revierte el movimiento en sentido contrario
		{
			operacionAvance(posAnim, dir, sentido);
			break;
		}
	}
	esLimite(posAnim, dir, sentido);
}

function operacionAvance(posAnim, dir, sentido)
{
	if (sentido == "positivo")
		posAnim[1][anim][dir] += 80;
	else if (sentido == "negativo")
		posAnim[1][anim][dir] -= 80;
}
function esLimite(posAnim, dir, sentido)
{
	if (sentido == "positivo")
	{
		if(posAnim[1][anim][dir] < 0)//si el movimiento del animal sale de la granja revierte el movimiento en sentido contrario
			operacionAvance(posAnim, dir, sentido);
	}
	else
	{
		if(posAnim[1][anim][dir] >= 480)
			operacionAvance(posAnim, dir, sentido);
	}
}

function dibujarAvance()
{
	let i;

	papel2.drawImage(fondo.imagen, 0, 0);

	for(i = 0; i < tvacas; i++)//dibuja las nuevas posiciones de las vacas si es q tienen
	{
		papel2.drawImage(vaca.imagen, posVacas[1][i][0], posVacas[1][i][1]);
	}
	for(i = 0; i < tcerdos; i++)//dibuja las nuevas posiciones de los cerdos si es q tienen
	{
		papel2.drawImage(cerdo.imagen, posCerdos[1][i][0], posCerdos[1][i][1]);
	}
	logrado();
}

function logrado()
{
	let cumple = 0, i ,j;

	for(i = 0; i < tvacas; i++)//coge la posicion de cada vaca de la granja 2
	{
		for(j = 0; j < tvacas; j++)//luego lo compara con las posiciones de las vacas de la granja 1
		{
			if(posVacas[1][i][0] == posVacas[0][j][0] && posVacas[1][i][1] == posVacas[0][j][1])//si la posicion de la vaca de la granja2 es igual a alguna de las posiciones de la granja1 lo cuenta como animal emparejado
			{
				cumple ++;
				console.log("cumple vaca "+ cumple); 
				break;
			}
		}
	}
	for(i = 0; i < tcerdos; i++)//coge la posicion de cada cerdo de la granja 2
	{
		for(j = 0; j < tcerdos; j++)//luego lo compara con las posiciones de los cerdos de la granja 1
		{
			if(posCerdos[1][i][0] == posCerdos[0][j][0] && posCerdos[1][i][1] == posCerdos[0][j][1])//si la posicion del cerdo de la granja2 es igual a alguna de las posiciones de la granja1 lo cuenta como animal emparejado
			{
				cumple ++;
				console.log("cumple cerdo " + cumple); 
				break;
			}
		}
	}
	if(cumple == tvacas + tcerdos)
	{
		papel2.drawImage(check.imagen, 100, 100);
	}
}