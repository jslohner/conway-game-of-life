from cell import Cell
import numpy as np
import copy

def initGrid(cellList):
	# grid = [list([Cell() for i in range(5)]) for i in range(5)]
	# for column, row in cellDict.items():
	# 	grid[row][column].toggleAlive()
	grid = []
	for i in range(25):
		row = []
		for j in range(25):
			row.append(Cell([i, j]))
		grid.append(row)
	for coordinate in cellList:
		grid[int(coordinate[0])][int(coordinate[1])].toggleAlive()
	return grid


def userStartGrid():
	# cellDict = {}
	cellList = []
	continueInput = True
	while continueInput:
		row, column = input('enter cell row and column (row,colum) - ').split(',')
		# cellDict[int(column)] = int(row)
		cellList.append([row, column])
		cont = input('add another cell (type [y] to continue || type any other key to end) - ')
		continueInput = False if (not cont == 'y') else True
	return initGrid(cellList)


def findCellAliveCount(cell, gameGrid):
	row = cell.coordinate[0]
	column = cell.coordinate[1]
	aliveCount = 0
	for i in range((row - 1), (row + 2)):
		for j in range((column - 1), (column + 2)):
			if i <= (len(gameGrid) - 1):
				if j <= (len(gameGrid[row]) - 1):
					# print(i, j)
					if gameGrid[i, j] is not cell:
						if gameGrid[i, j].isAlive:
							aliveCount += 1
	return aliveCount


def getNextGridState(gameGrid, prevGridState):
	for row in prevGridState:
		for cell in row:
			aliveCount = findCellAliveCount(cell, prevGridState)
			if cell.isAlive:
				if (aliveCount < 2) or (aliveCount > 3):
					gameGrid[cell.coordinate[0]][cell.coordinate[1]].toggleAlive()
			elif not cell.isAlive:
				if aliveCount == 3:
					gameGrid[cell.coordinate[0]][cell.coordinate[1]].toggleAlive()
	return gameGrid


def main():
	# gameGrid = np.array(userStartGrid())
	gameGrid = np.array(initGrid([[11,12], [12,11], [13,12], [12,13], [12,12]]))
	# gameGrid = np.array(initGrid([[1,2], [2,1], [3,2], [2,3], [2,2]]))
	# prevGridState = np.array(initGrid([[1,2], [2,1], [3,2], [2,3], [2,2]]))
	i = 0
	while i < 8:
		prevGridState = copy.deepcopy(gameGrid)
		gameGrid = getNextGridState(gameGrid, prevGridState)
		print(gameGrid)
		print('\n\n')
		i += 1

main()

# If a cell is alive, and 2 or 3 of it's neighbours are also alive, the cell remains alive.
# If a cell is alive and it has more than 3 alive neighbours, it dies of overcrowding.
# If a cell is alive and it has fewer than 2 alive neighbours, it dies of loneliness.
# If a cell is dead and it has exactly 3 neighbours it becomes alive again.

# gameGrid = np.array(initGrid([[11,12], [12,11], [13,12], [12,13], [12,12]]))
# prevGridState = np.array(initGrid([[11,12], [12,11], [13,12], [12,13], [12,12]]))
