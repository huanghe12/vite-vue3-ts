<template>
	<router-view v-slot="{ Component }">
		<Component :is="Component"></Component>
	</router-view>
</template>

<script setup lang="ts"></script>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	li {
		list-style: none;
	}
}
</style>
