<script lang="ts">
	export let id: string;
	export let name: string;
	export let value: string;
</script>

<input
	type="checkbox"
	{name}
	{id}
	{value}
	class="h-5 w-9 appearance-none rounded-full bg-gray-300 shadow-inner transition-all duration-300 before:ml-0.5 before:inline-block before:h-4 before:w-4 before:rounded-full before:bg-primary-dark checked:bg-primary-light checked:before:translate-x-full focus:outline-none"
/>
