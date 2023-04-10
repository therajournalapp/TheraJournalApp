<script>
	// @ts-nocheck
	export let selected = false;
	export let disabled = false;
	export let blackout = false;
	export let current = false;
	export let outOfRange = false;
	export let variant = 'day';
	export let header = '';
	export let value;

	function getBgColor(value) {
		switch (value) {
			case 1:
				return 'purple';
			case 2:
				return 'blue';
			case 3:
				return 'grey';
			case 4:
				return 'green';
			case 5:
				return 'yellow';
			default:
				return 'white';
		}
	}
</script>

<button
	on:click
	on:keydown
	type="button"
	class="calendar-view-item type-{variant === 'day' ? 'day' : 'month-year'} {getBgColor(value)}"
	class:selected
	class:current
	class:blackout
	class:disabled
	class:out-of-range={outOfRange}
	disabled={disabled || blackout}
	aria-selected={selected}
	{...$$restProps}
>
	{#if header}
		<small>{header}</small>
	{/if}
	<slot />
</button>

<!-- {/if} -->
<style lang="postcss">
	.calendar-view-item {
		align-items: center;
		background-color: var(--fds-subtle-fill-transparent);
		border: 1px solid transparent;
		border-radius: 50%;
		box-sizing: border-box;
		/* color: var(--fds-text-primary); */
		display: inline-flex;
		font-family: var(--fds-font-family-text);
		font-size: 14px;
		font-weight: 400;
		justify-content: center;
		line-height: 20px;
		outline: none;
		padding: 0;
		position: relative;
		text-align: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		@apply text-black dark:text-neutral-200;
	}
	.calendar-view-item:focus-visible {
		box-shadow: var(--fds-focus-stroke);
	}
	.calendar-view-item:hover {
		background-color: var(--fds-subtle-fill-secondary);
	}
	.calendar-view-item:active {
		/* background-color: var(--fds-subtle-fill-tertiary); */
		@apply border-primary bg-primary-dark !text-white;
		box-shadow: inset 0 0 0 1px var(--fds-text-on-accent-primary);
	}
	.calendar-view-item.out-of-range,
	.calendar-view-item:active {
		color: var(--fds-text-secondary);
		@apply dark:text-neutral-400;
	}
	.calendar-view-item.out-of-range:active {
		/* color: var(--fds-text-secondary) !important; */
	}
	.calendar-view-item.disabled {
		background-color: var(--fds-subtle-fill-disabled);
		/* color: var(--fds-text-disabled); */
		@apply !text-neutral-400;
	}
	.calendar-view-item.disabled.blackout:after {
		content: none;
	}
	.calendar-view-item.blackout {
		pointer-events: none;
	}
	.calendar-view-item.blackout:after {
		-webkit-border-before: 1px solid var(--fds-control-strong-stroke-default);
		block-size: 1px;
		border-block-start: 1px solid var(--fds-control-strong-stroke-default);
		content: '';
		inline-size: 26px;
		position: absolute;
		transform: matrix(-0.71, -0.71, -0.71, 0.71, 0, 0);
		transform-origin: center;
	}
	.calendar-view-item.type-day {
		block-size: 40px;
		inline-size: 40px;
		@apply border-black dark:border-neutral-200;
	}
	.calendar-view-item.type-day:active {
		@apply border-primary;
	}
	.calendar-view-item.type-day small {
		inset-block-start: 2px;
	}
	.calendar-view-item.type-month-year {
		block-size: 56px;
		inline-size: 56px;
	}
	.calendar-view-item.type-month-year small {
		inset-block-start: 9.58px;
	}
	.calendar-view-item.selected {
		@apply border-primary;
	}
	.calendar-view-item.type-day.selected {
		/* border: 1px solid var(--fds-accent-default); */
		/* color: var(--fds-accent-text-primary); */
		@apply border-none bg-primary text-white;
	}

	/* Day Colors */
	.calendar-view-item.type-day.selected.purple {
		@apply bg-accent-purple;
	}
	.calendar-view-item.type-day.selected.blue {
		@apply bg-accent-blue;
	}
	.calendar-view-item.type-day.selected.grey {
		@apply bg-neutral-400;
	}
	.calendar-view-item.type-day.selected.green {
		@apply bg-accent-green;
	}
	.calendar-view-item.type-day.selected.yellow {
		@apply bg-accent-yellow;
	}
	/* End Day Colors */

	.calendar-view-item.type-day.sad {
		/* border: 1px solid var(--fds-accent-default); */
		/* color: var(--fds-accent-text-primary); */
		@apply bg-primary text-white;
	}
	.calendar-view-item.selected:hover {
		/* background-color: var(--fds-subtle-fill-secondary);
		border-color: var(--fds-accent-secondary); */
		@apply bg-primary-light text-white;
		box-shadow: inset 0 0 0 1px var(--fds-text-on-accent-primary);
	}
	.calendar-view-item.selected:active {
		/* background-color: var(--fds-subtle-fill-tertiary);
		border-color: var(--fds-accent-tertiary); */
		@apply bg-primary-dark text-white;
		box-shadow: inset 0 0 0 1px var(--fds-text-on-accent-primary);
	}
	.calendar-view-item.type-day.disabled {
		@apply border-dashed border-neutral-500 text-neutral-500;
	}
	.calendar-view-item.type-day.out-of-range {
		/* @apply hidden;  */
		/* TODO remove */
	}
	.calendar-view-item.selected.disabled {
		background-color: var(--fds-subtle-fill-disabled);
		border-color: var(--fds-accent-disabled);
		color: var(--fds-accent-text-disabled);
	}
	.calendar-view-item.selected.current {
		box-shadow: inset 0 0 0 1px var(--fds-text-on-accent-primary);
	}
	.calendar-view-item.selected.current:focus-visible {
		box-shadow: inset 0 0 0 1px var(--fds-text-on-accent-primary), var(--fds-focus-stroke);
	}
	.calendar-view-item.selected.blackout:after {
		border-block-start-color: var(--fds-accent-tertiary);
	}
	.calendar-view-item.current {
		/* background-color: var(--fds-accent-default); */
		/* color: var(--fds-text-on-accent-primary); */
		@apply font-bold;
	}
	.calendar-view-item.type-day.current {
		/* background-color: var(--fds-subtle-fill-transparent); */
		@apply font-bold;
	}
	/* .calendar-view-item.current:hover {
		background-color: var(--fds-accent-secondary);
	}
	.calendar-view-item.current:active {
		background-color: var(--fds-accent-tertiary);
		color: var(--fds-text-on-accent-secondary);
	} */
	.calendar-view-item.current.disabled {
		background-color: var(--fds-accent-disabled);
	}
	.calendar-view-item.current.blackout:after {
		border-block-start-color: var(--fds-text-on-accent-primary);
	}
	.calendar-view-item small {
		color: inherit;
		font-family: var(--fds-font-family-small);
		font-size: 8px;
		font-weight: 400;
		inline-size: 100%;
		letter-spacing: 0.04em;
		line-height: 12px;
		padding-inline: 1px;
		pointer-events: none;
		position: absolute;
		text-align: center;
	}
</style>
