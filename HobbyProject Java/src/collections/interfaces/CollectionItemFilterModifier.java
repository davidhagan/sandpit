package collections.interfaces;

public interface CollectionItemFilterModifier<A> extends CollectionItemModifier<A,Boolean> {
	public Boolean modifyItem(A item);
}
