import { useEffect, useState } from "react";
import "./App.css";
import "./Fonts.css"
import Grid from "./components/Grid/Grid"
import x_click from "./assets/sounds/x_click.mp3"
import o_click from "./assets/sounds/o_click.mp3"
import win from "./assets/sounds/win.mp3"

let temp_grid = []
let x_history = []
let o_history = []	
let play_count = 1

function App() {	
	let [grid, setGrid] = useState([])
	let x_sound = new Audio(x_click)
	let o_sound = new Audio(o_click)
	let win_sound = new Audio(win)
	x_sound.volume = .5
	o_sound.volume = .5
	win_sound.volume = 1

	var FontFaceObserver = require('fontfaceobserver')

	const game_title = new FontFaceObserver('Gobahtrial')

	game_title.load().catch(e =>{
		console.error(e)
	})

	useEffect(()=>{
		for (let i = 0; i < 9; i++){
			temp_grid[i] = i
		}

		setGrid(temp_grid)
		console.log('test')
	},[])

	function checkWin(history, winner){
		let min = Math.min.apply(Math, history)
		let game_over = true
		switch (min) {
			case 0:
				//3 vezes = linha, coluna e diagonal
				//1: linha, 3: coluna, 4: diagonal
				let check0 = [1,3,4]

				for (let j = 0; j < 3; j++){
					min = Math.min.apply(Math, history)
					game_over = true
					
					for (let i = 0; i < 2; i++){
						min += check0[j]
						console.log(min)

						if (!history.includes(String(min))){
							game_over = false
							break
						}
					}
					
					if (game_over){
						handleWin(winner)
						break
					}
				}

				break;
			case 1:
				for (let i = 0; i < 2; i++){
					min += 3
					console.log(min)

					if (!history.includes(String(min))){
						game_over = false
						break
					}
				}
				
				if (game_over){
					handleWin(winner)
				}
				break;
			case 2:
				//2 vezes = coluna e diagonal
				//2: diagonal, 3: coluna
				let check2 = [2, 3]

				for (let j = 0; j < 2; j++){
					min = Math.min.apply(Math, history)
					game_over = true

					for (let i = 0; i < 2; i++){
						min += check2[j]

						if (!history.includes(String(min))){
							game_over = false
							break
						}
					}
					
					if (game_over){
						handleWin(winner)
						break
					}
				}

				break;
			case 3:
			case 6:
				for (let i = 0; i < 2; i++){
					min += 1
					console.log(min)

					if (!history.includes(String(min))){
						game_over = false
						break
					}
				}
				
				if (game_over){
					handleWin(winner)
				}
				break;
		
			default:
				break;
		}
	}

	function handleWin(winner){
		win_sound.play()
		//remove shadow da borda
		document.getElementsByClassName('grid__main')[0].style.boxShadow = 'none'

		if (winner == 'o'){
			document.getElementsByClassName('app__title')[0].classList.toggle('winner__o')
			//pisca as 3 marcacoes vitoriosas
			for (let i = 0; i < o_history.length; i++){
				document.getElementById(o_history[i]).classList.toggle('osymbol')
				document.getElementById(o_history[i]).classList.toggle('osymbol__winner')
			}
		} else {
			document.getElementsByClassName('app__title')[0].classList.toggle('winner__x')

			for (let i = 0; i < x_history.length; i++){
				document.getElementById(x_history[i]).classList.toggle('xsymbol')
				document.getElementById(x_history[i]).classList.toggle('xsymbol__winner')
			}	
		}

		document.getElementsByClassName('grid__main')[0].classList.toggle('grid__disabled')

		//restart game
		setTimeout(() => {
			document.getElementsByClassName('grid__main')[0].classList.toggle('grid__disabled')

			if (winner == 'o'){
				document.getElementsByClassName('app__title')[0].classList.toggle('winner__o')
				for (let i = 0; i < o_history.length; i++){
					document.getElementById(o_history[i]).classList.toggle('osymbol__winner')
				}

				for (let i = 0; i < x_history.length; i++){
					if (x_history.length > 2 && i == 0){
						document.getElementById(x_history[i]).classList.toggle('xsymbol__fade')
						continue
					}

					document.getElementById(x_history[i]).classList.toggle('xsymbol')
				}	
			} else {
				document.getElementsByClassName('app__title')[0].classList.toggle('winner__x')
	
				for (let i = 0; i < x_history.length; i++){
					document.getElementById(x_history[i]).classList.toggle('xsymbol__winner')
				}	

				for (let i = 0; i < o_history.length; i++){
					if (o_history.length > 2 && i == 0){
						document.getElementById(o_history[i]).classList.toggle('osymbol__fade')
						continue
					}

					document.getElementById(o_history[i]).classList.toggle('osymbol')
				}
			}

			o_history = []
			x_history = []
			play_count = 1
		}, 6000)
	}

	function addXO(target){
		if (play_count % 2 == 0){
			target.innerHTML = '✕'
			x_sound.load()
			x_sound.play()
			target.classList.toggle('xsymbol')
			x_history = x_history.concat(target.id)			
			document.getElementsByClassName('grid__main')[0].style.boxShadow = '0 0 4px 1px #fff, 0 0 12px 5px rgb(73, 73, 236), inset 0 0 4px 1px #fff, inset 0 0 7px 4px rgb(73, 73, 236)'

			if (play_count > 5){			
				let remove = document.getElementById(x_history[0])
				if (remove.classList.contains('xsymbol__fade') == true){
					remove.classList.toggle('xsymbol__fade')
					remove.innerHTML = ''
					x_history = x_history.splice(1)		
				}
				
				let fade = document.getElementById(o_history[0])
				fade.classList.toggle('osymbol')
				fade.classList.toggle('osymbol__fade')
			}
			
			checkWin(x_history, 'x')		
		} else {
			target.innerHTML = '○'
			o_sound.load()
			o_sound.play()
			target.classList.toggle('osymbol')
			o_history = o_history.concat(target.id)
			document.getElementsByClassName('grid__main')[0].style.boxShadow = '0 0 4px 1px #fff, 0 0 12px 5px rgb(255, 44, 44), inset 0 0 4px 1px #fff, inset 0 0 7px 4px rgb(255, 44, 44)'
			
			if (play_count > 5){		
				let remove = document.getElementById(o_history[0])
				remove.classList.toggle('osymbol__fade')
				remove.innerHTML = ''
				o_history = o_history.splice(1)
				
				let fade = document.getElementById(x_history[0])
				fade.classList.toggle('xsymbol')	
				fade.classList.toggle('xsymbol__fade')
			}
			
			checkWin(o_history, 'o')
		}
		
		play_count++
	}

    return (
		<div className="App">
			<div className="app__title">
				<h1>Tic Tie Break</h1>
			</div>
			<Grid
				grid = {grid}
				addXO = {addXO}
			/>
		</div>
	)
}

export default App;
