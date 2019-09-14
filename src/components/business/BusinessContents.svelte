<script>
    import { businesses } from '../../stores/businesses.js';
    import { staff } from '../../stores/staff.js';
    import { types } from '../../constants/businesses';
    import Button from '../../components/Button.svelte';
    import RangeSlider from '../../components/RangeSlider.svelte';

    export let business;

    $: maxStaffMembers = () => {
        if (!business) return 0;

        if (business.staff + $staff.members > types[business.type].staffMax) {
            return types[business.type].staffMax;
        }

        return business.staff + $staff.members;
    };

    const changeStaffMembers = value => {
        value = parseInt(value, 10);

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

<div class="component-businesscontents">
    <h3>Rearrange business contents</h3>

    <div class="slider-container">
        <div>
            <RangeSlider
                value={business.staff}
                max={maxStaffMembers()}
                on:input={e => changeStaffMembers(e.target.value)}
                label="👫 Staff members <strong>({business.staff} employed)</strong>" />
            {$staff.members} more available
        </div>
    </div>
</div>
