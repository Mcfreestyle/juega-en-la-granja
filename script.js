var g1 = document.getElementById("granja1"),
	g2 = document.getElementById("granja2"),
	papel1 = g1.getContext("2d"),
	papel2 = g2.getContext("2d"),
	cajaVacas = document.getElementById("tvacas"),
	cajaCerdos = document.getElementById("tcerdos"),
	boton = document.getElementById("boton"),
	c,d;

var fondo = {},
	vaca = {},
 	cerdo = {},
	check = {};

var vx=[],vy=[],
 	vx1=[],vy1=[],
 	cx=[],cy=[],
 	cx1=[],cy1=[];

var teclas={
	UP:38,     
	DOWN:40,
	LEFT:37,
	RIGHT:39
};

fondo.imagen = new Image();
fondo.imagen.src = "images/tile.png";   
fondo.imagen.addEventListener("load",cargarFondo);

boton.addEventListener("click",jugar);
g2.addEventListener("click",seleccion);

function jugar()
{
	tvacas = parseInt(cajaVacas.value);
	tcerdos = parseInt(cajaCerdos.value);
	console.log(tvacas);
	console.log(tcerdos);

	if(tvacas < 0 || tvacas > 15 || tcerdos < 0 || tcerdos > 15)
	{
		alert("ingrese valores de 1 al 15");
	}
	else
	{
		vaca.imagen = new Image();
		vaca.imagen.src = "images/vaca.png";
		vaca.imagen.addEventListener("load",cargarVacas);

		cerdo.imagen = new Image();
		cerdo.imagen.src = "images/cerdo.png";
		cerdo.imagen.addEventListener("load",cargarCerdos);

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
		papel1.drawImage(fondo.imagen,0,0);
		papel2.drawImage(fondo.imagen,0,0);
	}
	if(vaca.cargaOK)
	{
		for( var v = 1; v <= tvacas; v++)
		{
			var x = aleatorio(0,5)*80;
			var y = aleatorio(0,5)*80;
			var i;
			for(i = 1; i < v; i++)
			{
				if(x == vx[i] && y == vy[i])
				{
				console.log("repite posicion de vaca");
				break;
				}
			}
			if(x == vx[i] && y == vy[i])
			{
				v = v - 1;
				continue;
			}
			vx[v] = x; vy[v] = y;
			papel1.drawImage(vaca.imagen,x,y);
			console.log("vacag1 "+ v +" x: "+ x +" y: "+ y);
		}
		for( var v = 1; v <= tvacas; v++)
		{
			var x1 = aleatorio(0,5)*80;
			var y1 = aleatorio(0,5)*80;
			var i;
			for(i = 1; i < v; i++)
			{
				if(x1 == vx1[i] && y1 == vy1[i])
				{
				console.log("repite posicion de vaca");
				break;
				}
			}
			if(x1 == vx1[i] && y1 == vy1[i])
			{
				v = v - 1;
				continue;
			}
			vx1[v] = x1; vy1[v] = y1;
			papel2.drawImage(vaca.imagen,x1,y1);
			console.log("vacag2 "+ v +" x: "+ x1 +" y: "+ y1);
		}		
	}
	if(cerdo.cargaOK)
	{
		for( var c = 1; c <= tcerdos; c++)
		{
			var x = aleatorio(0,5)*80;
			var y = aleatorio(0,5)*80;
			var i,j;
			for(i = 1; i < c; i++)
			{
				if(x == cx[i] && y == cy[i])//
				{
					console.log("repite posicion de cerdo");
					break;
				}
			}
			for(j = 1; j <= tvacas; j++)
			{
				if(x == vx[j] && y == vy[j])
				{
				console.log("repite posicion de cerdo con vaca");
				break;
				}
			}
			if(x == cx[i] && y == cy[i])
			{
				console.log("itera otra vez el cerdo con el mismo indice porque repite con cerdo");
				c = c - 1;
				continue;
			}
			if(x == vx[j] && y == vy[j])
			{
				console.log("itera otra vez el cerdo con el mismo indice porque repite con vaca");
				c = c - 1;
				continue;
			}
			cx[c] = x; cy[c] = y;
			papel1.drawImage(cerdo.imagen,x,y);
			console.log("cerdog1 "+ c +" x: "+ x +" y: "+ y);
		}
		for( var c = 1; c <= tcerdos; c++)
		{
			var x1 = aleatorio(0,5)*80;
			var y1 = aleatorio(0,5)*80;
			var i,j;
			for(i = 1; i < c; i++)
			{
				if(x1 == cx1[i] && y1 == cy1[i])
				{
					console.log("repite posicion de cerdo");
					break;
				}
			}
			for(j = 1; j <= tvacas; j++)
			{
				if(x1 == vx1[j] && y1 == vy1[j])
				{
				console.log("repite posicion de cerdo con vaca");
				break;
				}
			}
			if(x1 == cx1[i] && y1 == cy1[i])
			{
				console.log("itera otra vez el cerdo con el mismo indice porque repite con cerdo");
				c = c - 1;
				continue;
			}
			if(x1 == vx1[j] && y1 == vy1[j])
			{
				console.log("itera otra vez el cerdo con el mismo indice porque repite con vaca");
				c = c - 1;
				continue;
			}
			cx1[c] = x1; cy1[c] = y1;
			papel2.drawImage(cerdo.imagen,x1,y1);
			console.log("cerdog2 "+ c +" x: "+ x1 +" y: "+ y1);
		}		
	}
}

function aleatorio(min,max)
{
	var resultado;
	resultado = Math.floor(Math.random()*(max-min+1))+min;
	return resultado;
}

function seleccion(evento)
{
	var clickX = evento.offsetX,
		clickY = evento.offsetY;
	for(var i = 1; i <= tvacas; i++)
	{
		if(clickX >= vx1[i] && clickX <= vx1[i]+80 && clickY >= vy1[i] && clickY <= vy1[i]+80)
		{
			c = i;
			console.log("vaca seleccionado " +c);
			addEventListener("keyup", moverVaca);
			break; 
		}
		else
		{
			removeEventListener("keyup",moverVaca);
		}
	}
	for(var i = 1; i <= tcerdos; i++)
	{
		if(clickX >= cx1[i] && clickX <= cx1[i]+80 && clickY >= cy1[i] && clickY <= cy1[i]+80)
		{
			d = i;
			console.log("cerdo seleccionado "+d);
			addEventListener("keyup", moverCerdo);
			break; 
		}
		else
		{
			removeEventListener("keyup",moverCerdo);
		}
	}	
}

function moverVaca(evento)
{
	switch(evento.keyCode)
	{
		case teclas.UP:
			vy1[c] -= 80;
			for(var i = 1; i <=tvacas; i++)
			{
				if(c != i)
				{
					if(vx1[c] == vx1[i] && vy1[c] == vy1[i])
					{
						vy1[c] += 80;
						break;
					}
				}
			}
			for(var i = 1; i <=tcerdos; i++)
			{
				if(vx1[c] == cx1[i] && vy1[c] == cy1[i])
				{
					vy1[c] += 80;
					break;
				}
			}
			if(vy1[c] < 0)
			{
				vy1[c] += 80;
			}
			dibujarAvance();
		break;
		case teclas.DOWN:
			vy1[c] += 80;
			for(var i = 1; i <=tvacas; i++)
			{
				if(c != i)
				{
					if(vx1[c] == vx1[i] && vy1[c] == vy1[i])
					{
						vy1[c] -= 80;
						break;
					}
				}
			}
			for(var i = 1; i <=tcerdos; i++)
			{
				if(vx1[c] == cx1[i] && vy1[c] == cy1[i])
				{
					vy1[c] -= 80;
					break;
				}
			}
			if(vy1[c] >= 480)
			{
				vy1[c] -= 80;
			}
			dibujarAvance();
		break;
		case teclas.LEFT:
			vx1[c] -= 80;
			for(var i = 1; i <=tvacas; i++)
			{
				if(c != i)
				{
					if(vx1[c] == vx1[i] && vy1[c] == vy1[i])
					{
						vx1[c] += 80;
						break;
					}
				}
			}			
			for(var i = 1; i <=tcerdos; i++)
			{
				if(vx1[c] == cx1[i] && vy1[c] == cy1[i])
				{
					vx1[c] += 80;
					break;
				}
			}
			if(vx1[c] < 0)
			{
				vx1[c] += 80;
			}
			dibujarAvance();
		break;				
		case teclas.RIGHT:
			vx1[c] += 80;
			for(var i = 1; i <=tvacas; i++)
			{
				if(c != i)
				{
					if(vx1[c] == vx1[i] && vy1[c] == vy1[i])
					{
						vx1[c] -= 80;
						break;
					}
				}
			}			
			for(var i = 1; i <=tcerdos; i++)
			{
				if(vx1[c] == cx1[i] && vy1[c] == cy1[i])
				{
					vx1[c] -= 80;
					break;
				}
			}
			if(vx1[c] >= 480)
			{
				vx1[c] -= 80;
			}
			dibujarAvance();
		break;
	}
}

function moverCerdo(evento)
{
	switch(evento.keyCode)
	{
		case teclas.UP:
			cy1[d] -= 80;
			for(var i = 1; i <=tcerdos; i++)
			{
				if(d != i)
				{
					if(cx1[d] == cx1[i] && cy1[d] == cy1[i])
					{
						cy1[d] += 80;
						break;
					}
				}
			}
			for(var i = 1; i <=tvacas; i++)
			{
				if(cx1[d] == vx1[i] && cy1[d] == vy1[i])
				{
					cy1[d] += 80;
					break;
				}
			}
			if(cy1[d] < 0)
			{
				cy1[d] += 80;
			}
			dibujarAvance();
		break;
		case teclas.DOWN:
			cy1[d] += 80;
			for(var i = 1; i <=tcerdos; i++)
			{
				if(d != i)
				{
					if(cx1[d] == cx1[i] && cy1[d] == cy1[i])
					{
						cy1[d] -= 80;
						break;
					}
				}
			}
			for(var i = 1; i <=tvacas; i++)
			{
				if(cx1[d] == vx1[i] && cy1[d] == vy1[i])
				{
					cy1[d] -= 80;
					break;
				}
			}
			if(cy1[d] >= 480)
			{
				cy1[d] -= 80;
			}
			dibujarAvance();
		break;
		case teclas.LEFT:
			cx1[d] -= 80;
			for(var i = 1; i <=tcerdos; i++)
			{
				if(d != i)
				{
					if(cx1[d] == cx1[i] && cy1[d] == cy1[i])
					{
						cx1[d] += 80;
						break;
					}
				}
			}
			for(var i = 1; i <=tvacas; i++)
			{
				if(cx1[d] == vx1[i] && cy1[d] == vy1[i])
				{
					cx1[d] += 80;
					break;
				}
			}
			if(cx1[d] < 0)
			{
				cx1[d] += 80;
			}
			dibujarAvance();
		break;				
		case teclas.RIGHT:
			cx1[d] += 80;
			for(var i = 1; i <=tcerdos; i++)
			{
				if(d != i)
				{
					if(cx1[d] == cx1[i] && cy1[d] == cy1[i])
					{
						cx1[d] -= 80;
						break;
					}
				}
			}
			for(var i = 1; i <=tvacas; i++)
			{
				if(cx1[d] == vx1[i] && cy1[d] == vy1[i])
				{
					cx1[d] -= 80;
					break;
				}
			}
			if(cx1[d] >= 480)
			{
				cx1[d] -= 80;
			}
			dibujarAvance();
		break;
	}
}
function dibujarAvance()
{
	papel2.drawImage(fondo.imagen,0,0);

	for(i = 1; i <=tvacas; i++)
	{
		papel2.drawImage(vaca.imagen,vx1[i],vy1[i]);
	}
	for(i = 1; i <=tcerdos; i++)
	{
		papel2.drawImage(cerdo.imagen,cx1[i],cy1[i]);
	}
	logrado();
}

function logrado()
{
	var cumple = 0;
	for(var i = 1; i <=tvacas; i++)
	{
		for(var j = 1; j <=tvacas; j++)
		{
			if(vx1[i] == vx[j] & vy1[i] == vy[j])
			{
				cumple ++;
				console.log("cumple vaca "+ cumple); 
				break;
			}

		}

	}
	for(var i = 1; i <=tcerdos; i++)
	{
		for(var j = 1; j <=tcerdos; j++)
		{
			if(cx1[i] == cx[j] & cy1[i] == cy[j])
			{
				cumple ++;
				console.log("cumple cerdo "+ cumple); 
				break;
			}
		}
	}
	if( cumple == tvacas+tcerdos)
	{
		papel2.drawImage(check.imagen,100,100);
	}
}