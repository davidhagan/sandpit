package tests.Conditions;

import tests.Test;
import tests.TestCondition;

public class IsTrueCondition extends TestCondition<Boolean> {
	public boolean evaluate(Test<Boolean> test){
		Boolean result = test.execute();
		System.out.println("isTrue testing: "+result.toString());
		return result;
	}
}
