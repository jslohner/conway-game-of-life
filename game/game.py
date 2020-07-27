from cell import Cell
import numpy as np

def initGrid(cellDict):
	grid = [list([Cell() for i in range(25)]) for i in range(25)]
	for column, row in cellDict.items():
		grid[row][column].toggleAlive()
	return grid

def userStartGrid():
	cellDict = {}
	continueInput = True
	while continueInput:
		row, column = input('enter cell row and column (row,colum) - ').split(',')
		cellDict[int(column)] = int(row)
		cont = input('add another cell (type [y] to continue || type any other key to end) - ')
		continueInput = False if (not cont == 'y') else True
	return initGrid(cellDict)

def main():
	gameGrid = np.array(userStartGrid())
	print(gameGrid)

main()
