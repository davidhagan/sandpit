package collections.interfaces;

public abstract class MutableCollection<A> extends Collection<A> {
	public abstract void add(A item);
	public abstract void remove(A item);
	public abstract void addElementAt(A item, Integer index);
	public abstract void removeElementAt(Integer index);
}
