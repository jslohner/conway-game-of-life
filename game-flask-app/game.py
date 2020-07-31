from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

from cell import Cell
import numpy as np
import ast
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
		# row, column = input('enter cell row and column (row,colum) - ').split(',')
		# cellDict[int(column)] = int(row)
		cellList.append([row, column])
		# cont = input('add another cell (type [y] to continue || type any other key to end) - ')
		# continueInput = False if (not cont == 'y') else True
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

@app.route('/')
def main():
	# gameGrid = np.array(userStartGrid())
	currentGridState = np.array(initGrid([[11,12], [12,11], [13,12], [12,13], [12,12]]))
	# gameGrid = np.array(initGrid([[1,2], [2,1], [3,2], [2,3], [2,2]]))
	# prevGridState = np.array(initGrid([[1,2], [2,1], [3,2], [2,3], [2,2]]))
	i = 0
	while i < 8:
		prevGridState = copy.deepcopy(currentGridState)
		nextGridState = getNextGridState(currentGridState, prevGridState)
		# print(f'previous - {prevGridState}')
		# print(f'current - {currentGridState}')
		# print('\n\n')
		i += 1
	return str(nextGridState)

# main()

@app.route('/nextstep/<cellList>')
def oneStepForward(cellList):
	cellList = ast.literal_eval(cellList)
	currentGridState = np.array(initGrid(cellList))
	# ---
	prevGridState = copy.deepcopy(currentGridState)
	nextGridState = getNextGridState(currentGridState, prevGridState)
	# ---
	nextGridState = nextGridState.tolist()
	rtnDict = {i:nextGridState[i] for i in range(len(nextGridState))}
	for key in rtnDict:
		for i in range(len(rtnDict[key])):
			if rtnDict[key][i].isAlive:
				rtnDict[key][i] = 1
			else:
				rtnDict[key][i] = 0
	# print(rtnDict)
	return rtnDict
	# return str(nextGridState)

@app.route('/animate/<int:numrecursions>/<initialCellList>')
def animate(numrecursions, initialCellList):
	cellList = ast.literal_eval(initialCellList)
	currentGridState = np.array(initGrid(cellList))
	# ---
	rtnDict = {}
	for n in range(numrecursions):
		prevGridState = copy.deepcopy(currentGridState)
		nextGridState = getNextGridState(currentGridState, prevGridState)
		nextGridStateList = nextGridState.tolist()
		singleDict = {i:nextGridStateList[i] for i in range(len(nextGridStateList))}
		for key in singleDict:
			for i in range(len(singleDict[key])):
				if singleDict[key][i].isAlive:
					singleDict[key][i] = 1
				else:
					singleDict[key][i] = 0
		rtnDict[f'Recursion - {n}'] = singleDict
	# cont = True
	# dict1 = {}
	# dict2 = {}
	# while cont:
	# 	prevGridState = copy.deepcopy(currentGridState)
	# 	nextGridState = getNextGridState(currentGridState, prevGridState)
	# 	dict1 = {i:currentGridState[i] for i in range(len(currentGridState))}
	# 	dict2 = {i:nextGridState[i] for i in range(len(nextGridState))}
		# for key in dict1.keys():
		# 	for i in range(len(dict1[key])):
		# 		if dict1[key][i] != dict2[key][i]:
		# 			cont = False
	# for key in rtnDict1:
	# 	for i in range(len(rtnDict[key])):
	# 		if rtnDict[key][i].isAlive:
	# 			rtnDict[key][i] = 1
	# 		else:
	# 			rtnDict[key][i] = 0
	# for key in rtnDict2:
	# 	for i in range(len(rtnDict[key])):
	# 		if rtnDict[key][i].isAlive:
	# 			rtnDict[key][i] = 1
	# 		else:
	# 			rtnDict[key][i] = 0
	return rtnDict
