package monads;

public class Maybe<A> implements Monad<A> {
	private A content;
	public Maybe(A item){
		content = item;
	}
	public <B> Monad<B> bind(MonadicBindFunc<A,B> func) {
		return func.bind(content);
	}
	public A unbind() {
		return content;
	}

}
