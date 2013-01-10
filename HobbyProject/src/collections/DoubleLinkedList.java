package collections;

import collections.interfaces.*;

public class DoubleLinkedList<A> extends Collection<A> {
	public DoubleLinkedListNode start;
	public DoubleLinkedListNode end;
	private Integer length = 0;
	public Integer length(){
		return length;
	}
	public DoubleLinkedListIterator getIterator(){
		return new DoubleLinkedListIterator(this);
	}
	class DoubleLinkedListIterator implements Iterator<A>{
		private DoubleLinkedListNode prevNode = TERMINATOR;
		private DoubleLinkedListNode currentNode = TERMINATOR;
		private DoubleLinkedListNode nextNode = TERMINATOR;
		private DoubleLinkedListNode startNode = TERMINATOR;
		private DoubleLinkedListNode endNode = TERMINATOR;
		private Boolean forward = true;
		public DoubleLinkedListIterator reverse(){
			forward = !forward;
			if (currentNode == TERMINATOR){
				if (forward){
					prevNode = TERMINATOR;
					nextNode = startNode;
				} else {
					prevNode = endNode;
					nextNode = TERMINATOR;
				}
			}
			return this;
		}
		public DoubleLinkedListIterator(DoubleLinkedList<A> list){
			startNode = list.start;
			endNode = list.end;
			nextNode = startNode;
		}
		public A next(){
			if (forward){
				prevNode = currentNode;
				currentNode = nextNode;
				nextNode = currentNode.nextNode;
			} else {
				nextNode = currentNode;
				currentNode = prevNode;
				prevNode = prevNode.prevNode;
			}
			return currentNode.value;
		}
		public Boolean hasNext(){
			if (forward){
				return nextNode != TERMINATOR;
			} else {
				return prevNode != TERMINATOR;
			}
		}
	}
	private DoubleLinkedListNode getTerminator(){
		DoubleLinkedListNode t = new DoubleLinkedListNode(null,null,null);
		t.nextNode = t;
		t.prevNode = t;
		return t;
	}
	private DoubleLinkedListNode TERMINATOR = getTerminator();
	class DoubleLinkedListNode{
		public A value = null;
		public DoubleLinkedListNode prevNode = TERMINATOR;
		public DoubleLinkedListNode nextNode = TERMINATOR;
		DoubleLinkedListNode(DoubleLinkedListNode p,A currentItem,DoubleLinkedListNode n){
			value = currentItem;
			prevNode = p;
			nextNode = n;
		}
	}
	public DoubleLinkedList(){
	}
	@SuppressWarnings("unchecked")
	public DoubleLinkedList(A inputList[]){
		Object[] temp = new Object[inputList.length];
		for (Integer i = 0; i < inputList.length; i++){
			temp[i] = new DoubleLinkedListNode(TERMINATOR,inputList[i],TERMINATOR);
		}
		for (Integer i = 0; i < temp.length; i++){
			Integer prevI = i - 1;
			Integer nextI = i + 1;
			if (prevI >= 0){
				((DoubleLinkedListNode)temp[i]).prevNode = (DoubleLinkedListNode)temp[prevI];
			}
			if (nextI < temp.length){
				((DoubleLinkedListNode)temp[i]).nextNode = (DoubleLinkedListNode)temp[nextI];
			}
		}
		start = (DoubleLinkedListNode)temp[0];
		end = (DoubleLinkedListNode)temp[temp.length - 1];
		length = temp.length;
	}
	public DoubleLinkedList<A> reverse(){
		A[] intermediate = (A[])new Object[length];
		Iterator<A> iter = getIterator().reverse();
		for (Integer i = 0;i < length;i++){
			intermediate[i] = iter.next();
		}
		return new DoubleLinkedList(intermediate);
	}
	public String toString(){
		Iterator<A> iter = getIterator();
		String output = "DoubleLinkedList(";
		Integer position = 0;
		while (iter.hasNext()){
			A current = iter.next();
			if (current != null){
				output += "["+position.toString()+"]("+current.toString()+"),";
			}
			position ++;
		}
		output += ")";
		return output;
	}
	public DoubleLinkedList<A> clone(){
		return new DoubleLinkedList(toArray());
	}
}