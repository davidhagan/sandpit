package collections.interfaces;

public abstract class Collection<A> {
	public abstract Integer length();
	public abstract Collection<A> reverse();
	public abstract Iterator<A> getIterator();
	public abstract Collection<A> clone();
	public A[] toArray(){
		@SuppressWarnings("unchecked")
		A[] output = (A[]) new Object[length()];
		Iterator<A> iter = getIterator();
		Integer position = 0;
		while (iter.hasNext()){
			output[position] = iter.next();
		}
		return output;
	}
}
