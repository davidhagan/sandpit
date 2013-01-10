package monads;

public interface Monad<A> {
	public <B> Monad<B> bind(MonadicBindFunc<A,B> item);
	public A unbind();
}
