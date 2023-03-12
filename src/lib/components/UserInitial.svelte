<script lang="ts">
	export let email: string;

	const initial = email.charAt(0).toUpperCase();

	// Colors used to generate the background for shared user icons
	const colors = ['e9f5db', 'dcebca', 'cfe1b9', 'c2d5aa', 'b5c99a', 'a6b98b', '97a97c', '849669'];
	// Colors used to generate the text for shared user icons
	const tx_col = ['606f49', '5D6746', '595D41', '3D5D3C', '425535', '3C4828', '2A3B1C', '1F2513'];
	// Hash function string to positive int
	// used to pick a random color for the user icon
	const hash = function (input: string) {
		var hash = 0,
			i,
			chr;
		if (input.length === 0) return hash;
		for (i = 0; i < input.length; i++) {
			chr = input.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}
		if (hash < 0) {
			hash = hash * -1;
		}
		return hash;
	};
</script>

<div
	class="flex h-[33px] w-[33px] items-center justify-center rounded-full border-2 border-black border-opacity-10"
	style="background-color: #{colors[hash(email) % colors.length]};
           color: #{tx_col[hash(email) % tx_col.length]};"
>
	<span class="select-none font-medium">
		{initial}
	</span>
</div>
