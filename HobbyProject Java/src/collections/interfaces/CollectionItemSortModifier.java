package collections.interfaces;

public interface CollectionItemSortModifier<A> extends CollectionItemModifier<A, Integer> {
	public Integer modifyItem(A item);
}
