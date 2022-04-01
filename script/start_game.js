function jugar()
{
	tvacas = parseInt(cajaVacas.value);
	tcerdos = parseInt(cajaCerdos.value);

	// arreglo de 3 dimensiones
	for (let i = 0; i < posVacas.length; i++)
	{
		posVacas[i] = new Array(tvacas);
		for (let j = 0; j < posVacas[i].length; j++)
			posVacas[i][j] = new Array(2);
	}
	console.log(posVacas);
	for (let i = 0; i < posCerdos.length; i++)
	{
		posCerdos[i] = new Array(tcerdos);
		for (let j = 0; j < posCerdos[i].length; j++)
			posCerdos[i][j] = new Array(2);
	}
	console.log(posCerdos);

	if(tvacas < 0 || tvacas > 15 || tcerdos < 0 || tcerdos > 15)
		alert("ingrese valores de 1 al 15");
	else
	{
		vaca.imagen = new Image();
		vaca.imagen.src = "images/vaca.png";
		vaca.imagen.addEventListener("load", cargarVacas);

		cerdo.imagen = new Image();
		cerdo.imagen.src = "images/cerdo.png";
		cerdo.imagen.addEventListener("load", cargarCerdos);

		check.imagen = new Image();
		check.imagen.src = "images/check2.png";
	}	
}

function cargarFondo()
{
	fondo.cargaOK = true;
	dibujar();
}

function cargarVacas()
{
	vaca.cargaOK = true;
	dibujar();
}

function cargarCerdos()
{
	cerdo.cargaOK = true;
	dibujar();
}

function dibujar()
{
	if(fondo.cargaOK)
	{
		papel1.drawImage(fondo.imagen, 0, 0);
		papel2.drawImage(fondo.imagen, 0, 0);
	}
	if(vaca.cargaOK)
	{
		dibujarVaca(papel1, 0);
		dibujarVaca(papel2, 1);
	}
	if(cerdo.cargaOK)
	{
		dibujarCerdo(papel1, 0);
		dibujarCerdo(papel2, 1);
	}
}

function dibujarVaca(papel, granja)
{
	let v, x, y, i;

	for(v = 0; v < tvacas; v++)//genera coordenadas para cada vaca de la granja especificada
	{
		x = aleatorio(0,5)*80;
		y = aleatorio(0,5)*80;

		for(i = 0; i < v; i++)//compara la posicion de la vaca generada con las posiciones de las anteriores vacas
		{
			if(x == posVacas[granja][i][0] && y == posVacas[granja][i][1])//si se repite la posicion sale del bucle para generar despues otra posicion aleatoria
				break;
		}
		if(i < v)//si se repite la posicion reduce en uno la iteracion para q genere una nueva posicion aleatoria para la misma iteracion
		{
			v = v - 1;
			continue;
		}
		posVacas[granja][v][0] = x; posVacas[granja][v][1] = y;//almacena la posicion de las vacas de la granja especificada
		papel.drawImage(vaca.imagen,x,y);
	}
}

function dibujarCerdo(papel, granja)
{
	let c, x, y, i, j;

	for(c = 0; c < tcerdos; c++)//genera coordenadas para cada cerdo de la granja especificada
	{
		x = aleatorio(0,5)*80;
		y = aleatorio(0,5)*80;

		for(i = 0; i < c; i++)//compara la posicion del cerdo generado con las posiciones de los anteriores cerdos
		{
			if(x == posCerdos[granja][i][0] && y == posCerdos[granja][i][1])//si se repite la posicion sale del bucle para generar despues otra posicion aleatoria
				break;
		}
		for(j = 0; j < tvacas; j++)//compara la posicion del cerdo generado con las posiciones de las vacas 
		{
			if(x == posVacas[granja][j][0] && y == posVacas[granja][j][1])//si se repite la posicion sale del bucle para generar despues otra posicion aleatoria
				break;
		}
		if(i < c)//si se repite la posicion del cerdo con otro cerdo reduce en uno la iteracion para q genere una nueva posicion aleatoria para la misma iteracion
		{
			console.log("itera otra vez el cerdo con el mismo indice porque repite con cerdo");
			c = c - 1;
			continue;
		}
		if(j < tvacas)//si se repite la posicion del cerdo con de la vaca reduce en uno la iteracion para q genere una nueva posicion aleatoria para la misma iteracion
		{
			console.log("itera otra vez el cerdo con el mismo indice porque repite con vaca");
			c = c - 1;
			continue;
		}
		posCerdos[granja][c][0] = x; posCerdos[granja][c][1] = y;//almacena la posicion de los cerdos de la granja especificada
		papel.drawImage(cerdo.imagen,x,y);
	}
}