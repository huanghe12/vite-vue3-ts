<template>
	<div>
		<el-button type="primary" @click="addAge">run</el-button>
	</div>
</template>
<!--
	<script setup>是在单文件组件（SFC）中使用组合式API的编译时的语法糖,
  里面的代码会被编译成组件setup函数的内容,这意味着与<script>只在组件被首次引用时执行一次不同,
 		<script setup>中的代码会在每次组件实例被创建的时候执行
  任何在 <script setup> 声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 都能在模板中直接使用
-->
<script lang="ts" setup>
/*
 * 以abstract开头的类为抽象类,不能用来实例化对象,只能被继承
 * */
abstract class Animal {
	name: string
	age: number
	// constructor是构造函数,在实例化对象的时候执行,也就是 new 的时候
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}

	// abstract开头的方法是抽象方法,必须被子类重写
	abstract run(): void
	abstract addDog(): void
}
// extends表示继承, Animal为父类, Dog为子类,子类拥有父类的所有方法和属性
class Dog extends Animal {
	gender: string
	constructor(name: string, age: number, gender: string) {
		/*
		 * super关键字用于访问和调用一个对象的父对象上的函数
		 * 语法:
		 *		super([arguments]) 调用父对象/父类的构造函数
		 *		super.functionOnParent([arguments]) 调用父对象/父类上的方法
		 * 在构造函数中使用时，super关键字将单独出现，并且必须在使用this关键字之前使用。super关键字也可以用来调用父对象上的函数
		 * */
		super(name, age)
		this.gender = gender
	}

	// 在子类中写和父类中同名的方法,执行的时候以子类方法为准,称为方法的重写
	run = () => {
		console.log('狗子开始跑')
	}

	addDog() {
		this.age += 1
	}
}
const dog = new Dog('小黑', 3, '雄')
dog.run()
const addAge = () => {
	dog.addDog()
	console.log(dog.name, dog.age, dog.gender)
}
</script>

<style scoped></style>
