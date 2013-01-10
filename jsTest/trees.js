var tree = function(seed){
	var root;
	var isNode = function(node){
		return (node != undefined && "isTreeNode" in node && node.isTreeNode);
	};
	var inOrderFunc = function(n){return [n.lower(),n,n.higher()];};
	var preOrderFunc = function(n){return [n,n.lower(),n.higher()];};
	var postOrderFunc = function(n){return [n.lower(),n.higher(),n];};
	var genNode = function(item){
		var content = item;
		var left;
		var right;
		var p;
		var bindParentFunction = function(newParent){
			p = newParent;
		};
		var bindChildFunction = function(newChild){
			if (isNode(newChild)){
				if (newChild.value() > content){
					if (right == undefined){
						right = newChild;
						newChild.bindParent(this);
					} else {
						right.bindChild(newChild);
					}
				} else {
					if (left == undefined){
						left = newChild;
						newChild.bindParent(this);
					} else {
						left.bindChild(newChild);
					}
				}
			}
		};
		var unbindChildFunction = function(newChild){
			if (isNode(newChild)){
				if (newChild == left){
					left = undefined;
				} else if (newChild == right){
					right = undefined;
				}
			}
		};
		var unbindParentFunction = function(newParent){
			if (isNode(newParent) && p == newParent){
				p = undefined;
			}
		};
		var removeSelfFunction = function(){
			var tempP = p;
			if (isNode(tempP)){
				tempP.unbindChild(this);
				unbindParentFunction(tempP);
			}
			var children = [];
			if (isNode(left)){
				children.push(left);
			};
			if (isNode(right)){
				children.push(right);
			};
			if (children.length == 1){
				var survivingChild = children[0];
				if (isNode(tempP)){
					tempP.bindChild(survivingChild);	
					survivingChild.bindParent(tempP);
				} else {
					root = survivingChild;
				};
			} else if (children.length > 1){
				var subValuesList = children[0].generateList(inOrderFunc);
				children[1].generateList(inOrderFunc).forEach(function(v){
					subValuesList.push(v);
				});
				var newSubRoot = tree(subValuesList).root();
				if (isNode(newSubRoot)){
					if (isNode(tempP)){
						tempP.bindChild(newSubRoot);
						newSubRoot.bindParent(tempP);	
					} else {
						root = newSubRoot;
					}
				}
			}
			return this;
		};
		var searchFunction = function(key){
			if (key == content){
				return this;
			} else if (key < content && left != undefined){
				return left.search(key);
			} else if (key > content && right != undefined){
				return right.search(key);
			} else {
				return undefined;
			}
		};
		var minimumFunction = function(){
			var tempMin = this;
			while (tempMin.lower() != null){
				tempMin = tempMin.lower();
			}
			return tempMin;
		};
		var maximumFunction = function(){
			var tempMax = this;
			while (tempMax.higher() != null){
				tempMax = tempMax.higher();
			}
			return tempMax;
		};
		var generateListFunc = function(orderFunc){
			var outputList = [];
			actUponTreeByOrderFunc(this,orderFunc,function(node){outputList.push(node.value());});	
			return outputList;
		};
		var generateOrderedIteratorFunc = function(orderFunc){
			var internalList = generateListFunc(orderFunc);
			var currentIndex = -1;
			return {
				hasNext:function(){
					return internalList[currentIndex + 1] != undefined;
				},
				next:function(){
					currentIndex ++;
					return internalList[currentIndex];
				}
			};
		};
		var actUponTreeByOrderFunc = function(node,orderFunc,toDoWith){
			if (isNode(node)){
				orderFunc(node).forEach(function(n){
					if (node == n){
						toDoWith(n);
					} else {
						actUponTreeByOrderFunc(n,orderFunc,toDoWith);
					}
				});
			}
		};
		return {
			isTreeNode:true,
			initialValue:item,
			parent:function(){return p;},
			lower:function(){return left;},
			higher:function(){return right;},
			bindChild:bindChildFunction,
			unbindChild:unbindChildFunction,
			bindParent:bindParentFunction,
			unbindParent:unbindParentFunction,
			remove:removeSelfFunction,
			value:function(){return content;},
			min:minimumFunction,
			max:maximumFunction,
			search:searchFunction,
			generateOrderedIterator:generateOrderedIteratorFunc,
			generateList:generateListFunc,	
		};
	};
	var searchFunction = function(key){
		return root.search(key);
	};
	var minimumFunction = function(){
		return root.min();
	};
	var maximumFunction = function(){
		return root.max();
	};
	var toArrayFunction = function(){
		return root.generateList(inOrderFunc);
	};
	var generateIterator = function(){
		return root.generateOrderedIterator(inOrderFunc);
	};
	var insertFunction = function(newValue){
		if (root == undefined){
			root = genNode(newValue);
		} else {
			root.bindChild(genNode(newValue));
		}
		return this;
	};
	var removalFunction = function(node){
		if (isNode(node)){
			node.remove();
		};
		return this;
	};
	var genTreeFromArray = function(arr){
		for (var i = 0; i < arr.length; i++){
			insertFunction(arr[i]);
		}
	};
	genTreeFromArray(seed);
	return {
		insert:insertFunction,
		remove:removalFunction,
		search:searchFunction,
		root:function(){return root;},
		minimum:minimumFunction,
		maximum:maximumFunction,
		toArray:toArrayFunction,
		getIterator:generateIterator
	};
}
