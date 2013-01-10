package collections;

import collections.interfaces.*;

public class LinkedList<A> extends Collection<A> {
	public A item;
	public LinkedList<A> rest;
	private Integer length;
	public Integer length(){
		return length;
	}
	public LinkedList(){
	}
	public LinkedList(A input[]){
		length = input.length;
		if (length > 0){
			item = input[0];
			A[] output = (A[])new Object[length - 1];
			System.arraycopy(input,1,output,0,length - 1);
			rest = new LinkedList<A>(output);
		}
	}
	public LinkedList(LinkedList<A> input){
		
	}
	class LinkedListIterator implements Iterator<A>{
		private LinkedList<A> iteratingOn;
		LinkedListIterator(LinkedList<A> list){
			iteratingOn = list;
		}
		public Boolean hasNext(){
			return iteratingOn.item != null;
		}
		public A next(){
			A currentItem = iteratingOn.item;
			iteratingOn = iteratingOn.rest;
			return currentItem;
		}
	}
	public Iterator<A> getIterator(){
		return new LinkedListIterator(this);
	}
	public LinkedList<A> clone(){
		return new LinkedList<A>(this);
	}
	public LinkedList<A> reverseFromHere(){
		Iterator<A> iter = getIterator();
		LinkedList<A> last = null;
		LinkedList<A> current = null;
		while (iter.hasNext()){
			if (current != null){
				last = current;
			}
			A[] temp = (A[]) new Object[1];
			temp[0] = iter.next();
			current = new LinkedList<A>(temp);
			if (last != null){
				current.rest = last;
			}
		}
		return current;
	}
	public LinkedList<A> reverse(){
		A[] intermediate = (A[])new Object[length];
		Iterator<A> iter = getIterator();
		for (Integer i = length - 1;i > -1;i--){
			intermediate[i] = iter.next();
		}
		return new LinkedList(intermediate);
	}
	public String toString(){
		Iterator<A> iter = getIterator();
		String output = "LinkedList(";
		Integer position = 0;
		while (iter.hasNext()){
			A current = iter.next();
			output += "["+position.toString()+"]("+current.toString()+"),";
			position ++;
		}
		output += ")";
		return output;
	}
}