package monads;

public abstract class MonadicBindFunc<A,B> {
	public abstract Monad<B> bind(A item); 
}
