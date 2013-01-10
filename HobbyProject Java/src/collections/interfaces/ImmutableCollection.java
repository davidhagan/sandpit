package collections.interfaces;

public abstract class ImmutableCollection<A> extends Collection<A>{
	public abstract ImmutableCollection<A> add(A element);
	public abstract ImmutableCollection<A> remove(A element);
	public abstract ImmutableCollection<A> addElementAt(A element, Integer index);
	public abstract ImmutableCollection<A> removeElementAt(Integer index);
}
