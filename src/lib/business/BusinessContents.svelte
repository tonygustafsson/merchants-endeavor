<script lang="ts">
	import { businesses } from '../../stores/businesses';
	import { staff } from '../../stores/staff';
	import { types } from '../../constants/businesses';
	import RangeSlider from '$lib/RangeSlider.svelte';

	export let business;

	$: maxStaffMembers = () => {
		if (!business) return 0;

		if (business.staff + $staff.members > types[business.type].staffMax) {
			return types[business.type].staffMax;
		}

		return business.staff + $staff.members;
	};

	const changeStaffMembers = (e: CustomEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const value = parseInt(target.value, 10);

		if (value > business.staff) {
			// Add more staff to business
			staff.remove(value - business.staff);
		} else {
			// Remove staff from business
			staff.add(business.staff - value);
		}

		businesses.changeStaff(business.id, value);
	};
</script>

<div class="component-businesscontents">
	<h3>Rearrange business contents</h3>

	<div class="slider-container">
		<div>
			<RangeSlider
				value={business.staff}
				max={maxStaffMembers()}
				on:input={changeStaffMembers}
				label="👫 Staff members <strong>({business.staff} employed)</strong>"
			/>
			{$staff.members} more available
		</div>
	</div>
</div>

<style>
	.slider-container {
		width: 50%;
	}

	.slider-container > div {
		background: #fff;
		padding: 0.5em;
		margin-bottom: 1.5em;
	}
</style>
