var list = function(seed){
	var intLength;
	var intList;
	var genListFromArray = function(arr){
		var first = generateNode(undefined);
		var prev = first;
		for (var i = 0;i < arr.length;i++){
			var current = generateNode(arr[i]);
			if (prev){
				prev.bindNext(current);
			}
			prev = current;
		}
		intLength = arr.length;
		intList = first;
	};
	var generateNode = function(item){
		var nextNode = item ? generateNode(undefined) : undefined;
		var currentValue = item;
		return {
			bindNext:function(newNext){nextNode = newNext;},
			getNext:function(){return nextNode;},
			value:function(){return currentValue;}	
		};
	};
	var generateIterator = function(){
		var currentNode = intList;
		return {
			hasNext:function(){
				var next = currentNode.getNext();
				return next != undefined && next.value() != undefined;
			},
			next:function(){
				var possibleNext = currentNode.getNext();
				if (possibleNext){
					currentNode = possibleNext;
					return currentNode.value();
				} else {
					return undefined;
				}
			}
		};
	};
	var toArrayFunction = function(){
		var iter = generateIterator();
		var output = [];
		var pos = 0;
		while (iter.hasNext()){
			output[pos] = iter.next();
			pos++;
		}
		return output;
	}
	var reverseListFunction = function(){
		var iter = generateIterator();
		var last = generateNode(undefined);
		var next = last;  
		var first;
		while (iter.hasNext()){
			var current = generateNode(iter.next());
			current.bindNext(next);
			next = current;
			first = current;
		}
		var newFirst = generateNode(undefined);
		newFirst.bindNext(first)
		intList = newFirst;
		return this;
	}
	var nodeAtAndPrev = function(index){
		var pos = 0;
		var found = false;
		var prevNode;
		var currentNode = intList;
		var output;
		while (!found && pos <= index){
			prevNode = currentNode;
			currentNode = currentNode.getNext();
			if (pos == index){
				found = true;
				output = {previous:prevNode,current:currentNode};
			} else {
				pos ++;
			}
		}
		return output;
	};
	var nodeAt = function(index){
		var possibleNode = nodeAtAndPrev(index);
		if (possibleNode != undefined && "current" in possibleNode){
			return possibleNode.current;
		}
	}
	var elementAtFunction = function(index){
		var possibleNode = nodeAt(index);
		if (possibleNode){
			return possibleNode.value();
		}
	};
	var addElementFunction = function(index,elem){
		var possibleNode = nodeAtAndPrev(index);	
		if (possibleNode != undefined && "current" in possibleNode && "previous" in possibleNode){
			var newNode = generateNode(elem);
			newNode.bindNext(possibleNode.current);
			possibleNode.previous.bindNext(newNode);
		}
		return this;
	};
	var removeElementFunction = function(index){
		var possibleNode = nodeAtAndPrev(index);	
		if (possibleNode != undefined && "current" in possibleNode && "previous" in possibleNode){
			var nextAfter = possibleNode.current.getNext();
			possibleNode.previous.bindNext(nextAfter);
		}
		return this;
	};
	var sortFunction = function(sortFunc){
		var sortable = bench("sort",function(){return sortFunc(toArrayFunction());});	
		genListFromArray(sortable);	
		return this;
	};
	var bench = function(name,action){
		var s = new Date().getTime();	
		var output = action();
		var e = new Date().getTime();
		console.log("BENCHMARK:",name,e - s);
		return output;	
	};
	var shuffleFunction = function(){
		var shuffleArray = toArrayFunction();
		var shufflePass = function(){
			var size = shuffleArray.length;
			for (var i = 0;i < size;i++){
				if (Math.random() > 0.5){
					var newPos = Math.floor(Math.random() * size);
					var temp = shuffleArray[newPos];
					shuffleArray[newPos] = shuffleArray[i];
					shuffleArray[i] = temp;
				}	
			}
		}
		bench("shuffle",shufflePass);
		genListFromArray(shuffleArray);
		return this;
	};
	genListFromArray(seed);
	return {
		length:function(){return intLength;},
		reverse:reverseListFunction,
		add:addElementFunction,
		remove:removeElementFunction,
		sort:sortFunction,
		shuffle:shuffleFunction,
		elementAt:elementAtFunction,
		getIterator:generateIterator,
		toArray:toArrayFunction
	};
};

var testFuncs = (function(){
	return {
		buildList:function(size){
			var output = [];
			for (var i = 0;i < size; i++){
				output.push(Math.random() * 1000);
			}
			return output;
		}
	};
})();

var SortFuncs = (function(){
	var bubbleFunc = function(arr){
		var bubbleBack = function(index){
			var item = arr[index];
			var testAgainst = arr[index - 1];
			if (item && testAgainst && item < testAgainst){
				arr[index] = testAgainst;
				arr[index - 1] = item;
				bubbleBack(index - 1);
			}
		};
		for (var i = 0; i < arr.length; i++){
			bubbleBack(i);	
		}
		return arr;
	};
	var mergeSortFunc = function(arr){
		var arrDef = function(sIndex,eIndex){
			var pos = 0;
			var length = eIndex - sIndex + 1;
			var start = sIndex;
			var end = eIndex;
			var hasNextFunc = function(){
				return (pos + start) < end; 
			};
			var moveToNextFunc = function(){
				pos++;
			};
			var getCurrentFunc = function(){
				if (pos < length){
					return start + pos;
				} else {
					return undefined;
				}
			};
			var resetFunc = function(){
				pos = 0;
			};
			return {
				hasNext:hasNextFunc,
				moveToNext:moveToNextFunc,
				getCurrent:getCurrentFunc,
				reset:resetFunc,
				start:sIndex,
				end:eIndex,
				size:length
			};
		}
		var ranges = [];
		var generateStartingSubDefs = function(){
			for (var i = 0;i < arr.length;i++){
				ranges[i] = arrDef(i,i);
			};
		};
		var mergeFunc = function(a,b){
			var mergedStart = Math.min(a.start,b.start);
			var mergedEnd = Math.max(a.end,b.end);
			var mergedSize = mergedEnd - mergedStart + 1;
			var mergedArr = [];
			var flip = function(){
				var currA = a.getCurrent();
				var currB = b.getCurrent();
				var aVal = arr[currA];
				var bVal = arr[currB];
				var output;
				var aIsLess = false, bIsLess=false;
				if (currA == undefined || aVal == undefined){
					if (currB != undefined && bVal != undefined){
						bIsLess = true;
					}
				}	else if (currB == undefined || bVal == undefined){
					if (currA != undefined && aVal != undefined){
						aIsLess = true;
					}
				} else if (currA != undefined && arr[currA] != undefined && currB != undefined && arr[currB] != undefined){
						if (aVal < bVal){
							aIsLess = true;
						} else {
							bIsLess = true;
						}
				}
				if (aIsLess){
					a.moveToNext();
					output = aVal;
				}
				if (bIsLess){
					b.moveToNext();
					output = bVal;
				}
				return output;
			};
			var pos = 0;
			while (pos <= mergedSize){
				var nextVal = flip();
				if (nextVal){
					mergedArr[pos] = nextVal;
				}
				pos++;	
			};
			for (var i = 0; i < mergedArr.length; i++){
				arr[i + mergedStart] = mergedArr[i];	
			}
			return arrDef(mergedStart,mergedEnd);
		};
		generateStartingSubDefs();
		while (ranges.length > 1){
			var newRanges = [];
			for (var i = 0; i < ranges.length; i++){
				var odd = (i % 2) == 1;
				if (odd){
					newRanges[newRanges.length] = mergeFunc(ranges[i],ranges[i-1]);
				} else {
					if (ranges[i + 1] == undefined){
						newRanges[newRanges.length] = ranges[i];
					}
				};
			};	
			ranges = newRanges;
		};
		
		return arr;	
	};
	var insertFunc = function(arr){
		for (var pass = 0; pass < arr.length; pass++){
			var indexOfLowest = pass; 
			var currentLowest = arr[indexOfLowest];
			for (var lowestPass = pass; lowestPass < arr.length; lowestPass ++){
				var currentPosVal = arr[lowestPass];
				if (currentPosVal < currentLowest){
					currentLowest = currentPosVal;
					indexOfLowest = lowestPass;
				}
			}
			var temp = arr[pass];
			arr[pass] = arr[indexOfLowest];
			arr[indexOfLowest] = temp;	
		}
		return arr;	
	};
	var OETransFunc = function(arr){
	};
	var ShearFunc = function(arr){
	};
	var quickFunc = function(arr){
		if (arr.length > 5){
			var max;
			var min;
			//var total;
			for (var i = 0; i < arr.length; i++){
				var current = arr[i];
				if (max == undefined){
					max = current;
				};
				if (min == undefined){
					min = current;
				};
				if (current > max){
					max = current;
				} else if (current < min){
					min = current;
				};
				//total = total + current;
			};
			var median = ((max - min) / 2) + min;
			//var mean = total / arr.length;
			// not sure whether to use mean or median yet for quicksort
			var low = [];
			var high = [];
			for (var i = 0; i < arr.length; i++){
				var current = arr[i];
				if (current >= median){
					high.push(current);
				} else {
					low.push(current);
				}
			};
			low = quickFunc(low);
			high = quickFunc(high);
			for (var i = 0; i < high.length; i++){
				low.push(high[i]);	
			}
			return low;
		} else {
			return insertFunc(arr);	
		}
	};
	return {
		bubble:bubbleFunc,
		merge:mergeSortFunc,
		insert:insertFunc,
		OETranspositional:OETransFunc,
		Shear:ShearFunc,
		quick:quickFunc
	};
})();
