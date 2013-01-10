package collections.interfaces;

public abstract class FunctionalCollection<A> extends Collection<A>{
	private Iterator<A> iterator;
	public FunctionalCollection(A[] arr){
		
	}
	public FunctionalCollection(Iterator<A> iter){
		iterator = iter;
	}
	public abstract FunctionalCollection<A> filter(CollectionItemFilterModifier<A> predicate);
	public abstract FunctionalCollection<A> sort(CollectionItemSortModifier<A> predicate);
	public abstract <B> FunctionalCollection<B> map(CollectionItemModifier<A,B> modifier);
	public <B> B foldLeft(B seed, CollectionItemModifier<A,B> modifier){
		B acc = seed;
		while (iterator.hasNext()){
			acc = modifier.modifyItem(iterator.next());
		}
		return acc;
	}
	public <B> B foldRight(B seed, CollectionItemModifier<A,B> modifier){
		reverse();
		B acc = foldLeft(seed,modifier);
		reverse();
		return acc;
	}
	public abstract Boolean exists(CollectionItemFilterModifier<A> modifier);
	public abstract Boolean contains(A item);
}
