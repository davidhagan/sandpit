package tests;

import collections.DoubleLinkedList;
import collections.LinkedList;
import collections.interfaces.Collection;
import collections.interfaces.Iterator;
import tests.Conditions.*;

public class Main {
	public static void main(String[] args){
		final Integer[] listArray = new Integer[]{1,2,3,4,5,6,7,8,9,10,12};
		final Integer[] listArrayReversed = new Integer[]{12,10,9,8,7,6,5,4,3,2,1};
		final LinkedList<Integer> list = new LinkedList<Integer>(listArray);
		final LinkedList<Integer> listReversed = new LinkedList<Integer>(listArray).reverse();
		final DoubleLinkedList<Integer> dList = new DoubleLinkedList<Integer>(listArray);
		final DoubleLinkedList<Integer> dListReversed = new DoubleLinkedList<Integer>(listArray).reverse();
	
		ConcreteTestingPair[] pairs= new ConcreteTestingPair[]{
				new ConcreteTestingPair(){
					public LinkedList<Integer> a(){return list;}
					public Integer[] b(){return listArray;}
				},
				new ConcreteTestingPair(){
					public LinkedList<Integer> a(){return listReversed;}
					public Integer[] b(){return listArrayReversed;}
				},
				new ConcreteTestingPair(){
					public DoubleLinkedList<Integer> a(){return dList;}
					public Integer[] b(){return listArray;}
				},
				new ConcreteTestingPair(){
					public DoubleLinkedList<Integer> a(){return dListReversed;}
					public Integer[] b(){return listArrayReversed;}
				}
		};
		
		for (int pairIndex = 0; pairIndex < pairs.length;pairIndex ++){
			ConcreteTestingPair pair = pairs[pairIndex];
			for (int i = 0; i < pair.a().length(); i++){
				final Collection<Integer> currentList = pair.a();
				final int current = i;
				final int currentValue = pair.b()[i];
				TestRunner.executeTest(
						new Test<Integer>(){
							public Integer expectedResult(){return currentValue;}
							public Integer execute(){
								Iterator<Integer> iter = currentList.getIterator();
								Integer resultInteger = null;
								if (iter.hasNext()){
									resultInteger = iter.next();
								}
								for (int currentI = 0; currentI < current; currentI++){
									if (iter.hasNext()){
										resultInteger = iter.next();
									}
								}
								return resultInteger;
							}
						},
						new IsEqualCondition<Integer>()
				);
			}
		}
		/*
		TestRunner.executeTest(
				new Test<Integer>(){
					public Integer expectedResult(){return 1;}
					public Integer execute(){
						return 1;
					}
				},
				new IsEqualCondition<Integer>()
		);
		TestRunner.executeTest(
				new Test<Boolean>(){
					public Boolean execute(){
						return true;
					}
				},
				new IsTrueCondition()
		);
		*/
	}
}
