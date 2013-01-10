package tests.Conditions;

import tests.Test;
import tests.TestCondition;

public class IsEqualCondition<A> extends TestCondition<A> {

	public boolean evaluate(Test<A> test) {
		A a = test.execute();
		A b = test.expectedResult();
		Boolean result = a == b;
		System.out.println("isEqual testing: ("+a+","+b+")"+result.toString());
		return result;
	}
}
