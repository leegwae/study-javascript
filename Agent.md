# Agent

에이전트(agent)는 ECMAScript 실행 컨텍스트의 집합, ECMAScript 실행 컨텍스트 스택(execution context stack), 현재 실행중인 실행 컨텍스트(running execution context), 에이전트 레코드(Agent Record), 실행 스레드(executing thread)로 이루어진다. 실행 스레드를 제외하면 이들은 모두 각각의 에이전트가 독점적으로 소유한다. 

다수의 에이전트에 의해 사용되는 실행 스레드를 제외하면, 에이전트의 실행 스레드는 오로지 해당 에이전트의 실행 컨텍스트의 작업만을 실행한다.

에이전트의 실행 스레드가 작업을 실행하는 동안 에이전트는 이 작업의 코드에 대하여 surrounding agent가 된다. 코드는 에이전트 내부의 명세 수준의 실행 객체들(실행중인 실행 컨텍스트, 실행 컨텍스트 스택, 에이전트 레코드의 필드들)에 접근하기 위해 surrounding agent를 사용한다.



## 참고

- https://262.ecma-international.org/13.0/#agent