package tests;

public class TestRunner {
	public static <A> Boolean executeTest(Test<A> test, TestCondition<A> condition){
		try {
			return condition.evaluate(test);
		} catch (Exception e) {
			return false;
		}
	}
}
