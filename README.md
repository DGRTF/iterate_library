# iterate_library
## Библиотека, реализующая методы итератора. 
### Мотивация
Если вам нужны методы для работы с коллекциями, то хорошо бы иметь общий интерфейс для работы с ним вне зависимосто от типа объекта. Такой интерфейс появился в ES6, в виде итераторов. Данная библиотека добавляет в ваш объект методы для рботы с коллекцией через метод ```[Symbol.iterator]()```. Следовательно она будет работать только с объектами, у которых есть этот метод. Если вы реализуете дерево, стек, очередь и т д, не нужно писать методы для его обхода, фильтрации и других методов, существующих в данной библиотеке! Просто реализуйте в вашем объекте метод ```[Symbol.iterator]()```, подключите эту библиотеку и добавьте методы для работы с вашей коллекцией.

На самом деле общий интерфейс существовал и до ES6 - это массивы. Вы можете с тем же успехом реализовать метод, который будет преобразовывать вашу коллекцию в массив, а затем использовать методы массива. Преобразованние к массиву будет происходить за время O(n), после чего вы сможете использовать сетоды массивов для обработки коллекции. Итератор же выдает по 1 элементу из коллекции, с которым работают методы библиотеки сразу же. Это позволяет избавиться от лишнего прохода по коллекции для работы с ней, как в случае с массивами. Можно назвать эту величину "Вемя доступа к коллекции", в случае с итератором она будет O(1), в отличие от O(n) в случае преобразования в массив. Более того можете взглянуть на этот код:

````typescript
const array = addIterableMethodsInArray([
  {
    rating: 1,
    numbers: [1, 11, 111],
  },
  {
    rating: 2,
    numbers: [2, 22, 222],
  },
  {
    rating: 3,
    numbers: [3, 33, 333],
  },
  {
    rating: 4,
    numbers: [4, 44, 444],
  },
  {
    rating: 5,
    numbers: [5, 55, 555],
  },
]);

const result = array
  .enumerableFilter(x => {
    console.log(x.rating);
    return x.rating > 3;
  })
  .enumerableSome(x => {
    console.log(x.rating);
    return x.rating > 2;
  });

const resultNative = array
  .filter(x => {
    console.log(x.rating);
    return x.rating > 3;
  })
  .some(x => {
    console.log(x.rating);
    return x.rating > 2;
  });
````
  
В случае с итерируемой версией вы увидите 3 вывода на консоль в методе enumerableFilter() против 5 на стандартном методе массива filter(). так происходит потому, что итератор не фильтрует всю коллекцию сразу, он отдает первый элемент, который отвечает заданному условию (x.rating > 3) после чего с ним рботает следующий метод. Это хороший варинт для высоконагруженных решений!

Однако мы предостерегаем вас от преждевременной оптимизации! Не стоит использовать библиотеку просто пот тому, что она производительнее другого решения! Если у вас нет проблем с производительностью. преобразуйте к стандартному массиву и работайте с ним, что бы избежать лишних зависимостей в проекте и повышения порога входа в него. Можно скзать, что бибилиотека подходит для узкого круга задач, для нагруженных решений.

## API
Все методы, которые совпадают с названиями стандртных работают примерно так же. Например метод с названием [`enumerableMap()`](#enumerableMap)  соответсвуют методу map() в стандартной библиотеке. Почти все методы, которые принимают функцию обратного вызова, передают в нее последним параметром количество итераций. Массив, естественно не передается, как в обычных методах массивов, т к методы работают с итератором, а не массивом.

### Перед использованием скачайте и подключите библиотеку:
```
npm i iterate_library
```

```typescript
import { addIterableMethodsInArray, addIterableMethodsInObject } from "iterate_library";

const array = addIterableMethodsInArray([
  {
    rating: 1,
    numbers: [1, 11, 111],
  },
  {
    rating: 2,
    numbers: [2, 22, 222],
  },
  {
    rating: 3,
    numbers: [3, 33, 333],
  },
  {
    rating: 4,
    numbers: [4, 44, 444],
  },
  {
    rating: 5,
    numbers: [5, 55, 555],
  },
]);
```

```addIterableMethodsInArray``` и ```addIterableMethodsInObject``` на самом деле внутри вызывают одину и ту же функцию. Если вы пишете на JS, то можете вызывать любую для объекта или массива. Они сделанны отдельно только для потому, что вывод системы типов в ts плохо работает для обобщенной ```addIterableMethodsInObject``` и если использовать ее, то вам придется либо работать с типом ```unknown``` либо явно передавать параметры типа: 

```typescript
const arr = addIterableMethodsInObject<string[], string>();
```

,что не удобно. Функция ```addIterableMethodsInArray``` лишена этой проблемы, но может работать только с массивами с точки зрения TS.
Оба этих метода добавляют в существующий объект методы, не создавая новый, т к создать новый массив будет занимать время O(n), что невилирует актуальность бибилотеки.

### enumerableMap()
```typescript
const result = array
    .enumerableMap(x => x.rating)
    .enumerableToArray(); // [1, 2, 3, 4, 5]

const resultNative = array
    .map(x => x.rating); // [1, 2, 3, 4, 5]
```

### enumerableFilter()
```typescript
const result = array
    .enumerableFilter(x => x.rating > 3)
    .enumerableToArray(); 

// result:
[
  {
    rating: 4,
    numbers: [4, 44, 444],
  },
  {
    rating: 5,
    numbers: [5, 55, 555],
  },
]

// Native equivalent
const resultNative = array.filter(x => x.rating > 3);
```

### enumerableFilterStrict()
Эквивалентна работе [`enumerableFilter()`](#enumerableFilter)  за исключением того, что внутри проверка происходит не на истинность значения, а на истинность булева значения:

```typescript
if (callback(item) === true)
```

В обычной же [`enumerableFilter()`](#enumerableFilter), как и в filter() проверка происходит так:
```typescript
if (callback(item))
```
Более того, функция принимает в качестве функции обратного вызова только ту, которая возвращает булево значение, о чем вам подскажет компилятор. Однако, если вы пишете программы на JS можно подставить любую фнкцию и вы получите неправильный результат, если функция обратного вызова не будет отправлять строго булево значение.

```typescript
const result = array
    .enumerableFilterStrict(x => x.rating > 3)
    .enumerableToArray();
```

### enumerableSome()
```typescript
const result = array.enumerableSome(x => x.rating > 3); // true
const resultNative = array.some(x => x.rating > 3) // true
```

### enumerableSomeStrict()
Отличается от [`enumerableSome()`](#enumerableSome) тем же, чем и [`enumerableFilter()`](#enumerableFilter) от [`enumerableFilterStrict()`](#enumerableFilterStrict)
```typescript
const result = array.enumerableSomeStrict(x => x.rating > 3); // true
const resultNative = array.some(x => x.rating > 3); // true
```

### enumerableEvery()
```typescript
const result = array.enumerableEvery(x => x.rating > 3); // false
const resultNative = array.every(x => x.rating > 3) // false
```

### enumerableEveryStrict()
Отличается от [`enumerableEvery()`](#enumerableEvery) тем же, чем и [`enumerableFilter()`](#enumerableFilter) от [`enumerableFilterStrict()`](#enumerableFilterStrict)
```typescript
const result = array.enumerableEveryStrict(x => x.rating > 3); // false
const resultNative = array.filter(x => x.rating > 3); // false
```

### enumerableToArray()
Преобразует последовательность в массив. Применяется, когда вам нужно после всех операций с последовательностью получить результат в виде конечного значения. Например после [`enumerableFilter()`](#enumerableFilter) или [`enumerableMap()`].(#enumerableMap).

```typescript
const result = array.enumerableToArray(); // [...]
```

### enumerableToMap()
Преобразует последовательность в Map(). В остальном анологичен [`enumerableToArray()`](#enumerabletoarray).

```typescript
const result = [...array.enumerableToMap()];
// result:
[
  [1, { rating: 5,numbers: [5, 55, 555] }],
  [0, { rating: 4, numbers: [4, 44, 444 ] }],
]
```

### enumerableToSet()
Преобразует последовательность в Set(). В остальном анологичен [`enumerableToArray()`](#enumerabletoarray).

```typescript
const result = [...array.enumerableToSet()]; // result: array
```

### enumerableGroupToArray()
Группирует последовательность по признаку и преобразует в массив кортежей, где первое значение будет признаком группировки, а второе - массивом всех значений, соответствующих этому признаку:

```typescript
const inventory = addIterableMethodsInArray([
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "goat", type: "meat", quantity: 9 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 },
  ]);

const group = inventory.enumerableGroupToArray(({ quantity }) => quantity);

// group: 
[
  [9, [
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "goat", type: "meat", quantity: 9 },
  ],
  ],
  [5, [
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "cherries", type: "fruit", quantity: 5 },
  ],
  ],
  [22, [
    { name: "fish", type: "meat", quantity: 22 },
  ],
  ],
]
```

### enumerableGroupToMap()
Аналогичен [`enumerableGroupToArray()`](#enumerableGroupToArray), за исключением того, что преобразует в Map()

```typescript
const inventory = addIterableMethodsInArray([
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "goat", type: "meat", quantity: 9 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 },
  ]);

const group = [...inventory.enumerableGroupToMap(({ quantity }) => quantity)];

// group: 
[
  [9, [
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "goat", type: "meat", quantity: 9 },
  ],
  ],
  [5, [
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "cherries", type: "fruit", quantity: 5 },
  ],
  ],
  [22, [
    { name: "fish", type: "meat", quantity: 22 },
  ],
  ],
]
```

### enumerableForEach()
Проходит по последовательности, ничего не возвращает. Аналогичен методу массива forEach().

```typescript
array.enumerableForEach(x => x.numbers = []);

// array:
[
  {
    rating: 1,
    numbers: [],
  },
  {
    rating: 2,
    numbers: [],
  },
  {
    rating: 3,
    numbers: [],
  },
  {
    rating: 4,
    numbers: [],
  },
  {
    rating: 5,
    numbers: [],
  },
];
```


### enumerableForEachLazy()
Анологичен [`enumerableForEach()`](#enumerableForEach), но возвращает итератор, у которого есть все методы этой библиотеки. Удобно использовать, если нужно мутировать элементы последовательности и передать их дальше.

```typescript
const result = array.enumerableForEachLazy(x => x.numbers = []).enumerableToArray();
```

### enumerableFlatMap()

```typescript
const result = array.enumerableFlatMap(x => x.numbers).enumerableToArray(); 
const resultNative = array.flatMap(x => x.numbers);
// result, resultNative:
[1, 11, 111, 2, 22, 222, 3, 33, 333, 4, 44, 444, 5, 55, 555]
```
